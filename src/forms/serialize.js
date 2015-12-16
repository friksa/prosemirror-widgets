import {Paragraph, Block, Textblock, Inline, Text, Attribute, MarkType} from "../../../prosemirror/dist/model/defaultschema"
import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select} from "./schema"
import {elt} from "../../../prosemirror/dist/dom"

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
/*	dom.addEventListener("dblclick", e => {
		e.preventDefault()
		console.log("dblclick")
		//item.exec(pm, [o.value])
		//finish()
    })
*/
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
	let input = elt("input", {name: node.attrs.name, type:"text", size: node.attrs.size})
	if (loc == "left")
		return elt("label",{class: "textfield"}, 
			node.attrs.label + " ",
			input
		)
	else if (loc == "top") {
		return elt("label",{class: "textfield"}, 
			node.attrs.label,
			elt("br"),
			input
		)
	} else {
		return 	elt("label",{class: "textfield"},
			input,
			" "+node.attrs.label
		)
	}
}

Textarea.prototype.serializeDOM = node => {
	return elt("label",{class: "textarea"},node.attrs.label+" ",
		elt("textarea", {name: node.attrs.name, rows: node.attrs.rows, cols: node.attrs.cols})
	)
}

Checkbox.prototype.serializeDOM = node => {
	return elt("label",{class: "checkbox"}, 
		elt("input",{type: "checkbox", name: node.attrs.name}),
		" "+node.attrs.label
	)
}

Select.prototype.serializeDOM = node => {
	let selection = node.attrs.multiple == "multiple"
	let label = node.attrs.label? node.attrs.label+" ":""
	let select = elt("select",{id: node.attrs.name, class: "select", size: 1, multiple: selection})
	node.attrs.options.split(",").map(function(option) {
		select.appendChild(elt("option", {value: option.trim()}, option))
	})
	return elt("label",{class: "select"}, label, select)
}


