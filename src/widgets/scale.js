import {Block, Paragraph, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, getNameParam} from "../utils"

export class Scale extends Block {
	static get contains() { return "paragraph"}
	get attrs() {
		return {
			name: new Attribute,
			title: new Attribute,
			startvalue: new Attribute({default: "1"}),
			startlabel: new Attribute({default: "low"}),
			endvalue: new Attribute({default: "10"}),
			endlabel: new Attribute({default: "high"}),
		}
	}
}

defParser(Scale,"div","scale")

Scale.prototype.serializeDOM = (node,s) => {
	let dom = s.renderAs(node,"div",{class: "widgets-scale", title: node.attrs.title, contenteditable: false})
	let para = elt("p")
	dom.appendChild(para)
	para.appendChild(elt("span", null, node.attrs.startlabel+" "))
	let startVal = Number(node.attrs.startvalue)
	let endVal = Number(node.attrs.endvalue)
	if (startVal < endVal)
		for (let i = startVal; i <= endVal; i++) {
			let name = node.attrs.name+i
			para.appendChild(
				elt("span",{class: "widgets-scaleitem"},
					elt("label",{for: name},i.toString()),
					elt("input",{id: name, name:node.attrs.name, type:"radio", value:i})
				)
			)
		}
	else
		for (let i = startVal; i >=  endVal; i--) {
			para.appendChild(
				elt("span",{class: "widgets-scaleitem"},
					elt("label",{for: name},i.toString()),
					elt("input",{id: name, name:node.attrs.name, type:"radio", value:i})
				)
			)
		}
	para.appendChild(elt("span", null, " "+node.attrs.endlabel))
	return dom
}

Scale.register("command",{
	name: "insertScale",
	label: "Scale",
	run(pm, name, title, startvalue, startlabel, endvalue, endlabel) {
		let para = pm.schema.node("paragraph")
    	return pm.tr.replaceSelection(this.create({name,title,startvalue,startlabel,endvalue,endlabel},para)).apply(andScroll)
  	},
	params: [
	    getNameParam(),
	 	{ name: "Title", label: "Scale Title", type: "text"},
     	{ label: "Start value", type: "number", default: 1},
     	{ name: "Start Label", label: "Text on left", type: "text", default: "low"},
     	{ label: "End value", type: "number", default: 10},
     	{ name: "End Label", label: "Text on right", type: "text", default: "high"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node && node.type == this)
	      return [node.attrs.name, node.attrs.title, node.attrs.startvalue, node.attrs.startlabel, node.attrs.endvalue, node.attrs.endlabel]
	}
})

defParamsClick(Scale,"schema:scale:insertScale")

insertCSS(`

.widgets-scaleitem {
	display: inline-block;
	text-align: center;
}

.widgets-scaleitem input {
	display: block;
}

.widgets-scale:before {
	content: attr(title);
	color: black;
	font-size: 14px;
	font-weight: bold;
	display: block;
}

.widgets-scale span {
	vertical-align: middle;
	font-weight: normal;
}

.ProseMirror .widgets-scale:hover {
	cursor: pointer;
}

`)