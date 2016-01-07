import {defineParamHandler} from "../../../../git/prosemirror/dist/edit"
import {elt,insertCSS} from "../../../../git/prosemirror/dist/dom"

const inputTypes = ["text","number","range","email","url","date"]
                    
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
			field = elt("input", {name, id: name, type: param.type,
		                        placeholder: param.label,
		                        value: val,
		                        autocomplete: "off",
		                        required: true})
			for (let prop in opt) field.setAttribute(prop, opt[prop])
		} else if (param.type == "file") {
			field = elt("input", {name, id: name, type: "text",
				  readonly: true,
                  placeholder: param.label,
                  value: val,
                  autocomplete: "off",
                  required: true})
			for (let prop in opt) field.setAttribute(prop, opt[prop])
		} else if (param.type == "select")
		  field = elt("select", {name}, (param.options.call ? param.options(pm) : param.options)
		              .map(o => elt("option", {value: o.value, selected: o.value == val}, o.label)))
		else
			throw new Error("Unsupported parameter type: " + param.type)
		let fieldLabel = elt("label",{for: name},fname)
		if (param.type == "file") {
			let uploadButton = elt("span",{class: "widgetUpload"},"Upload")
			let upload = () => {
				alert("Show Drag and Drop/Browse File Dialog")
			}
			uploadButton.addEventListener("click",upload)
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
	let dialog, finish = result => {
		if (!result) return;
		pm.wrapper.removeChild(dialog)
		pm.focus()
	    callback(result)
	} 
	let fields = buildParamFields(pm, command)
	let save = elt("input",{name: "save", type: "submit", value: "Save"})
    save.addEventListener("mousedown", e => {
    	e.preventDefault(); e.stopPropagation()
    	finish(gatherParams(pm, command, form))
    })
	let cancel = elt("input",{name: "cancel", type: "button", value: "Cancel"})
    cancel.addEventListener("mousedown", e => {
		pm.wrapper.removeChild(dialog)
		pm.focus()
    })
	let buttons = elt("div",{class: "widgetButtons"},save,cancel)
	let form = elt("form", {class: "widgetForm"}, elt("h4",null,command.label+" Settings"),fields, buttons)
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
`)
