import {Block, Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr} from "../utils"

export class Select extends Inline {
	get contains() { return null}
	get attrs() {
		return {
			name: new Attribute,
			options: new Attribute,
		    multiple: new Attribute({default: "single"})
		}
	}
}

defParser(Select,"select","widgets-select")

Select.prototype.serializeDOM = node => {
	let selection = node.attrs.multiple == "multiple"
	let select = elt("select",{name: node.attrs.name, class: "widgets-select widgets-edit", size: 1, multiple: selection})
	node.attrs.options.split(",").map(function(option) {
		select.appendChild(elt("option", {value: option.trim()}, option))
	})
	return select
}

Select.register("command", {
	name: "insertSelect",
	label: "Select",
	run(pm, name, options, multiple) {
    	return pm.tr.replaceSelection(this.create({name,options,multiple})).apply(andScroll)
  	},
	params: [
  	    { name: "Name", label: "Short ID", type: "text",
     	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name") },
   		  options: {
   			  pattern: namePattern, 
   			  size: 10, 
   			  title: nameTitle}},
      	{ name: "Options", label: "comma separated names", type: "text", 
		  prefill: function(pm) { return selectedNodeAttr(pm, this, "options") }},
     	{ name: "Selection", label: "Selection (single or multiple)", type: "select", 
		  prefill: function(pm) { return selectedNodeAttr(pm, this, "multiple") },
		  options: [
     	    {value: "multiple", label:"multiple"},
     	    {value: "single", label:"single"}
     	]}
	]
})

defParamsClick(Select,"schema:select:insertSelect")

insertCSS(`

.ProseMirror .widgets-select {}

`)