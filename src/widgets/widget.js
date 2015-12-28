import {Textblock} from from "../../prosemirror/dist/model"

const widgets = ["TextField", "TextArea", "CheckBox", "Select", "IFrame", "InlineMath", "BlockMath", "MultipleChoice", "Scale", "CheckList"]

const insertWidget = widgets.map(w => ({
	value: "insert"+w,
	display: () => { return elt("span",null, w)}
}))
 
class Widget extends Textblock {}
 
Widget.register("command", {
	name: "insertWidget",
	label: "Insert...",
	select(pm) {return true},
	params: [
	     {name: "Widget type", type: "select", options: insertWidget, defaultLabel: "Insert..."}
	],
	run(pm, type) {
		let menu = pm.mod.menuBar.menu
		let cmd = pm.commands[type]
		if (menu && cmd) menu.enter(readParams(cmd))
	},
	display: "select",
	menuGroup: "block",
	menuRank: 99
})

