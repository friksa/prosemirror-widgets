import {Textblock} from "../../../../git/prosemirror/dist/model"
import {elt,insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defineCommand,defineParamHandler} from "../../../../git/prosemirror/dist/edit"
import {widgetParamHandler} from "../utils"

const inlineWidgets = ["Image", "TextField", "CheckBox", "Select", "CarryForward","InlineMath"] 
const insertInlineWidget = inlineWidgets.map(w => ({ value: "insert"+w, display: () => { return elt("span",null, w)} }))
const blockWidgets = ["TextArea", "BlockMath", "IFrame", "SpreadSheet", "ChoiceList", "Scale", "CheckList"]
const insertBlockWidget = blockWidgets.map(w => ({ value: "insert"+w, display: () => { return elt("span",null, w)} }))

 
export class Widget extends Textblock {}
 
/*Widget.register("command","insert",{
	label: "Insert Inline Widget",
    select(pm) {
		return pm.doc.path(pm.selection.from.path).type.contains == "inline"
    },
	params: [
	     {name: "Widget type", type: "select", options: insertInlineWidget, defaultLabel: elt("img",{src: "icons/insert.png", width: "16px", height: "16px", alt:" Insert inline widget", title: "Insert inline widget"})}
	],
	run(pm, type) {
		if (!type.startsWith("insert")) return false
		let tname = "schema:"+type.split("insert")[1].toLowerCase()+":"+type
		let cmd = pm.commands[tname]
		if (cmd) widgetParamHandler(pm,cmd)
	},
	display: { type: "param"},
	menuGroup: "inline(99)"
})

Widget.register("command","insert",{
	label: "Insert Block Widget",
	select(pm) {return pm.doc.path(pm.selection.from.path).type.contains == "inline"},
	params: [
	     {name: "Widget type", type: "select", options: insertBlockWidget, defaultLabel: elt("img",{src: "icons/insert.png", width: "16px", height: "16px", alt:" Insert block widget", title: "Insert block widget"})}
	],
	run(pm, type) {
		if (!type.startsWith("insert")) return false
		let tname = "schema:"+type.split("insert")[1].toLowerCase()+":"+type
		let cmd = pm.commands[tname]
		if (cmd) widgetParamHandler(pm,cmd)
	},
	display: { type: "param"},
	menuGroup: "block(99)"
})
*/


