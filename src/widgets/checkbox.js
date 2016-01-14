import {Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll, getNameParam} from "../utils"

export class CheckBox extends Input {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "checkbox"}),
			value: new Attribute({default: "1"}),
			class: new Attribute({default: "widgets-checkbox"})
		}
	}
	get contains() { return null }
}

defParser(CheckBox,"input","widgets-checkbox")

CheckBox.register("command", {
	name: "insertCheckBox",
	label: "CheckBox",
	run(pm, name) {
    	return pm.tr.replaceSelection(this.create({name})).apply(andScroll)
  	},
	params: [getNameParam()],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name]
	}
})

defParamsClick(CheckBox,"schema:checkbox:insertCheckBox")

insertCSS(`

.ProseMirror .widgets-checkbox:hover {
	cursor: pointer;
}

`)