import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select} from "./schema"
import {readParams,Tooltip} from "../../../prosemirror/dist/menu/menu"
import {NodeType} from "../../../prosemirror/dist/model"

MultipleChoice.register("command",{
	name: "insertMultipleChoice",
	label: "Multiple-choice",
	run(pm, name) {
		//let content  = [formSchema.node("paragraph"), formSchema.node("choice")]
    	return pm.tr.replaceSelection(this.create({name: name})).apply()
  	},
	params: [
		{ label: "Name", type: "text"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name]
	 }
})
  

Scale.register("command",{
	name: "insertScale",
	label: "Scale",
	run(pm, name, minvalue, minlabel, maxvalue, maxlabel) {
    	return pm.tr.replaceSelection(this.create({name,minvalue,minlabel,maxvalue,maxlabel})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Minimum value", type: "text", default: 1},
     	{ label: "Minimum label", type: "text", default: "min"},
     	{ label: "Maximum value", type: "text", default: 10},
     	{ label: "Maximum label", type: "text", default: "max"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name, node.attrs.minvalue, node.attrs.minlabel, node.attrs.maxvalue, node.attrs.maxlabel]
	 }
}) 

Checklist.register("command", {
	name: "insertChecklist",
	label: "Checklist",
	run(pm, name, direction) {
		return pm.tr.replaceSelection(this.create({name, direction})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Direction (vertical, horizontal)", type: "select", options: [
     	    {value: "horizontal", label: "horizontal"},
     	    {value: "vertical", label: "vertical"}
     	  ]}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name, node.attrs.direction]
	 }
})

Textfield.register("command", {
	name: "insertTextfield",
	label: "Textfield",
	run(pm, name, label, loc, size) {
    	return pm.tr.replaceSelection(this.create({name,label,loc,size})).apply()
  	},
  	select(pm) {
  		console.log("select")
  		let {node} = pm.selection
  		if (node) {
  			console.log(node)
			let menu = pm.mod.menuBar.menu
			let cmd = pm.commands["Textfield"]
			console.log("select")
			if (menu && cmd) menu.enter(readParams(cmd))
  		}
	  	return true
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Label", type: "text"},
     	{ label: "Label Location (left,right,top)", type: "select", options: [
     	    {value: "right", label: "right"},
     	    {value: "top", label:"top"},
     	    {value: "left", label: "left"}
     	]},
     	{ label: "Size", type: "text", default: "20" }
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this) {
	    	console.log("prefill")
	      return [node.attrs.name, node.attrs.label, node.attrs.loc, node.attrs.size]
	    }
	 }
})

Textarea.register("command", {
	name: "insertTextarea",
	label: "Textarea",
	run(pm, name, label, rows, cols) {
    	return pm.tr.replaceSelection(this.create({name,label,rows,cols})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Label", type: "text"},
     	{ label: "Rows", type: "text", default: "4"},
     	{ label: "Columns", type: "text", default: "20"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name, node.attrs.label, node.attrs.rows, node.attrs.cols]
	 }
})  

Checkbox.register("command", {
	name: "insertCheckbox",
	label: "Checkbox",
	run(pm, name, label) {
    	return pm.tr.replaceSelection(this.create({name, label})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Label", type: "text"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name, node.attrs.label]
	}
})

Select.register("command", {
	name: "insertSelect",
	label: "Select",
	run(pm, name, label, options, multiple) {
    	return pm.tr.replaceSelection(this.create({name,label,options,multiple})).apply()
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Label", type: "text"},
     	{ label: "Options (comma separated)", type: "text"},
     	{ label: "Selection (single or multiple)", type: "select", options: [
     	    {value: "multiple", label:"multiple"},
     	    {value: "single", label:"single"}
     	]}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name, node.attrs.label, node.attrs.options, node.attrs.multiple]
	 }
})

