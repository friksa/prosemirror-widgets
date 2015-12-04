import {ProseMirror, defineOption, Keymap, registerCommand} from "../../prosemirror/dist/edit"
import {Block, Inline, Attribute, Schema, defaultSchema} from "../../prosemirror/dist/model"
import {Tooltip} from "../../prosemirror/dist/menu/tooltip"
import {elt} from "../../prosemirror/dist/dom"
import "../../prosemirror/dist/menu/menubar"
import "../../prosemirror/dist/inputrules/autoinput" 
 
const defW = "200"
const defH = "200"
const quadratic = "x = {-b\\pm\\sqrt{b^2-4ac} \\over 2a}"	
const einstein = "e = mc^2"

/*
 * IFrame section
 */
class IFrame extends Block {}
 
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
	    menuRank: 99,
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
	  style : "pointer-events: none",
	  width: node.attrs.width,
	  height: node.attrs.height,
	  content: "text/html;charset=UTF-8",
	  frameborder: "1",
	  allowfullscreen: "1"
	})
	return dom
}
 

class InlineMath extends Inline {}

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
	let dom = elt("span", {class: "inlinemath"}, " \\("+node.attrs.tex+"\\) ")
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = dom;
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,dom])
	}
	return node.rendered;
}

class BlockMath extends Block {}

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
	    menuRank: 99,
	    icon: { css: "background: url('icons/equation.gif') no-repeat; height: 10px"},
	    prefillParams(pm) {
	      let {node} = pm.selection
	      if (node && node.type == type)
	        return [node.attrs.tex]
	    }
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
	let dom = elt("div", {class: "blockmath"}, "\\[ "+node.attrs.tex+" \\]")
	if (!node.rendered) {
		node.rendered = dom;
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,dom])
	}
	return node.rendered; 
} 

const widgetsSchema = new Schema(defaultSchema.spec.updateNodes({ 
	iframe: IFrame,
	inlinemath: InlineMath,
	blockmath: BlockMath
}))  

let pm = window.pm = new ProseMirror({
  place: document.querySelector("#editor"),
  menuBar: true,
  doc: document.querySelector("#content").innerHTML,
  docFormat: "html",
  schema: widgetsSchema,
  autoInput: true
})

