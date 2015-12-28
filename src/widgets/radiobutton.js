import {Attribute} from "../../../prosemirror/dist/model"
import {input} from "input"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {defParser} from "../utils"

export class RadioButton extends Input {}

RadioButton.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "radio"}),
	value: new Attribute(),
}

defParser(RadioButton,"input","widgets-radiobutton")

// inherits serializer from input


insertCSS(`

.widgets-radiobutton {}

`)