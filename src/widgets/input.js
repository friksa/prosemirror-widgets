import {Inline, Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {defParser} from "../utils"

export class Input extends Inline {}

Input.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "text"}),
	value: new Attribute(),
}

defParser(Input,"widgets-input")

Input.prototype.serializeDOM = (node,s) => s.renderAs(node,"widgets-input",node.attrs)

insertCSS(`
		
.widgets-input {}

`)