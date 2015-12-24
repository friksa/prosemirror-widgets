import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select, formSchema} from "./schema"
import {readParams} from "../../../prosemirror/dist/menu/menu"
import {Pos} from "../../../prosemirror/dist/model"
import {selectableNodeAbove} from "../../../prosemirror/dist/edit/selection"

MultipleChoice.register("command",{
	name: "insertMultipleChoice",
	label: "MultipleChoice",
	run(pm, name) {
		let choice = Choice.prototype.create({start:0})
		return pm.tr.replaceSelection(this.create({name: name}, choice)).apply()
  	},
	params: [
		{ label: "Name", type: "text"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name]
	 }
})

Scale.register("command",{
	name: "insertScale",
	label: "Scale",
	run(pm, name, startvalue, startlabel, endvalue, endlabel) {
    	return pm.tr.replaceSelection(this.create({name,startvalue,startlabel,endvalue,endlabel})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Start value", type: "text", default: 1},
     	{ label: "Start label", type: "text", default: "min"},
     	{ label: "End value", type: "text", default: 10},
     	{ label: "End label", type: "text", default: "max"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.startvalue, node.attrs.startlabel, node.attrs.endvalue, node.attrs.endlabel]
	 }
}) 

Checklist.register("command", {
	name: "insertChecklist",
	label: "Checklist",
	run(pm, name, direction) {
		let checkitemType = pm.schema.nodes["checkitem"]
		let chkitem = checkitemType.create({name})                                    
		return pm.tr.replaceSelection(this.create({name, direction},chkitem)).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Layout (vertical, horizontal)", type: "select", options: [
     	    {value: "horizontal", label: "horizontal"},
     	    {value: "vertical", label: "vertical"}
     	  ]}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.direction]
	 }
})
 
Textfield.register("command", {
	name: "insertTextfield",
	label: "Textfield",
	run(pm, name, size) {
    	return pm.tr.replaceSelection(this.create({name,size})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Size", type: "text", default: "20" },
	],
    prefillParams(pm) {
	    let {node} = pm.selection
 	    if (node)
	      return [node.attrs.name, node.attrs.size ]
	 }
})

Textarea.register("command", {
	name: "insertTextarea",
	label: "Textarea",
	run(pm, name, rows, cols) {
    	return pm.tr.replaceSelection(this.create({name,rows,cols})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Rows", type: "text", default: "4"},
     	{ label: "Columns", type: "text", default: "20"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.rows, node.attrs.cols]
	 }
})  

Checkbox.register("command", {
	name: "insertCheckbox",
	label: "Checkbox",
	run(pm, name, label, loc) {
    	return pm.tr.replaceSelection(this.create({name, label, loc})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.label, node.attrs.loc]
	}
})

Select.register("command", {
	name: "insertSelect",
	label: "Select",
	run(pm, name, options, multiple) {
    	return pm.tr.replaceSelection(this.create({name,options,multiple})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
      	{ label: "Options (comma separated)", type: "text"},
     	{ label: "Selection (single or multiple)", type: "select", options: [
     	    {value: "multiple", label:"multiple"},
     	    {value: "single", label:"single"}
     	]}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node) {
	    	console.log(node.attrs.multiple)
	      return [node.attrs.name, node.attrs.options, node.attrs.multiple]
	    }
	 }
})

function selectClickedNode(pm, e) {
  let pos = selectableNodeAbove(pm, e.target, {left: e.clientX, top: e.clientY}, true)
  if (!pos) return pm.sel.pollForUpdate()

  let {node, from} = pm.selection
  if (node && pos.depth >= from.depth && pos.shorten(from.depth).cmp(from) == 0) {
    if (from.depth == 0) return pm.sel.pollForUpdate()
    pos = from.shorten()
  }

  pm.setNodeSelection(pos)
  pm.focus()
  e.preventDefault()
}


function defParamsClick(type) {
	type.prototype.handleClick = (pm, e, path, node) => {
		let menu = pm.mod.menuBar.menu
		let cmd = pm.commands["insert"+type.name]
		if (menu && cmd) {
			selectClickedNode(pm,e)
			menu.enter(readParams(cmd))
			return true;
		} else
			return false;
	}
}

defParamsClick(Scale)
defParamsClick(Textfield)
defParamsClick(Textarea)
defParamsClick(Checkbox)
defParamsClick(Select)
