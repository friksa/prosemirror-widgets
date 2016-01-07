import {Block, Textblock, Paragraph, Text, Attribute, Pos} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {findSelectionNear} from "../../../../git/prosemirror/dist/edit/selection"
import {defParser, andScroll, namePattern} from "../utils"

export class Choice extends Paragraph {
	static get kind() { return "." }
	get attrs() {
		return {
			name: new Attribute(),
			value: new Attribute()
		}
	}

	create(attrs, content, marks) {
		if (attrs.value > 0) content = [this.schema.node("radiobutton",attrs," ")]
		return super.create(attrs, content, marks)
	}
}

export class MultipleChoice extends Block {
	static get contains() { return "choice"}
	get attrs() {
		return {
			name: new Attribute
		}
	}
}

defParser(Choice,"p","widgets-choice")
defParser(MultipleChoice,"div","widgets-multiplechoice")

Choice.prototype.serializeDOM = (node,s) => s.renderAs(node,"p", {name: node.attrs.name, value: node.attrs.value, class: "widgets-choice"})

MultipleChoice.prototype.serializeDOM = (node,s) => s.renderAs(node,"div",{name: node.attrs.name, class: "widgets-multiplechoice"})

Choice.register("command", {
  name: "splitChoice",
  label: "Split the current choice",
  run(pm) {
	console.log("splitChoice")
    let {node, from, to} = pm.selection
    if ((node && node.isBlock) || from.path.length < 2 || !Pos.samePath(from.path, to.path)) return false
     let toParent = from.shorten(), grandParent = pm.doc.path(toParent.path)
    if (grandParent.type.name != "multiplechoice") return false
    return pm.tr.delete(from, to).split(from, 1, pm.schema.nodes.choice, {name: grandParent.attrs.name, value: grandParent.size}).apply(andScroll)
  },
  key: "Enter(90)"
})

Choice.register("command", {
  name: "deleteChoice",
  label: "delete this choice or multiplechoice",
  run(pm) {
    let {head, empty} = pm.selection
    if (!empty || head.offset > 1) return false
    // Find the node before this one
    let before, cut
    for (let i = head.path.length - 1; !before && i >= 0; i--) if (head.path[i] > 0) {
      cut = head.shorten(i)
      before = pm.doc.path(cut.path).child(cut.offset - 1)
    }
	let mc = pm.doc.path(cut.path).child(cut.offset)
    // if top choice, delete whole question if only one choice
    if (mc.type.name == "choice") {
    	return pm.tr.delete(cut, cut.move(1)).apply()
    } else {
    	// don't delete question if more than one choice
    	if (mc.size == 1) {
     		return pm.tr.delete(cut,cut.move(1)).apply()
    	} else
    		return false;
    }
  },
  key: ["Backspace(50)", "Mod-Backspace(50)"]
})

MultipleChoice.register("command",{
	name: "insertMultipleChoice",
	label: "MultipleChoice",
	run(pm, name) {
    	let {from} = pm.selection
		let choice = pm.schema.node("choice",{name: name, value: 0})
		let mc = this.create({name: name}, choice)		
		let tr = pm.tr.replaceSelection(mc).apply(andScroll)
		//pm.setTextSelection(pos)
		return tr
	},
	select(pm) {
		return pm.doc.path(pm.selection.from.path).type.canContainType(this)
	},
	params: [
	 	{ name: "Name", label: "Short ID name", type: "text", options: {pattern: namePattern, size: 8}},
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name]
	 }
})

insertCSS(`

.widgets-choice {
}


.widgets-multiplechoice {}

`)