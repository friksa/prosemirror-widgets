import {Block, Paragraph, Attribute} from "../../../prosemirror/dist/model"
import {elt, insertCSS} from "../../../prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class CheckItem extends Paragraph {
	static get kind() { return "." }
}

export class CheckList extends Block {
	static get contains() { return "checkitem" }
}

CheckList.attributes = {
	name: new Attribute(),
	layout: new Attribute({default: "vertical"})
}

defParser(CheckItem,"div","widgets-checkitem")
defParser(CheckList,"div","widgets-checklist")

CheckItem.prototype.serializeDOM = node => {
	let name = node.attrs.name
	let start = node.attrs.start
	let vert = node.attrs.direction == "vertical"
	let idx = start+1
	let cls = "checkitem-"+parent.attrs.direction
	return elt("p",{class: cls},
		elt("input",{name:name+"-"+start, type:"checkbox", value: start}),
		node.textContent)
}

CheckList.prototype.serializeDOM = (node,s) => {
	node.forEach((child,start,end) => {
		child.attrs["name"] = node.attrs.name
		child.attrs["start"] = start
		child.attrs["direction"] = node.attrs.direction
	})
	return s.renderAs(node,"div",{class: "widgets-checklist"})
}

CheckItem.register("command", {
	  name: "splitCheckitem",
	  label: "Split the current checkitem",
	  run(pm) {
	    let {node, from, to} = pm.selection
	    if ((node && node.isBlock) ||
	        from.path.length < 2 || !Pos.samePath(from.path, to.path)) return false
	    let toParent = from.shorten(), grandParent = pm.doc.path(toParent.path)
	    return pm.tr.delete(from, to).split(from, 1, pm.schema.nodes.choice, {name: grandParent.attrs.name, value: grandParent.size}).apply(andScroll)
	  },
	  key: "Enter(50)"
	})


CheckList.register("command", {
	name: "insertCheckList",
	label: "CheckList",
	run(pm, name, direction) {
		let checkitemType = pm.schema.nodes["checkitem"]
		let chkitem = checkitemType.create({name})                                    
		return pm.tr.replaceSelection(this.create({name, direction},chkitem)).apply(andScroll)
  	},
	params: [
     	{ label: "Name", type: "text"},
     	{ label: "Layout (vertical, horizontal)", type: "select", options: [
     	    {value: "horizontal", label: "horizontal"},
     	    {value: "vertical", label: "vertical"}
     	  ]}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name, node.attrs.direction]
	 }
})

insertCSS(`

.widgets-checkitem {}
.widgets-checklist {}

`)