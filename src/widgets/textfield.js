import {Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll, namePattern} from "../utils"

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
     	{ name: "Name", label: "Short ID name", type: "text", options: {pattern: namePattern, size: 8}},
     	{ name: "Size", label: "Size in characters", type: "number", default: "20", options: {min: 1, max:80}}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
 	    if (node)
	      return [node.attrs.name, node.attrs.size ]
	 }
})

defParamsClick(TextField, "schema:textfield:insertTextField")

insertCSS(`

.widgets-textfield {}

`)