import {Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll} from "../utils"

export class CheckBox extends Input {}

CheckBox.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "checkbox"}),
	value: new Attribute({default: 1}),
	class: new Attribute({default: "widgets-checkbox"})
}

defParser(CheckBox,"input","widgets-checkbox")

// Checkbox inherits serializer from input


CheckBox.register("command", {
	name: "insertCheckBox",
	label: "CheckBox",
	run(pm, name, label, loc) {
    	return pm.tr.replaceSelection(this.create({name, label, loc})).apply(andScroll)
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

defParamsClick(CheckBox)

insertCSS(`

.widgets-checkbox {}

`)