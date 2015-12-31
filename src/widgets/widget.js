import {readParams} from "../../../../git/prosemirror/dist/menu/menu"
import {Textblock} from "../../../../git/prosemirror/dist/model"
import {elt} from "../../../../git/prosemirror/dist/dom"

const widgets = ["Image", "TextField", "TextArea", "CheckBox", "Select", "CarryForward",
                 "IFrame", "InlineMath", "BlockMath", "SpreadSheet",
                 "MultipleChoice", "Scale", "CheckList"]

 const insertWidget = widgets.map(w => ({
 	value: "insert"+w,
 	display: () => { return elt("span",null, w)}
 }))

export class Widget extends Textblock {}
 
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

 
