import {Attribute} from "C:/Users/pboysen/git/prosemirror/dist/model"
import {insertCSS} from "C:/Users/pboysen/git/prosemirror/dist/dom"
import {defParser} from "../../utils"
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
	get selectable() { return true}
	get contains() { return null}
}

defParser(RadioButton,"input","widgets-radiobutton")

RadioButton.prototype.serializeDOM = (node,s) => s.renderAs(node,"input",node.attrs)

insertCSS(`

.widgets-radiobutton {}

`)