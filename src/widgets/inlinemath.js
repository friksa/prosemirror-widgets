import {Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class InlineMath extends Inline {
	get attrs() {
		return {
			tex: new Attribute
		}
	}
}

defParser(InlineMath, "span", "widgets-inlinemath")

InlineMath.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("span", {class: "widgets-inlinemath"}, " \\("+node.attrs.tex+"\\) ")
		// wait until node is attached to document to render
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,node.rendered])
	}
	return node.rendered;
}


InlineMath.register("command", {
	name: "insertInlineMath",
	label: "InlineMath",
	run(pm, tex) {
    	return pm.tr.replaceSelection(this.create({tex})).apply(andScroll)
  	},
	params: [
     	{ name: "Latex", label: "Latex Expression", type: "text" }
	],
    prefillParams(pm) {
      let {node} = pm.selection
      if (node && node.type == this)
        return [node.attrs.tex]
    }
})

defParamsClick(InlineMath,"schema:inlinemath:insertInlineMath")

insertCSS(`

.widgets-inlinemath {}

`)