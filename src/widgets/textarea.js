import {Block, Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr, getLastClicked} from "../utils"

export class TextArea extends Block {
	get attrs() {
		return {
			name: new Attribute,
			rows: new Attribute,
			cols: new Attribute,
			class: new Attribute({default: "widgets-textarea widgets-edit"})
		}
	}
	get contains() { return null }
}

defParser(TextArea,"input","widgets-textarea")

// if new then use default. If style has changed, textarea has been resized otherwise return the stored value
/*function getDim(pm, dim) {
	let dom = getLastClicked()
	if (!dom) return 200
	if (dom.style[dim].length > 2) return dom.style[dim].slice(0,dom.style[dim].length-2)
}
*/
TextArea.prototype.serializeDOM = (node,s) => s.renderAs(node,"textarea",{
	name: node.attrs.name,
	rows: node.attrs.rows,
	cols: node.attrs.cols,
	class: "widgets-textarea widgets-edit"
})

TextArea.register("command", {
	name: "insertTextArea",
	label: "TextArea",
	run(pm, name, rows, cols) {
    	return pm.tr.replaceSelection(this.create({name,rows,cols})).apply(andScroll)
  	},
	params: [
  	    { name: "Name", label: "Short ID", type: "text",
     	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name")},
   		  options: {
   			  pattern: namePattern, 
   			  size: 10, 
   			  title: nameTitle
   		  }},
   		  { name: "Rows", label: "In lines lines", type: "number", default: "4", options: {min: 2, max:24}, 
   			  prefill: function(pm) { return selectedNodeAttr(pm, this, "rows") }
   		  },
   	      { name: "Columns", label: "In characters", type: "number", default: "40", 
   			  prefill: function(pm) { return selectedNodeAttr(pm, this, "cols") },
   			  options: {min: 2, max:80}
   		  }
	]
}) 

defParamsClick(TextArea,"schema:textarea:insertTextArea")

insertCSS(`

.ProseMirror .widgets-textarea {
	resize: none;
}

`)