import {Paragraph, Block, Textblock, Inline, Attribute} from "../../../prosemirror/dist/model"
import {Schema, defaultSchema} from "../../../prosemirror/dist/model"

const defW = "200"
const defH = "200"


export class IFrame extends Block {}

IFrame.attributes = {
	src: new Attribute({default:""}),
	width: new Attribute({default: defW}),
	height: new Attribute({default: defH})
}

export class InlineMath extends Inline {}

InlineMath.attributes = {
	tex: new Attribute({default: ""})
} 

export class BlockMath extends Block {}

BlockMath.attributes = {
	tex: new Attribute({default: ""})
}

export const mediaSpec = new SchemaSpec({
	inlinemath: InlineMath,
	blockmath: BlockMath,
	iframe: IFrame
})
