import {Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll, namePattern} from "../utils"

export class CheckBox extends Input {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "checkbox"}),
			value: new Attribute({default: "1"}),
			class: new Attribute({default: "widgets-checkbox"})
		}
	}
}

defParser(CheckBox,"input","widgets-checkbox")

CheckBox.register("command", {
	name: "insertCheckBox",
	label: "CheckBox",
	run(pm, name) {
    	return pm.tr.replaceSelection(this.create({name})).apply(andScroll)
  	},
	params: [
	   { name: "Name", label: "Short ID name", type: "text", default: "", options: {pattern: namePattern, size: 8}},
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name]
	}
})

defParamsClick(CheckBox,"schema:checkbox:insertCheckBox")

insertCSS(`

.widgets-checkbox {}

`)