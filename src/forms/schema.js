import {Paragraph, Block, Textblock, Inline, Attribute} from "../../../prosemirror/dist/model"
import {SchemaSpec, Schema, defaultSchema} from "../../../prosemirror/dist/model"

export class Choice extends Block {}

export class MultipleChoice extends Block {
	static get contains() { return "choice" }
}

MultipleChoice.attributes = {
	name: new Attribute()
}

export class Scale extends Inline {}

Scale.attributes = {
	name: new Attribute(),
	minvalue: new Attribute({default: "1"}),
	minlabel: new Attribute({default: "low"}),
	maxvalue: new Attribute({default: "10"}),
	maxlabel: new Attribute({default: "high"}),
}

export class Checkitem extends Block {}

export class Checklist extends Block {
	static get contains() { return "checkitem" }
}

Checklist.attributes = {
	name: new Attribute(),
	direction: new Attribute({default: "vertical"})
}

export class Textfield extends Inline {}

Textfield.attributes = {
	name: new Attribute(),
	label: new Attribute(),
	loc: new Attribute(),
	size: new Attribute({default: "20"})
}


export class Textarea extends Block {}
Textarea.attributes = {
	name: new Attribute(),
	label: new Attribute(),
	rows: new Attribute(),
	cols: new Attribute()
}

export class Checkbox extends Inline {}

Checkbox.attributes = {
	name: new Attribute(),
	label: new Attribute(),
}

export class Select extends Inline {}

Select.attributes = {
	name: new Attribute(),
	label: new Attribute(),
	options: new Attribute(),
    multiple: new Attribute({default: "single"})
}

export const formSpec = new SchemaSpec({
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

export const formSchema = new Schema(defaultSchema.spec.updateNodes(formSpec.nodes))