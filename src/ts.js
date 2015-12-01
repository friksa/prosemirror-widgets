import {ProseMirror, defineOption, Keymap, registerCommand} from "../dist/edit"
import {Block, Inline, Textblock, Attribute, Schema, defaultSchema} from "../dist/model"
import {elt} from "../dist/dom"
import {defineParamHandler} from "../dist/edit"
import {Tooltip} from "../dist/menu/tooltip"
import {MenuBar,BarDisplay} from "../dist/menu/menubar"
import "../dist/inputrules/autoinput"
import sortedInsert from "../dist/util/sortedinsert"
import defineCommand from "../dist/edit/commands"

const defW = "200"
const defH = "200"
const quadratic = "x={-b\\pm\\sqrt{b^2-4ac} \\over 2a}"		
/*
 * IFrame section
 */
class IFrame extends Block {}

IFrame.attributes = {
	src: new Attribute({default:""}),
	width: new Attribute({default: defW}),
	height: new Attribute({default: defH}),
	frameborder: new Attribute({default: "1"}),
	allowfullscreen: new Attribute({default: "1"}),
	content: new Attribute({default: "text/html;charset=UTF-8"})
}

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
	  "src": node.attrs.src,
	  "width": node.attrs.width,
	  "height": node.attrs.height,
	  "content": "text/html;charset=UTF-8",
	  "frameborder": "1",
	  "allowfullscreen": "1"
	})
    dom.addEventListener("mousedown", e => {
        e.preventDefault(); e.stopPropagation()
// how do I prompt for attributes?        
      })
	return dom
}

class InlineMath extends Inline {}
InlineMath.attributes = {
	tex: new Attribute({default:"?"}),
}

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
    dom.addEventListener("mousedown", e => {
    	console.log(dom)
        e.preventDefault(); e.stopPropagation()
      })
	return node.rendered;
}

class BlockMath extends Block {}
BlockMath.attributes = {
	rendered: new Attribute({default:false})
}

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
	let dom = elt("div", {class: "blockmath"}, "\\[ "+quadratic+" \\]")
	if (!node.rendered) {
		node.rendered = dom;
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,dom])
	}
	return node.rendered;
}

class Insert extends Block {}

const insertTypes = ["Insert...", "IFrame", "InlineMath", "BlockMath"].map(name => ({label: name, value: name, rank: 99}))
Insert.prototype.insertTypes = insertTypes
const insertSchema = new Schema(defaultSchema.spec.updateNodes({
	Insert: Insert,
	IFrame: IFrame,
	InlineMath: InlineMath,
	BlockMath: BlockMath
}))

function insertTypeCommand(type, params, attrs) {
  if (!params) params = {}
  if (!attrs) attrs = {}
  type.attachCommand("make"+type.label, nodeType => ({
    params: params,
    exec(pm, params) {
    	console("exec "+type.label)
    },
    run(pm, params) {
    	console("run "+type.label)
    },
    select(pm) {
        let can = pm.doc.path(pm.selection.from.path).type.canContainType(nodeType)
        console.log(type.label+can);
        return can;
    }
  }))  
}

insertTypeCommand(IFrame,[
	{	name: "Link (youTube, Google Maps ...)", 
		type: "text", 
		default: ""
	}
  ], 
  {}
)

insertTypeCommand(InlineMath,[
	{	name: "Latex expression", 
    	type: "text", 
    	default: ""
    }
  ],
  {}
)

insertTypeCommand(BlockMath,[
 	{	src: "Website URL", 
    	type: "text", 
    	default: ""
    }
  ],
  {}
)
  
Insert.attachCommand("selectInsert", type => ({
  label: "Insert",
  run(pm, type) {
	  if (type == "Insert...") return false
	  let insertType = pm.schema.nodes[type]
	  let dom = insertType.create();
	  return pm.tr.replaceSelection(dom).apply()
  },
  params: [
     {name: "Type", type: "select", options: insertTypes, defaultLabel: "Insert..."}
  ],
  select(pm) {
      return true;
  },
  display: "select",
  menuGroup: "block", menuRank: 99
}))

function insertParamHandler(pm, command, callback) {
  let tooltip = new Tooltip(pm, "center")
  console.log(tooltip)
  tooltip.open(paramForm(pm, command, params => {
    pm.focus()
    tooltip.close()
    callback(params)
  }))
}

defineParamHandler("insertHandler", insertParamHandler)
defineOption("commandParamHandler","insertHandler",false,false)

let pm = window.insertPM = new ProseMirror({
  place: document.querySelector("#editor"),
  menuBar: true,
  doc: document.querySelector("#content").innerHTML,
  docFormat: "html",
  schema: insertSchema,
  autoInput: true
})

