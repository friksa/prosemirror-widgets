import {readParams} from "../../../../git/prosemirror/dist/menu/menu"
import {Textblock} from "../../../../git/prosemirror/dist/model"
import {elt} from "../../../../git/prosemirror/dist/dom"
import {defineParamHandler} from "../../../../git/prosemirror/dist/edit"
import {widgetParamHandler} from "../utils"

const widgets = ["Image", "TextField", "TextArea", "CheckBox", "Select", "CarryForward",
                 "IFrame", "InlineMath", "BlockMath", "SpreadSheet",
                 "MultipleChoice", "Scale", "CheckList"]

 const insertWidget = widgets.map(w => ({
 	value: "insert"+w,
 	display: () => { return elt("span",null, w)}
 }))
 
export class Widget extends Textblock {}
 
Widget.register("command", {
	name: "widgetInsert",
	label: "Insert...",
	select(pm) {return true},
	params: [
	     {name: "Widget type", type: "select", options: insertWidget, defaultLabel: "Insert..."}
	],
	run(pm, type) {
		if (!type.startsWith("insert")) return false
		let tname = "schema:"+type.split("insert")[1].toLowerCase()+":"+type
		let cmd = pm.commands[tname]
		if (cmd) widgetParamHandler(pm,cmd)
	},
	display: { type: "param"},
	menuGroup: "block(90)"
})
