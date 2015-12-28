import {Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {input} from "input"
import {defParser} from "../utils"

export class CheckBox extends Input {}

CheckBox.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "checkbox"}),
	value: new Attribute(),
}

defParser(Checkbox,"input","widgets-checkbox")

// Checkbox inherits serializer from input


CheckBox.register("command", {
	name: "insertCheckbox",
	label: "Checkbox",
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

insertCSS(`

.widgets-checkbox {}

`)