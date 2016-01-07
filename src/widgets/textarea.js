import {Block, Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern} from "../utils"

export class TextArea extends Block {
	get attrs() {
		return {
			name: new Attribute,
			rows: new Attribute,
			cols: new Attribute,
			class: new Attribute({default: "widgets-textarea"})
		}
	}
}

TextArea.attributes = {
}

defParser(TextArea,"input","widgets-textarea")

TextArea.prototype.serializeDOM = (node,s) => s.renderAs(node,"textarea",node.attrs)

TextArea.register("command", {
	name: "insertTextArea",
	label: "TextArea",
	run(pm, name, rows, cols) {
    	return pm.tr.replaceSelection(this.create({name,rows,cols})).apply(andScroll)
  	},
	params: [
	    { name: "Name", label: "Short ID name", type: "text", options: {pattern: namePattern, size: 8}},
     	{ name: "Rows", label: "Rows in lines", type: "number", default: "4", options: {min: 1, max:20}},
     	{ name: "Columns", label: "Columns in characters", type: "number", default: "40", options: {min: 1, max:80}}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.rows, node.attrs.cols]
	 }
}) 

defParamsClick(TextArea,"schema:textarea:insertTextArea")

insertCSS(`

.widgets-textarea {}

`)