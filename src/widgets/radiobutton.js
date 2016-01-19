import {Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser} from "../utils"
import {Input} from "./input"

export class RadioButton extends Input {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "radio"}),
			value: new Attribute,
			class: new Attribute({default: "widgets-radiobutton"})
		}
	}	
}

defParser(RadioButton,"input","widgets-radiobutton")

RadioButton.prototype.serializeDOM = (node,s) => s.renderAs(node,"input",node.attrs)

insertCSS(`

.widgets-radiobutton {}

`)