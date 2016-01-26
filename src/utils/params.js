import {elt,insertCSS} from "prosemirror/dist/dom"
import {paramTypes} from "prosemirror/dist/menu/menu"
import {defineDefaultParamHandler} from "prosemirror/dist/edit"
import {selectableNodeAbove} from "prosemirror/dist/edit/selection"
import {AssertionError} from "prosemirror/dist/util/error"

let fhandler = null

export const namePattern = "[A-Za-z0-9_-]{1,10}"
	
export const nameTitle = "letters,digits, -, _ (max:10)"

export function defineFileHandler(handler) { fhandler = handler}

let lastClicked = null;
export function getLastClicked() { return lastClicked }

["text","number","range","email","url","date"].map(type =>
  paramTypes[type] = {
    render(param, value) {
      return elt("input", {
    	 type,
         placeholder: param.label,
         value,
         required: "required",
         autocomplete: "off"})
  },
  read(dom) {
    return dom.value
  }
})

paramTypes.file = {
  render(param,value) {
	return elt("input", {
		type: "text",
		readonly: true,
        placeholder: param.label,
        value,
        required: "required",
        autocomplete: "off",
        required: true})
  },
  read(dom) {
    return dom.value
  }
}

paramTypes.select = {
  render(param, value) {
    let options = param.options.call ? param.options(this) : param.options
    let field = elt("select", null, options.map(o => elt("option", {value: o.value, selected: o.value == value ? "true" : null}, o.label)))
    field.setAttribute("required","required")
    return field
  },
  read(dom) {
    return dom.value
  }
}


function selectClickedNode(pm, e) {
	  let pos = selectableNodeAbove(pm, e.target, {left: e.clientX, top: e.clientY}, true)
	  if (!pos) return pm.sel.pollForUpdate()
	  let {node, from} = pm.selection
	  if (node && pos.depth >= from.depth && pos.shorten(from.depth).cmp(from) == 0) {
	    if (from.depth == 0) return pm.sel.pollForUpdate()
	    pos = from.shorten()
	  }
	  pm.setNodeSelection(pos)
	  e.preventDefault()
	  lastClicked = e.target
	}

export function defParamsClick(type, cmdname, spots = ["topleft"]) {
	type.prototype.handleClick = (pm, e, path, node) => {
		let spotClicked = false
		spots.forEach(function check(loc) {
			let r = e.target.getBoundingClientRect()
			if (loc == "all") spotClicked = true;
			else if (loc == "topleft") spotClicked = spotClicked || (e.clientX < (r.left+16) && e.clientY < (r.top+16))
			else if (loc == "bottomright") spotClicked = spotClicked || (e.clientX > (r.right-32) && e.clientY > (r.bottom-32))			
		})
		if (spotClicked) {
			let cmd = pm.commands[cmdname]
			if (cmd) {
				selectClickedNode(pm,e)
				widgetParamHandler(pm,cmd)
				return true;
			} else
				return false;
		}
	}
}

export function selectedNodeAttr(pm, type, name) {
  let {node} = pm.selection
  if (node && node.type == type) return node.attrs[name]
}

function paramDefault(param, pm, command) {
  if (param.prefill) {
    let prefill = param.prefill.call(command.self, pm)
    if (prefill != null) return prefill
  }
  return param.default
}

function buildParamFields(pm, command) {
	let fields = command.params.map((param, i) => {
	    if (!(param.type in paramTypes))
	        AssertionError.raise("Unsupported parameter type: " + param.type)
	    let val = paramDefault(param, pm, command)
		let fname = param.name? param.name: param.label
		let opt = param.options ? param.options: {}
	    let field = paramTypes[param.type].render.call(pm, param, paramDefault(param, pm, command))
	    field.setAttribute("data-field", i)
	    let name = "field_"+i
	    field.setAttribute("name", name)
		if (param.type != "select") for (let prop in opt) field.setAttribute(prop, opt[prop])
		let fieldLabel = elt("label",{for: name},fname)
		if (param.type == "file") {
			let uploadButton = elt("input",{name: "upload", type: "button", value: "Upload"})
			uploadButton.addEventListener("click",e => { buildUploadForm(pm, field) })
			return elt("div", {class: "widgetField"}, fieldLabel, field, uploadButton)
		} else
			return elt("div", {class: "widgetField"}, fieldLabel, field)
	 })
	 return fields
}

function formIsValid(form) {
	for (let i = 0; i < form.elements.length; i++)
		if (!form.elements[i].checkValidity()) return false
	return true
}

function gatherParams(pm, command, form) {
	let bad = false
	let params = command.params.map((param, i) => {
	    let dom = form.querySelector("[data-field=\"" + i + "\"]")
		if (dom && dom.validity.valid) { 
		    let val = paramTypes[param.type].read.call(pm, dom)
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
	// Submit if Enter pressed and all fields are valid
    form.addEventListener("keypress", e => { 
     	if (e.keyCode == 13)
    		if (formIsValid(form))
    			finish(e)
    		else
    			save.click()
    })
    
	dialog = elt("div",null,elt("div",{class: "widgetDialog"}),form)
	
	pm.wrapper.appendChild(dialog)
 
	// FIXME too hacky?
	setTimeout(() => {
		let input = form.querySelector("input, select")
		if (input) input.focus()
	}, 50)
}

function FileDragHover(e) {
	e.stopPropagation();
	e.preventDefault();
	e.target.className = (e.type == "dragover" ? "hover" : "");
}

function buildUploadForm(pm, field) {
	let legend = elt("legend", null, "File Upload")
	let inputHidden = elt("input",{type: "hidden", id: "MAX_FILE_SIZE", name: "MAX_FILE_SIZE", value:"300000"})
	let label = elt("label", {for: "fileselect"},"File to upload:")
	let fileselect = elt("input",{id: "fileselect", type: "file", name: "fileselect[]", multiple: "multiple"})
	let filedrag = elt("div",{id: "filedrag"},"or drop files here")
	let cancel = elt("input",{type: "button", value:"Cancel"})
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

defineDefaultParamHandler(widgetParamHandler)

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
	background: white;
	position: absolute;
	top: 20px;
	left: 20px;
	padding: 5px;
	border: 1px solid #AAA;
	border-radius: 6px;
	z-index: 9999;
	display: block;
}

.widgetForm h4 {
	color: black;
	margin: 4px;
}

.widgetField {
	display: block;
	padding: 2px;
}

.widgetField label {
	width: 80px;
	color: black;
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

.widgetField input[type = "button"] {
	border-radius: 4px;
	margin: 5px;
}

.widgetFieldName {
	color: black;
	display: inline;
	padding: 4px;
}

.widgetButtons {
	text-align: center;
	display: inline-block;
	white-space: nowrap;
}

.widgetButtons input {
	border-radius: 4px;
	margin: 5px;
}

#upload {
	position: absolute;
	top: 40px;
	left: 40px;
	padding: 5px;
	border: 1px solid black;
	border-radius: 6px;
	background: white;
	z-index: 10000;
	display: block;
}

#upload input {
	border-radius: 4px;
	margin: 5px;
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
