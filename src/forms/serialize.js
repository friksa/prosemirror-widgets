import {Paragraph, Block, Textblock, Inline, Text, Attribute, MarkType} from "../../../prosemirror/dist/model/defaultschema"
import {Input, Textfield, Checkbox, Radiobutton, Textarea, Choice, Select, MultipleChoice, Scale, Checkitem, Checklist, formSpec} from "./schema"
import {elt} from "../../../prosemirror/dist/dom"

Input.prototype.serializeDOM = (node,s) => s.renderAs(node,"input",node.attrs)

Textarea.prototype.serializeDOM = (node,s) => s.renderAs(node,"textarea",node.attrs)

Choice.prototype.serializeDOM = (node,s) => s.renderAs(node,"p", {name: node.attrs.name, value: node.attrs.value, class: "choice"})

MultipleChoice.prototype.serializeDOM = (node,s) => s.renderAs(node,"div",{class: "multiplechoice"})

Scale.prototype.serializeDOM = node => {
	let dom = elt("div",{class: "scale"})
	dom.appendChild(elt("span", null, node.attrs.startlabel+" "))
	let startVal = Number(node.attrs.startvalue)
	let endVal = Number(node.attrs.endvalue)
	if (startVal < endVal)
		for (let i = startVal; i <= endVal; i++) {
			dom.appendChild(
				elt("span",{class: "scaleitem"},
					elt("input",{name:node.attrs.name, type:"radio", value:i}),
					i.toString()
				)
			)
		}
	else
		for (let i = startVal; i >=  endVal; i--) {
			dom.appendChild(
				elt("span",{class: "scaleitem"},
					elt("input",{name:node.attrs.name, type:"radio", value:i}),
					i.toString()
				)
			)
		}
	dom.appendChild(elt("span", null, " "+node.attrs.endlabel))
	return dom
}

Checkitem.prototype.serializeDOM = node => {
	let name = node.attrs.name
	let start = node.attrs.start
	let vert = node.attrs.direction == "vertical"
	let idx = start+1
	let cls = "checkitem-"+parent.attrs.direction
	return elt("p",{class: cls},
		elt("input",{name:name+"-"+start, type:"checkbox", value: start}),
		node.textContent)
}

Checklist.prototype.serializeDOM = (node,s) => {
	node.forEach((child,start,end) => {
		child.attrs["name"] = node.attrs.name
		child.attrs["start"] = start
		child.attrs["direction"] = node.attrs.direction
	})
	return s.renderAs(node,"div",{class: "multiplechoice"})
}

Select.prototype.serializeDOM = node => {
	let selection = node.attrs.multiple == "multiple"
	let select = elt("select",{id: node.attrs.name, class: "select", size: 1, multiple: selection})
	node.attrs.options.split(",").map(function(option) {
		select.appendChild(elt("option", {value: option.trim()}, option))
	})
	return select
}


