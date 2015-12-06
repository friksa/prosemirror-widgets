import {ProseMirror, defineOption, Keymap, registerCommand} from "../../prosemirror/dist/edit"
import {Block, Inline, Attribute, Schema, defaultSchema} from "../../prosemirror/dist/model"
import {Tooltip} from "../../prosemirror/dist/menu/tooltip"
import {elt} from "../../prosemirror/dist/dom"
import "../../prosemirror/dist/menu/menubar"
import "../../prosemirror/dist/inputrules/autoinput" 
 

class MultipleChoice extends Block {}

MultipleChoice.attributes = {
	name: new Attribute({default: ""})
}

MultipleChoice.attachCommand("insertMultipleChoice", function(type) {
	return {
		label: "MultipleChoice Question",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		params: [
			     	{ name: "Short name", type: "text", default: "" }
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "block",
	    menuRank: 99,
	}
})  

MultipleChoice.register("parseDOM", {
  tag: "multiplechoice",
  rank: 25,
  parse: (dom, context, type, attrs) => {
	  console.log(attrs.type)
	let contains = dom.classList.contains('multiplechoice')
	if (!contains) return false
    context.insertFrom(dom, type, attrs)
  }
})
   
MultipleChoice.prototype.serializeDOM = node => {
	let dom = 
		elt("div", {class: "multiplechoice"}, 
			elt("p",{contenteditable:true},"Enter Stem"),
			elt("ul",{style: "list-style-type: none"},
				elt("li",{},
					elt("input",{name: node.name || "", type: "radio"})))
	    )
	return dom; 
}

const widgetsSchema = new Schema(defaultSchema.spec.updateNodes({ 
	iframe: IFrame,
	inlinemath: InlineMath,
	blockmath: BlockMath,
	multiplechoice: MultipleChoice
}))  

let pm = window.pm = new ProseMirror({
  place: document.querySelector("#editor"),
  menuBar: true,
  doc: document.querySelector("#content").innerHTML,
  docFormat: "html",
  schema: widgetsSchema,
  autoInput: true
})

