import {Block, Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class Select extends Inline {}

Select.attributes = {
	name: new Attribute(),
	options: new Attribute(),
    multiple: new Attribute({default: "single"})
}

defParser(Select,"select","widgets-select")

Select.prototype.serializeDOM = node => {
	let selection = node.attrs.multiple == "multiple"
	let select = elt("select",{name: node.attrs.name, class: "widgets-select", size: 1, multiple: selection})
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
	      return [node.attrs.name, node.attrs.options, node.attrs.multiple]
	    }
	 }
})

defParamsClick(Select)

insertCSS(`

.widgets-select {}

`)