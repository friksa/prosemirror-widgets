import {elt,insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defineParamHandler} from "../../../../git/prosemirror/dist/edit"

const inputTypes = ["text","number","range","email","url","date"]

let fhandler = null

export function defineFileHandler(handler) { fhandler = handler}
                    
function paramDefault(param, pm, command) {
	return !param.default ? ""
	    : param.default.call ? param.default.call(command.self, pm)
	    : param.default
}
  
function buildParamFields(pm, command) {
	let prefill = command.spec.prefillParams && command.spec.prefillParams.call(command.self, pm)
	let fields = command.params.map((param, i) => {
	    let field, name = "field_" + i
		let val = prefill ? prefill[i] : paramDefault(param, pm, command)
		let fname = param.name? param.name: param.label
		let opt = param.options ? param.options: {}
		if (inputTypes.indexOf(param.type) >= 0) {
			field = elt("input", {
				name, 
				id: name, 
				type: param.type,
		        placeholder: param.label,
		        value: val,
		        autocomplete: "off",
		        required: true}
			)
			for (let prop in opt) field.setAttribute(prop, opt[prop])
		} else if (param.type == "file") {
			field = elt("input", {
				name, 
				id: name, 
				type: "text",
				readonly: true,
                placeholder: param.label,
                value: val,
                autocomplete: "off",
                required: true}
			)
			for (let prop in opt) field.setAttribute(prop, opt[prop])
		} else if (param.type == "select")
		  field = elt("select", {name}, (param.options.call ? param.options(pm) : param.options)
		              .map(o => elt("option", {value: o.value, selected: o.value == val}, o.label)))
		else
			throw new Error("Unsupported parameter type: " + param.type)
		let fieldLabel = elt("label",{for: name},fname)
		if (param.type == "file") {
			let uploadButton = elt("span",{class: "widgetUpload"},"Upload")
			uploadButton.addEventListener("click",e => { buildUploadForm(pm, field) })
			return elt("div", {class: "widgetField"}, fieldLabel, field, uploadButton)
		} else
			return elt("div", {class: "widgetField"}, fieldLabel, field)
	 })
	 return fields
}

// need to validate params
function gatherParams(pm, command, form) {
	let bad = false
	let params = command.params.map((param, i) => {
		let f = form.elements["field_" + i]
		if (f.validity.valid) { 
			let val = f.value
		    if (val) return val
		    if (param.default) return paramDefault(param, pm, command)
		}
		bad = true;
	})
	return bad ? null : params
}

function paramDialog(pm, command, callback) {
	let dialog, form, finish = e => {
    	e.preventDefault(); e.stopPropagation()
    	let params = gatherParams(pm, command, form)
		if (params) {
			pm.wrapper.removeChild(dialog)
			pm.focus()
			callback(params)
		}
	} 
	let fields = buildParamFields(pm, command)
	let save = elt("input",{name: "save", type: "submit", value: "Save"})
    save.addEventListener("mousedown", e => { finish(e) })
	let cancel = elt("input",{name: "cancel", type: "button", value: "Cancel"})
    cancel.addEventListener("mousedown", e => {
    	e.preventDefault(); e.stopPropagation()
		pm.wrapper.removeChild(dialog)
		pm.focus()
    })
	let buttons = elt("div",{class: "widgetButtons"},save,cancel)
	form = elt("form", {class: "widgetForm"}, elt("h4",null,command.label+" Settings"),fields, buttons)
	// Treat Enter as a submit if form only has one field
    form.addEventListener("keypress", e => {
    	if (e.keyCode == 13) {
    		if (fields.length == 1) finish(e)
    		else {
    			e.preventDefault(); e.stopPropagation()
    		}
    	}
    })
	dialog = elt("div",null,elt("div",{class: "widgetDialog"}),form)
	
	pm.wrapper.appendChild(dialog)
 
	// FIXME too hacky?
	setTimeout(() => {
		let select = form.querySelector("select")
		if (select) select.focus()
		let input = form.querySelector("input, textarea")
		if (input) input.focus()
	}, 20)
}

function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function buildUploadForm(pm, field) {
	let legend = elt("legend", null, "HTML File Upload")
	let inputHidden = elt("input",{type: "hidden", id: "MAX_FILE_SIZE", name: "MAX_FILE_SIZE", value:"300000"})
	let label = elt("label", {for: "fileselect"},"File to upload:")
	let fileselect = elt("input",{id: "fileselect", type: "file", name: "fileselect[]", multiple: "multiple"})
	let filedrag = elt("div",{id: "filedrag"},"or drop files here")
	let cancel = elt("button",{type: "button"}, "Cancel")
	cancel.addEventListener("click", e => { 
    	e.preventDefault(); e.stopPropagation()
		pm.wrapper.removeChild(form)
	})
	let saveFile = function(e) {
    	e.preventDefault(); e.stopPropagation()
		FileDragHover(e);
		let files = e.target.files || e.dataTransfer.files;
		if (files) field.value = files[0].name
		if (fhandler) fhandler(files)
		pm.wrapper.removeChild(form)
	}
	fileselect.addEventListener("change", saveFile)
	let xhr = new XMLHttpRequest()
	if (xhr.upload) {
		filedrag.addEventListener("dragover", FileDragHover)
		filedrag.addEventListener("dragleave", FileDragHover)
		filedrag.addEventListener("drop", saveFile)
		filedrag.style.display = "block"
	}
	let form = elt("form",{id: "upload", enctype: "multipart/form-data"},
		elt("fieldset", null, legend, inputHidden,
			elt("div",null,
				label,
				fileselect,
				filedrag
			),
			elt("div",null,cancel)
		)
	)
	pm.wrapper.appendChild(form)
}

export function widgetParamHandler(pm, command, callback) {
	paramDialog(pm, command, params => {
		let run = command.spec.run
		if (params && run) {
			run.call(command.self, pm, ...params)
		}
	})
}

defineParamHandler("widgetParamHandler", widgetParamHandler)

insertCSS(`

.widgetDialog {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #FFF;
	z-index: 8888;
	opacity:0.8;
	font-family: Helvetica, Arial, Sans-Serif;
}

.widgetForm {
	position: absolute;
	top: 20px;
	left: 20px;
	padding: 5px;
	border-radius: 6px;
	background: #0191C8;
	z-index: 9999;
	display: block;
}

.widgetForm h4 {
	color: white;
	margin: 4px;
}

.widgetField {
	display: block;
	padding: 2px;
}

.widgetField label {
	width: 80px;
	color: white;
	display: inline-block;
	padding: 2px;
	float: left;
}

.widgetField input {
	margin: 2px;
	display: inline;
}

.widgetField input[type = "number"] {
	width: 60px;
	margin: 2px;
	display: inline;
}
.widgetFieldName {
	color: white;
	display: inline;
	padding: 4px;
}

.widgetButtons {
	text-align: center;
}

.widgetButtons input {
	margin: 5px;
}

.widgetUpload {
	cursor: pointer;
	color: white;
	border: 1px solid white;
	font-size: 80%;
	border-radius: 4px;
	padding: 2px;
}

#upload {
	position: absolute;
	top: 40px;
	left: 40px;
	padding: 5px;
	border-radius: 6px;
	background: #EEE;
	z-index: 10000;
	display: block;
}

#filedrag {
	display: none;
	font-weight: bold;
	text-align: center;
	padding: 1em 0;
	margin: 1em 0;
	color: #555;
	border: 2px dashed #555;
	border-radius: 7px;
	cursor: default;
}

#filedrag:hover {
	color: #f00;
	border-color: #f00;
	border-style: solid;
	box-shadow: inset 0 3px 4px #888;
}

`)
