import {Block, Attribute} from "C:/Users/pboysen/git/prosemirror/dist/model"
import {elt,insertCSS} from "C:/Users/pboysen/git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, selectedNodeAttr} from "../../utils"
 
export class BlockMath extends Block {
	get attrs() {
		return {
			tex: new Attribute({default: ""})
		}
	}
	get contains() { return null }
}

defParser(BlockMath,"div","widgets-blockmath")

BlockMath.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("div", {class: "widgets-blockmath widgets-edit"}, "\\["+node.attrs.tex+"\\]");
		// wait until node is attached to document to render
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,node.rendered])
	}
	return node.rendered; 
}

BlockMath.register("command", "insert", {
	label: "BlockMath",
	run(pm, tex) {
    	return pm.tr.replaceSelection(this.create({tex})).apply(andScroll)
  	},
	params: [
     	{ name: "Latex", label: "Latex Expression", type: "text", 
     	  prefill: function(pm) { return selectedNodeAttr(pm, this, "tex") }}
	]
})

defParamsClick(BlockMath,"blockmath:insert")

insertCSS(`

.ProseMirror .widgets-blockmath {}

`)