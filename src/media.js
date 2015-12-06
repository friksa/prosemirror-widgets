import {Block, Inline, Attribute, Schema, defaultSchema} from "../../prosemirror/dist/model"
import {elt} from "../../prosemirror/dist/dom"

const defW = "200"
const defH = "200"
const quadratic = "x = {-b\pm\sqrt{b^2-4ac} \over 2a}"	
const einstein = "e = mc^2"
const multiline = "\begin{eqnarray}\y &=& x^4 + 4      \nonumber \ &=& (x^2+2)^2 -4x^2 \nonumber \&\le&(x^2+2)^2    \nonumber\\end{eqnarray}"
const matrix = "\begin{matrix}a & b\cr c & d\end{matrix}"

export class IFrame extends Block {}

IFrame.attributes = {
		src: new Attribute({default:""}),
		width: new Attribute({default: defW}),
		height: new Attribute({default: defH}),
	}

	IFrame.attachCommand("insertIFrame", function(type) {
		return {
			label: "websites, youTube, GoogleMaps,...",
			run(pm, src, width, height) {
		    	return pm.tr.replaceSelection(type.create({src, width, height})).apply()
		  	},
			params: [
		     	{ name: "Link (website, youTube, Google Maps ...)", type: "text", default: "" },
		     	{ name: "Width in pixels", type: "text", default: defW },
		     	{ name: "Height in pixels", type: "text", default: defH },
			],
		    menuGroup: "block",
		    menuRank: 97,
		    icon: { css: "background: url('icons/media.gif') no-repeat; height: 10px"},
		    prefillParams(pm) {
		      let {node} = pm.selection
		      if (node && node.type == type)
		        return [node.attrs.src, node.attrs.width, node.attrs.height]
		    }
		}
	})   

IFrame.register("parseDOM", {
  tag: "iframe", 
  rank: 25,
  parse: (dom, context, nodeType) => {
	let src = dom.querySelector("iframe").src;
	if (!src) return false;
    context.insert(nodeType.create(IFrame.attributes))
  }
})

IFrame.prototype.serializeDOM = node => { 
	let dom = elt("iframe", {
	  src: node.attrs.src,
	  width: node.attrs.width,
	  height: node.attrs.height,
	  content: "text/html;charset=UTF-8",
	  frameborder: "1",
	  allowfullscreen: "1"
	})
	return dom
}
	 
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
  tag: "inlinemath",
  rank: 40,
  parse: (dom, context, type, attrs) => {
	let inlineMath = dom.classList.contains('inlinemath')
	if (!inlineMath) return false
    context.insertFrom(dom, type, attrs)
  }
})

InlineMath.prototype.serializeDOM = node => {
	let dom = elt("span", {class: "inlinemath"}, " \\("+node.attrs.tex+"\\) ")
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = dom;
		// wait until node is attached to document
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,dom])
	}
	return node.rendered;
}

export class BlockMath extends Block {}

BlockMath.attributes = {
	tex: new Attribute({default: ""})
}

Block.attachCommand("insertBlockMath", function(type) {
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
  tag: "blockmath",
  rank: 25,
  parse: (dom, context, type, attrs) => {
	  console.log(attrs.type)
	let blockMath = dom.classList.contains('blockmath')
	if (!blockMath) return false
    context.insertFrom(dom, type, attrs)
  }
})
   
BlockMath.prototype.serializeDOM = node => {
	let dom = elt("div", {class: "blockmath"}, "\\["+node.attrs.tex+"\\]")
	if (!node.rendered) {
		node.rendered = dom;
		// wait until node is attached to document
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,dom])
	}
	return node.rendered; 
} 

