import {Paragraph, Block, Textblock, Inline, Node, Attribute} from "../../../prosemirror/dist/model"
import {SchemaSpec, Schema, defaultSchema} from "../../../prosemirror/dist/model"

export class Input extends Inline {}

export class Checkbox extends Input {}

Checkbox.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "checkbox"}),
	class: new Attribute({default: "checkbox"}),
}

export class Radiobutton extends Input {}

Radiobutton.attributes = {
	name: new Attribute(),
	type: new Attribute({default: "radio"}),
	class: new Attribute({default: "radiobutton"}),
}

export class Textfield extends Input {}

Textfield.attributes = {
	name: new Attribute(),
	size: new Attribute({default: "20"}),
	type: new Attribute({default: "text"}),
	class: new Attribute({default: "textfield"}),
}

export class Textarea extends Block {}

Textarea.attributes = {
	name: new Attribute(),
	rows: new Attribute(),
	cols: new Attribute(),
	class: new Attribute({default: "textarea"})
}

export class Choice extends Textblock {}

export class MultipleChoice extends Block {
	static get contains() { return "choice"}
}

MultipleChoice.attributes = {
	name: new Attribute()
}

export class Scale extends Block {}

Scale.attributes = {
	name: new Attribute(),
	startvalue: new Attribute({default: "1"}),
	startlabel: new Attribute({default: "low"}),
	endvalue: new Attribute({default: "10"}),
	endlabel: new Attribute({default: "high"}),
}

export class Checkitem extends Paragraph {
	static get kind() { return "." }
}

export class Checklist extends Block {
	static get contains() { return "checkitem" }
}

Checklist.attributes = {
	name: new Attribute(),
	layout: new Attribute({default: "vertical"})
}


export class Select extends Inline {}

Select.attributes = {
	name: new Attribute(),
	options: new Attribute(),
    multiple: new Attribute({default: "single"})
}

export const formSpec = new SchemaSpec({
	input: Input,
	choice: Choice,
	multiplechoice: MultipleChoice,
	scale: Scale,
	checkitem: Checkitem,
	checklist: Checklist,
	textfield: Textfield,
	textarea: Textarea,
	checkbox: Checkbox,
	select: Select	
})
