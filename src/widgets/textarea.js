import {Block, Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr} from "../utils"

export class TextArea extends Block {
	get attrs() {
		return {
			name: new Attribute,
			rows: new Attribute,
			cols: new Attribute,
			class: new Attribute({default: "widgets-textarea"})
		}
	}
	get contains() { return null }
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
  	    { name: "Name", label: "Short ID", type: "text",
     	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name") },
   		  options: {
   			  pattern: namePattern, 
   			  size: 10, 
   			  title: nameTitle}},
     	{ name: "Rows", label: "Rows in lines", type: "number", default: "4", options: {min: 1, max:20}, 
		  prefill: function(pm) { return selectedNodeAttr(pm, this, "rows") }},
     	{ name: "Columns", label: "Columns in characters", type: "number", default: "40", 
		  prefill: function(pm) { return selectedNodeAttr(pm, this, "cols") },
		  options: {min: 1, max:80}}
	]
}) 

defParamsClick(TextArea,"schema:textarea:insertTextArea")

insertCSS(`

.ProseMirror .widgets-textarea:hover {
	cursor: pointer
}

`)