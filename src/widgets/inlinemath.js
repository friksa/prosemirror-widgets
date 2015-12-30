import {Inline, Attribute} from "../../../prosemirror/dist/model"
import {elt, insertCSS} from "../../../prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class InlineMath extends Inline {}

InlineMath.attributes = {
	tex: new Attribute({default: ""})
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
     	{ label: "Latex Expression", type: "text" }
	],
    prefillParams(pm) {
      let {node} = pm.selection
      if (node)
        return [node.attrs.tex]
    }
})

defParamsClick(InlineMath)

insertCSS(`

.widgets-inlinemath {}

`)