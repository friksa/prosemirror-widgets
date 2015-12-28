import {Block, Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {defParser} from "../utils"

export class TextArea extends Block {}

TextArea.attributes = {
	name: new Attribute(),
	rows: new Attribute(),
	cols: new Attribute()
}

defParser(TextArea,"input","widgets-textarea")

TextArea.prototype.serializeDOM = (node,s) => s.renderAs(node,"textarea",node.attrs)

TextArea.register("command", {
	name: "insertTextarea",
	label: "Textarea",
	run(pm, name, rows, cols) {
    	return pm.tr.replaceSelection(this.create({name,rows,cols})).apply(andScroll)
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Rows", type: "text", default: "4"},
     	{ label: "Columns", type: "text", default: "20"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.rows, node.attrs.cols]
	 }
})  
insertCSS(`

.textarea {}

`)