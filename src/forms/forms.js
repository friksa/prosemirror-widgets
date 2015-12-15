import {Paragraph, Block, Textblock, Inline, Attribute} from "../../../prosemirror/dist/model"
import {elt, insertCSS} from "../../../prosemirror/dist/dom"

function childIndexOf(node) {
	let parent = node.parentNode
    for (let i = 0; i < parent.childNodes.length; i++) {
	    let child = parent.childNodes[i]
	    if (child == node) return i+1
    }
	return 0
}

export class Choice extends Block {
	static get kind() { return "choice." }
}

Choice.register("parseDOM", {
	tag: "div",
	rank: 25,
	parse: (dom, context, type, attrs) => {
		let contains = dom.classList.contains('choice')
		if (!contains) return false
		context.insertFrom(dom, type, attrs)
	}
})

Choice.prototype.serializeDOM = node => {
	let parent = node.parentNode
	let name = parent.attrs.name
	let dom = 
		elt("div", {class: "choice"},
			elt("input",{name: node.name, type: "radio", value: childIndexOf(node)}),
			elt("p",{placeholder:"Choice text"},node.getTextContent())
		)
	return dom; 
}

export class MultipleChoice extends Block {
	static get contains() { return "choice" }
}

MultipleChoice.attributes = {
	name: new Attribute({default: ""})
}

MultipleChoice.attachCommand("insertMultipleChoice", function(type) {
	return {
		label: "Multiple-choice Question",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		params: [
			     	{ name: "Short name", type: "text", default: "" }
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "form",
	    menuRank: 99,
	}
})  

MultipleChoice.register("parseDOM", {
  tag: "div",
  rank: 25,
  parse: (dom, context, type, attrs) => {
	  console.log("parse")
	let contains = dom.classList.contains('multiplechoice')
	if (!contains) return false
    context.insertFrom(dom, type, attrs)
  }
})
   
MultipleChoice.prototype.serializeDOM = (node, s) => s.renderAs(node, "div", {class: "multiplechoice"})

export class Scale extends Block {}

Scale.attributes = {
	name: new Attribute({default: ""}),
	minvalue: new Attribute({default: "1"}),
	minlabel: new Attribute({default: "low"}),
	maxvalue: new Attribute({default: "10"}),
	maxlabel: new Attribute({default: "high"}),
}

Scale.attachCommand("insertScale", function(type) {
	return {
		label: "Scale",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		params: [
	     	{ name: "Short name", type: "text", default: ""},
	     	{ name: "Minimum value", type: "text", default: "1"},
	     	{ name: "Minimum label", type: "text", default: "min"},
	     	{ name: "Maximum value", type: "text", default: "10"},
	     	{ name: "Maximum label", type: "text", default: "max"}
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "form",
	    menuRank: 99,
	}
})  

Scale.register("parseDOM", {
    tag: "div",
    rank: 25,
    parse: (dom, context, type, attrs) => {
	  let contains = dom.classList.contains('scale')
	  if (!contains) return false
      context.insertFrom(dom, type, attrs)
    }
})
	   
Scale.prototype.serializeDOM = node => {
	let dom = elt("div",{class: "scale"})
	dom.appendChild(elt("span", minlabel))
	for (i = minvalue; i <= maxvalue; i++) {
		dom.appendChild(elt("span",{},
			elt("input",{name:name, type:"radio", value:i}, i))
		)
	}
	dom.appendChild(elt("span", maxlabel))
	return dom
}

export class Checkitem extends Block {}

Checkitem.register("parseDOM", {
    tag: "span",
    rank: 25,
    parse: (dom, context, type, attrs) => {
	  let contains = dom.classList.contains('checkitem')
	  if (!contains) return false
      context.insertFrom(dom, type, attrs)
  }
})
	   
Checkitem.prototype.serializeDOM = node => {
	let parent = node.parentNode
	let name = parent.attrs.name
	let dom = 
		elt("div", {class: "checkitem"},
			elt("input",{name: node.name, type: "radio", value: childIndexOf(node)}),
			elt("p",{placeholder:"Choice text"},node.getTextContent())
		)
	return dom; 
}

export class Checklist extends Block {
	static get contains() { return "checkitem" }
}

Checklist.attributes = {
		name: new Attribute({default: ""})
}

Checklist.attachCommand("insertChecklist", function(type) {
	return {
		label: "Checklist",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		params: [
	     	{ name: "Short name", type: "text", default: "" }
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "form",
	    menuRank: 99,
	}
})  

Checklist.register("parseDOM", {
    tag: "div",
    rank: 25,
    parse: (dom, context, type, attrs) => {
	  let contains = dom.classList.contains('checklist')
	  if (!contains) return false
      context.insertFrom(dom, type, attrs)
    }
})
	   
Checklist.prototype.serializeDOM = (node, s) => s.renderAs(node, "div",{class: "checklist"})

export class Textfield extends Inline {}

Textfield.attributes = {
	name: new Attribute({default: ""}),
	label: new Attribute({default: ""}),
	placeholder: new Attribute({default: ""}),
	size: new Attribute({default: ""})
}

Textfield.attachCommand("insertTextfield", function(type) {
	return {
		label: "Textfield",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "form",
	    menuRank: 99,
	}
})  

Textfield.register("parseDOM", {
    tag: "input",
    rank: 25,
    parse: (dom, context, type, attrs) => {
	  let contains = dom.classList.contains('textfield')
	  if (!contains) return false
      context.insertFrom(dom, type, attrs)
  }
})
	   
Textfield.prototype.serializeDOM = node => {
	let dom = 
		elt("span",{class: "Textfield"},
			elt("label"),{id: name},node.label)
			elt("input", {name: name, type:"text", placeholder: node.placeholder, size: node.size}
		)
	return dom; 
}

export class Textarea extends Block {}

Textarea.attributes = {
	name: new Attribute({default: ""}),
	label: new Attribute({default: ""}),
	placeholder: new Attribute({default: ""}),
	cols: new Attribute({default: "80"}),
	rows: new Attribute({default: "4"})
}

Textarea.attachCommand("insertTextarea", function(type) {
	return {
		label: "Textarea",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		params: [
	     	{ name: "Short name", type: "text", default: ""},
	     	{ name: "Label", type: "text", default: ""},
	     	{ name: "Placeholder", type: "text", default: ""},
	     	{ name: "Columns", type: "text", default: "80"},
	     	{ name: "Rows", type: "text", default: "4" }
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "form",
	    menuRank: 99,
	}
})  

Textarea.register("parseDOM", {
    tag: "textarea",
    rank: 25,
    parse: (dom, context, type, attrs) => {
	  let contains = dom.classList.contains('textarea')
	  if (!contains) return false
      context.insertFrom(dom, type, attrs)
  }
})
	   
Textarea.prototype.serializeDOM = node => {
	let dom = 
		elt("div",{class: "textarea"},
			elt("label",{id: name},node.label),
			elt("textarea", {name: name, placeholder: node.placeholder, cols: node.cols, rows: node.rows})
		)
	return dom; 
}

export class Checkbox extends Inline{}
Checkbox.attributes = {
	name: new Attribute({default: ""}),
	label: new Attribute({default: ""}),
}

Checkbox.attachCommand("insertCheckbox", function(type) {
	return {
		label: "Checkbox",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		params: [
	     	{ name: "Short name", type: "text", default: "" },
	     	{ name: "Label", type: "text", default: "" }
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "form",
	    menuRank: 99,
	}
})  

Checkbox.register("parseDOM", {
    tag: "input",
    rank: 25,
    parse: (dom, context, type, attrs) => {
	  let contains = dom.classList.contains('checkbox')
	  if (!contains) return false
      context.insertFrom(dom, type, attrs)
  }
})
	   
Checkbox.prototype.serializeDOM = node => {
	let dom = 
		elt("span",{class: "checkbox"},
			elt("input", {name: node.name, type: "checkbox"}),
			elt("label",{id: node.name},node.label)
		)
	return dom; 
}

export class Select extends Block {}
Select.attributes = {
	name: new Attribute({default: ""}),
	label: new Attribute({default: ""}),
	options: new Attribute({default: ""}),
    multiple: new Attribute({default: true})
}

Select.attachCommand("insertSelect", function(type) {
	return {
		label: "Select",
		run(pm, name) {
	    	return pm.tr.replaceSelection(type.create({name})).apply()
	  	},
		params: [
	     	{ name: "Short name", type: "text", default: ""},
	     	{ name: "Label", type: "text", default: ""},
	     	{ name: "Options (comma separated)", type: "text", default: ""},
	     	{ name: "Multiple selection", type: "text", default: false }
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "form",
	    menuRank: 99,
	}
})  


Select.register("parseDOM", {
    tag: "select",
    rank: 25,
    parse: (dom, context, type, attrs) => {
	  let contains = dom.classList.contains('select')
	  if (!contains) return false
      context.insertFrom(dom, type, attrs)
  }
})
	   
Select.prototype.serializeDOM = node => {
	let dom = elt("select",{name: node.attrs.name, class: "select", multiple: node.attrs.multiple})
	for (let option in node.options.split(",")) {
		dom.appendChild(elt("option", {value: option.trim()}))
	}
	return elt("div",{class: "select"},
		elt("label",{formName: node.attrs.name}, node.attrs.label),
		dom
	)
}

insertCSS(`
Prosemirror-content[contenteditable = true]:empty:before{
  content: attr(placeholder);
  opacity: 0.3;
  display: block; /* For Firefox */
}

multiplechoice {}
scale {}
checkitem {}
checklist {}
textfield {}
textarea {}
checkbox {}
select {}

`)