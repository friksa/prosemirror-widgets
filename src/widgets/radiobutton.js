import {Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {defParser} from "../utils"
import {Input} from "./input"

export class RadioButton extends Input {}

RadioButton.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "radio"}),
	value: new Attribute(),
	class: new Attribute({default: "widgets-radiobutton"})
}

defParser(RadioButton,"input","widgets-radiobutton")

// inherits serializer from input


insertCSS(`

.widgets-radiobutton {}

`)