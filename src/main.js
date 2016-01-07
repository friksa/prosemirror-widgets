import {ProseMirror} from "../../../git/prosemirror/dist/edit"
import {insertCSS} from "../../../git/prosemirror/dist/dom"
import "../../../git/prosemirror/dist/menu/tooltipmenu"
import "../../../git/prosemirror/dist/menu/menubar"
import "../../../git/prosemirror/dist/inputrules/autoinput"
import {widgetParamHandler, defineFileHandler} from "./utils"
 
import {Doc, Textblock, BlockQuote, OrderedList, BulletList, ListItem, HorizontalRule,
	Paragraph, Heading, Text, HardBreak,
	EmMark, StrongMark, LinkMark, CodeMark, Schema, SchemaSpec} from "../../../git/prosemirror/dist/model"

import {Input, TextField, TextArea, CheckBox, RadioButton, Select, 
	IFrame, InlineMath, BlockMath, Image, SpreadSheet,CarryForward,
	Choice, MultipleChoice, Scale, CheckItem, CheckList, Widget} from "./widgets"


const widgetsSpec = new SchemaSpec({
	doc: Doc,
	blockquote: BlockQuote,
	ordered_list: OrderedList,
	bullet_list: BulletList,
	list_item: ListItem,
	horizontal_rule: HorizontalRule,

	paragraph: Paragraph,
	heading: Heading,

	text: Text,
	image: Image,
	hard_break: HardBreak,
	
	input: Input,
	textfield: TextField,
	textarea: TextArea,
	checkbox: CheckBox,
	radiobutton: RadioButton,
	select: Select,
	inlinemath: InlineMath,
	blockmath: BlockMath,
	iframe: IFrame,
	carryforward: CarryForward,
	choice: Choice,
	multiplechoice: MultipleChoice,
	scale: Scale,
	checkitem: CheckItem,
	checklist: CheckList,
	spreadsheet: SpreadSheet,
	widget: Widget
}, {
	em: EmMark,
	strong: StrongMark,
	link: LinkMark,
	code: CodeMark
})

const widgetSchema = new Schema(widgetsSpec)

let pm = window.pm = new ProseMirror({
  place: document.querySelector("#editor"),
  menuBar: true,
  doc: document.querySelector("#content").innerHTML,
  docFormat: "html",
  schema: widgetSchema,
  commandParamHandler: "widgetParamHandler",
  autoInput: true
})

defineFileHandler(function(files) {
	console.log(files)
})

insertCSS(`
		
.ProseMirror {
	width: 800px;
	min-height: 200px;
}

div.ProseMirror-select-menu {
  position: absolute;
  background: #0191C8;
  color: white;
  padding: 2px 2px;
  z-index: 15;
}

div.ProseMirror-select-menu div {
  cursor: pointer;
  padding: 0 1em 0 2px;
}

div.ProseMirror-select-menu div:hover {
  background: #D6F2F8;
  color: #0191C8;
}

div.ProseMirror-menubar-inner {
  background: linear-gradient(to bottom, white, #0191C8);
}

div.ProseMirror-menu form {
	background: linear-gradient(to bottom, white, #0191C8);	//background: #D6F2F8;
	width: 300px;
}

div.ProseMirror-menu form select {
	width: 100px;
	background: white;
}

div.ProseMirror-menu input[type = "text"] {
	background: white;
}

/*div.ProseMirror-menubar-sliding {
  -webkit-transition: right 0.2s ease-in;
  -moz-transition: right 0.2s ease-in;
  transition: right 0.2s ease-in;
  position: relative;
  left: 100%;
  width: 100%;
  box-sizing: -moz-border-box;
  box-sizing: border-box;
  padding-left: 16px;
  background: #D6F2F8;
}*/


`)

