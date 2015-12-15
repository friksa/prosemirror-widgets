import {Paragraph, Block, Textblock, Inline, Text, Attribute, MarkType} from "../../../prosemirror/dist/model/defaultschema"
import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select, formSchema} from "./schema"
import {elt, insertCSS} from "../../../prosemirror/dist/dom"

MultipleChoice.prototype.serializeDOM = node => {
	let dom = elt("div",{class: "multiplechoice"})
	node.forEach((child,start,end) => {
		if (start == 0)
			dom.appendChild(elt("p",{},child.textContent))
		else
			dom.appendChild(
				elt("div", {class: "choice"},
					elt("input",{name: node.attrs.name, type: "radio", value: start}),
					elt("p",{placeholder:"Choice text"},child.textContent)
				)
			)
	})
	return dom
}

Scale.prototype.serializeDOM = node => {
	let dom = elt("div",{class: "scale"})
	dom.appendChild(elt("span", {}, node.attrs.minlabel+" "))
	for (let i = Number(node.attrs.minvalue); i <= Number(node.attrs.maxvalue); i++) {
		dom.appendChild(
			elt("span",{class: "scaleitem"},
				elt("input",{name:node.attrs.name, type:"radio", value:i}),
				i.toString()
			)
		)
	}
	dom.appendChild(elt("span", {}, " "+node.attrs.maxlabel))
	return dom
}

Checklist.prototype.serializeDOM = node => {
	let dom = elt("div",{class: "checklist"})
	node.forEach((child,start,end) => {
		dom.appendChild(
			elt("span",{class: "checkitem"},
				elt("input",{id:node.attrs.name+start+1, type:"checkbox", value: start+1}),
				child.textContent
			)
		)
		if (node.attrs.direction == "vertical") dom.appendChild(elt("br"))
	})
	return dom
}

Textfield.prototype.serializeDOM = node => {
	let loc = node.attrs.loc
	if (loc == "left")
		return elt("span",{class: "textfield"},
		elt("label",{for: node.attrs.name}, node.attrs.label + " "),
		elt("input", {id: node.attrs.name, name: node.attrs.name, type:"text", size: node.attrs.size}))
	else if (loc == "top") {
		return elt("span",{class: "textfield"},
		elt("label",{for: node.attrs.name}, node.attrs.label + " "), elt("br"),
		elt("input", {id: node.attrs.name, name: node.attrs.name, type:"text", size: node.attrs.size}))
	} else {
		return elt("span",{class: "textfield"},
		elt("input", {id: node.attrs.name, name: node.attrs.name, type:"text", size: node.attrs.size}),
		elt("label",{for: node.attrs.name}, node.attrs.label + " "))
	}
}

Textarea.prototype.serializeDOM = node => {
	return elt("div",{class: "textarea"},
		elt("label",{for: node.attrs.name},node.attrs.label),
		elt("textarea", {id: node.attrs.name, name: node.attrs.name, rows: node.attrs.rows, cols: node.attrs.cols})
	)
}

Checkbox.prototype.serializeDOM = node => {
	return elt("span",{class: "checkbox"}, 
		elt("input",{id: node.attrs.name, type: "checkbox", value: node.attrs.name}),
		elt("label",{for: node.attrs.name}," "+node.attrs.label)
	)
}

Select.prototype.serializeDOM = node => {
	let selection = node.attrs.multiple == "multiple"
	let dom = elt("select",{id: node.attrs.name, class: "select", size: 1, multiple: selection})
	node.attrs.options.split(",").map(function(option) {
		dom.appendChild(elt("option", {value: option.trim()}, option))
	})
	return elt("div",{class: "select"},
		elt("label",{for: node.attrs.name}, node.attrs.label+" "),
		dom
	)
}


