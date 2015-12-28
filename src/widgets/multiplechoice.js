import {Block, Paragraph, Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {defParser} from "../utils"

export class Choice extends Paragraph {
	static get kind() { return "." }

	create(attrs, content, marks) {
		if (attrs.value > 0) content = [this.schema.node("radiobutton",attrs)]
		return super.create(attrs, content, marks)
	}
}

Choice.attributes = {
	name: new Attribute(),
	value: new Attribute()
}

export class MultipleChoice extends Block {
	static get contains() { return "choice"}
}

defParser(Choice,"p","widgets-choice")
defParser(MultipleChoice,"div","widgets-multiplechoice")

Choice.prototype.serializeDOM = (node,s) => s.renderAs(node,"p", {name: node.attrs.name, value: node.attrs.value, class: "widgets-choice"})

MultipleChoice.prototype.serializeDOM = (node,s) => s.renderAs(node,"div",{class: "widgets-multiplechoice"})

Choice.register("command", {
  name: "splitChoice",
  label: "Split the current choice",
  run(pm) {
    let {node, from, to} = pm.selection
    if ((node && node.isBlock) ||
        from.path.length < 2 || !Pos.samePath(from.path, to.path)) return false
    let toParent = from.shorten(), grandParent = pm.doc.path(toParent.path)
    return pm.tr.delete(from, to).split(from, 1, pm.schema.nodes.choice, {name: grandParent.attrs.name, value: grandParent.size}).apply(andScroll)
  },
  key: "Enter(50)"
})

Choice.register("command", {
  name: "deleteChoice",
  label: "delete this choice",
  run(pm) {
    let {head, empty} = pm.selection
    if (!empty || head.offset > 1) return false
    // Find the node before this one
    let before, cut
    for (let i = head.path.length - 1; !before && i >= 0; i--) if (head.path[i] > 0) {
      cut = head.shorten(i)
      before = pm.doc.path(cut.path).child(cut.offset - 1)
    }
    //let selAfter = findSelectionFrom(pm.doc, cut, 1)
    //return pm.tr.lift(selAfter.from, selAfter.to).apply()
    return pm.tr.delete(cut, cut).apply(andScroll)
  },
  key: ["Backspace(50)", "Mod-Backspace(50)"]
})

MultipleChoice.register("command",{
	name: "insertMultipleChoice",
	label: "MultipleChoice",
	run(pm, name) {
		let choice = pm.schema.node("choice",{name: name, value: 0})
		let result = pm.tr.replaceSelection(this.create({name: name}, choice)).apply(andScroll)
		return result
  	},
	params: [
		{ label: "Name", type: "text"}
	],
    prefillParams(pm) {
	    let {node} = pm.selection
	    if (node)
	      return [node.attrs.name]
	 }
})

insertCSS(`

.widgets-choice {}
.widgets-multiplechoice {}

`)