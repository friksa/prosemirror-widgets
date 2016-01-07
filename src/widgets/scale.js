import {Block, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern} from "../utils"

export class Scale extends Block {
	get attrs() {
		return {
			name: new Attribute,
			startvalue: new Attribute({default: "1"}),
			startlabel: new Attribute({default: "low"}),
			endvalue: new Attribute({default: "10"}),
			endlabel: new Attribute({default: "high"}),
		}
	}
}

defParser(Scale,"div","scale")

Scale.prototype.serializeDOM = node => {
	let dom = elt("div",{class: "widgets-scale"})
	dom.appendChild(elt("span", null, node.attrs.startlabel+" "))
	let startVal = Number(node.attrs.startvalue)
	let endVal = Number(node.attrs.endvalue)
	if (startVal < endVal)
		for (let i = startVal; i <= endVal; i++) {
			let name = node.attrs.name+i
			dom.appendChild(
				elt("span",{class: "widgets-scaleitem"},
					elt("label",{for: name},i.toString()),
					elt("input",{id: name, name:node.attrs.name, type:"radio", value:i})
				)
			)
		}
	else
		for (let i = startVal; i >=  endVal; i--) {
			dom.appendChild(
				elt("span",{class: "widgets-scaleitem"},
					elt("label",{for: name},i.toString()),
					elt("input",{id: name, name:node.attrs.name, type:"radio", value:i})
				)
			)
		}
	dom.appendChild(elt("span", null, " "+node.attrs.endlabel))
	return dom
}

Scale.register("command",{
	name: "insertScale",
	label: "Scale",
	run(pm, name, startvalue, startlabel, endvalue, endlabel) {
    	return pm.tr.replaceSelection(this.create({name,startvalue,startlabel,endvalue,endlabel})).apply(andScroll)
  	},
	params: [
	 	{ name: "Name", label: "Short ID name", type: "text", options: {pattern: namePattern, size: 8}},
     	{ label: "Start value", type: "number", default: 1},
     	{ name: "Start Label", label: "Text on left", type: "text", default: "low"},
     	{ label: "End value", type: "number", default: 10},
     	{ name: "End Label", label: "Text on right", type: "text", default: "high"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.startvalue, node.attrs.startlabel, node.attrs.endvalue, node.attrs.endlabel]
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

.widgets-scale {
	display: block;
}

.widgets-scale span {
	vertical-align: middle;
}

`)