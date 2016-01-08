import {Block, Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern} from "../utils"

export class Select extends Inline {
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
	 	{ name: "Name", label: "Short ID name", type: "text", options: {pattern: namePattern, size: 10}},
      	{ name: "Options", label: "comma separated names", type: "text"},
     	{ name: "Selection", label: "Selection (single or multiple)", type: "select", options: [
     	    {value: "multiple", label:"multiple"},
     	    {value: "single", label:"single"}
     	]}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this) {
	      return [node.attrs.name, node.attrs.options, node.attrs.multiple]
	    }
	 }
})

defParamsClick(Select,"schema:select:insertSelect")

insertCSS(`

.ProseMirror .widgets-select:hover {
	cursor: pointer;
}

`)