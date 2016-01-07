import {Block, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt,insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"
 
export class BlockMath extends Block {
	get attrs() {
		return {
			tex: new Attribute({default: ""})
		}
	}
}

defParser(BlockMath,"div","widgets-blockmath")

BlockMath.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("div", {class: "widgets-blockmath"}, "\\["+node.attrs.tex+"\\]");
		// wait until node is attached to document to render
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,node.rendered])
	}
	return node.rendered; 
}

BlockMath.register("command", {
	name: "insertBlockMath",
	label: "BlockMath",
	run(pm, tex) {
    	return pm.tr.replaceSelection(this.create({tex})).apply(andScroll)
  	},
	params: [
     	{ name: "Latex", label: "Latex Expression", type: "text"}
	],
    prefillParams(pm) {
      let {node} = pm.selection
      if (node && node.type == this)
        return [node.attrs.tex]
    }
})

defParamsClick(BlockMath,"schema:blockmath:insertBlockMath")

insertCSS(`

.widgets-blockmath {}

`)