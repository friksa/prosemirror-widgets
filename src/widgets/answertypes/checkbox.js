import {Inline, Attribute} from "C:/Users/pboysen/git/prosemirror/dist/model"
import {insertCSS} from "C:/Users/pboysen/git/prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr} from "../../utils"

export class CheckBox extends Input {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "checkbox"}),
			value: new Attribute({default: "1"}),
			class: new Attribute({default: "widgets-checkbox"})
		}
	}
	get contains() { return null }
}

defParser(CheckBox,"input","widgets-checkbox")

CheckBox.prototype.serializeDOM = (node,s) => s.renderAs(node,"input",node.attrs)

CheckBox.register("command", "insert",{
	label: "CheckBox",
	run(pm, name) {
    	return pm.tr.replaceSelection(this.create({name})).apply(andScroll)
  	},
	params: [
	    { name: "Name", label: "Short ID", type: "text",
   	  	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name") },
 		  options: {
 			  pattern: namePattern, 
 			  size: 10, 
 			  title: nameTitle}
 		}
   	]
})

defParamsClick(CheckBox,"checkbox:insert",["all"])

insertCSS(`

.ProseMirror .widgets-checkbox:hover {
	cursor: pointer;
}

`)