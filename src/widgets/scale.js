import {Block, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class Scale extends Block {}

Scale.attributes = {
	name: new Attribute(),
	startvalue: new Attribute({default: "1"}),
	startlabel: new Attribute({default: "low"}),
	endvalue: new Attribute({default: "10"}),
	endlabel: new Attribute({default: "high"}),
}

defParser(Scale,"div","scale")

Scale.prototype.serializeDOM = node => {
	let dom = elt("div",{class: "widgets-scale"})
	dom.appendChild(elt("span", null, node.attrs.startlabel+" "))
	let startVal = Number(node.attrs.startvalue)
	let endVal = Number(node.attrs.endvalue)
	if (startVal < endVal)
		for (let i = startVal; i <= endVal; i++) {
			dom.appendChild(
				elt("span",{class: "widgets-scaleitem"},
					elt("input",{name:node.attrs.name, type:"radio", value:i}),
					i.toString()
				)
			)
		}
	else
		for (let i = startVal; i >=  endVal; i--) {
			dom.appendChild(
				elt("span",{class: "widgets-scaleitem"},
					elt("input",{name:node.attrs.name, type:"radio", value:i}),
					i.toString()
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
     	{ label: "Name", type: "text"},
     	{ label: "Start value", type: "text", default: 1},
     	{ label: "Start label", type: "text", default: "min"},
     	{ label: "End value", type: "text", default: 10},
     	{ label: "End label", type: "text", default: "max"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.startvalue, node.attrs.startlabel, node.attrs.endvalue, node.attrs.endlabel]
	 }
})

defParamsClick(Scale)

insertCSS(`

.widgets-scaleitem {}		
.widgets-scale {}

`)