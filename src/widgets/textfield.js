import {Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll, getNameParam} from "../utils"

export class TextField extends Input {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "text"}),
			size: new Attribute({default: "20"}),
			class: new Attribute({default: "widgets-textfield"})
		}
	}
}

defParser(TextField,"input","widgets-textfield")

// serializer inherits from input

TextField.register("command", {
	name: "insertTextField",
	label: "TextField",
	run(pm, name, size) {
    	return pm.tr.replaceSelection(this.create({name,size})).apply(andScroll)
  	},
	params: [
	    getNameParam(),
     	{ name: "Size", label: "Size in characters", type: "number", default: "20", options: {min: 1, max:80}}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
 	    if (node && node.type == this)
	      return [node.attrs.name, node.attrs.size ]
	 }
})

defParamsClick(TextField, "schema:textfield:insertTextField")

insertCSS(`

.ProseMirror .widgets-textfield:hover {
	cursor: pointer
}

`)