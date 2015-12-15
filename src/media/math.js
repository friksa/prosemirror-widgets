import {Block, Inline, Attribute} from "../../../prosemirror/dist/model"
import {elt} from "../../../prosemirror/dist/dom"

const quadratic = "x = {-b\pm\sqrt{b^2-4ac} \over 2a}"	
const einstein = "e = mc^2"
const multiline = "\begin{eqnarray}\y &=& x^4 + 4      \nonumber \ &=& (x^2+2)^2 -4x^2 \nonumber \&\le&(x^2+2)^2    \nonumber\\end{eqnarray}"
const matrix = "\begin{matrix}a & b\cr c & d\end{matrix}"
	
MathJax.Hub.Queue(function () {
    MathJax.Hub.Config({
    	tex2jax: {
        	displayMath: [ ["\\[","\\]"] ], 
        	inlineMath: [ ["\\(","\\)"] ],
        	processEscapes: true
    	},
    	displayAlign:"left"
	})
})

export class InlineMath extends Inline {}

InlineMath.attributes = {
	tex: new Attribute({default: ""})
} 
   
InlineMath.attachCommand("insertInlineMath", function(type) {
	return {
		label: "InlineMath",
		run(pm, tex) {
	    	return pm.tr.replaceSelection(type.create({tex})).apply()
	  	},
		params: [
	     	{ name: "Latex Expression", type: "text", default: "" }
		],
	    menuGroup: "inline",
	    menuRank: 41,
	    icon: { css: "background: url('icons/equation.gif') no-repeat; height: 10px"},
	    prefillParams(pm) {
	      let {node} = pm.selection
	      if (node && node.type == type)
	        return [node.attrs.tex]
	    }
	}
})  

InlineMath.register("parseDOM", {
  tag: "span",
  rank: 40,
  parse: (dom, context, type, attrs) => {
	let inlineMath = dom.classList.contains('inlinemath')
	if (!inlineMath) return false
    context.insertFrom(dom, type, attrs)
  }
})

InlineMath.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("span", {class: "inlinemath"}, " \\("+node.attrs.tex+"\\) ")
		// wait until node is attached to document to render
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,node.rendered])
	}
	return node.rendered;
}

export class BlockMath extends Block {}

BlockMath.attributes = {
	tex: new Attribute({default: ""})
}

BlockMath.attachCommand("insertBlockMath", function(type) {
	return {
		label: "BlockMath",
		run(pm, tex) {
	    	return pm.tr.replaceSelection(type.create({tex})).apply()
	  	},
		params: [
	     	{ name: "Latex Expression", type: "text", default: "" }
		],
	    menuGroup: "block",
	    menuRank: 90,
	    icon: { css: "background: url('icons/equation.gif') no-repeat; height: 10px"},
	}
})  

BlockMath.register("parseDOM", {
  tag: "div",
  rank: 25,
  parse: (dom, context, type, attrs) => {
	let blockMath = dom.classList.contains('blockmath')
	if (!blockMath) return false
    context.insertFrom(dom, type, attrs)
  }
})
   
BlockMath.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("div", {class: "blockmath"}, "\\["+node.attrs.tex+"\\]");
		// wait until node is attached to document to render
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,node.rendered])
	}
	return node.rendered; 
} 

