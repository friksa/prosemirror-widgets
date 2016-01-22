import {Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr} from "../utils"

export class ShortAnswer extends Input {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "text"}),
			size: new Attribute({default: "20"}),
			class: new Attribute({default: "widgets-shortanswer widgets-edit"})
		}
	}
	get contains() { return null }
}

defParser(ShortAnswer,"input","widgets-shortanswer")

ShortAnswer.prototype.serializeDOM = (node,s) => s.renderAs(node,"input",node.attrs)


ShortAnswer.register("command", "insert", {
	label: "ShortAnswer",
	run(pm, name, size) {
    	return pm.tr.replaceSelection(this.create({name,size})).apply(andScroll)
  	},
	params: [
  	    { name: "Name", label: "Short ID", type: "text",
     	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name") },
   		  options: {
   			  pattern: namePattern, 
   			  size: 10, 
   			  title: nameTitle}},
     	{ name: "Size", label: "Size in characters", type: "number", default: "20", 
		  prefill: function(pm) { return selectedNodeAttr(pm, this, "size") },
	      options: {min: 1, max:80}}
	]
})

defParamsClick(ShortAnswer, "shortanswer:insert")

insertCSS(`

.ProseMirror .widgets-shortanswer {
	resize: horizontal;
	overflow: auto;
}

`)