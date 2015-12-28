import {Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {input} from "input"
import {defParser} from "../utils"

export class TextField extends Input {}

TextField.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "text"}),
	size: new Attribute({default: "20"})
}

defParser(TextField,"input","widgets-textfield")

// serializer inherits from input

TextField.register("command", {
	name: "insertTextfield",
	label: "Textfield",
	run(pm, name, size) {
    	return pm.tr.replaceSelection(this.create({name,size})).apply(andScroll)
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Size", type: "text", default: "20" },
	],
    prefillParams(pm) {
	    let {node} = pm.selection
 	    if (node)
	      return [node.attrs.name, node.attrs.size ]
	 }
})

insertCSS(`

.widgets-textfield {}

`)