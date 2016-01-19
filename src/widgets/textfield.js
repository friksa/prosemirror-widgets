import {Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {Input} from "./input"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr} from "../utils"

export class TextField extends Input {
	get attrs() {
		return {
			name: new Attribute,
			type: new Attribute({default: "text"}),
			size: new Attribute({default: "20"}),
			class: new Attribute({default: "widgets-textfield widgets-edit"})
		}
	}
}

defParser(TextField,"input","widgets-textfield")

// serializer inherits from input

TextField.register("command", {
	name: "insertTextField",
	label: "TextField",
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

defParamsClick(TextField, "schema:textfield:insertTextField")

insertCSS(`

.ProseMirror .widgets-textfield {
	resize: horizontal;
	overflow: auto;
}

`)