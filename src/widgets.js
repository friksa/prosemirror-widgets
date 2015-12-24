import {ProseMirror} from "../../prosemirror/dist/edit"
import {Schema, defaultSchema, Textblock} from "../../prosemirror/dist/model"
import {readParams} from "../../prosemirror/dist/menu/menu"
import "../../prosemirror/dist/menu/tooltipmenu"
import "../../prosemirror/dist/menu/menubar"
import "../../prosemirror/dist/inputrules/autoinput"

import {Textfield, Textarea, Checkbox, Select, MultipleChoice, Scale, Checklist, formSpec} from "./forms"
import {IFrame, InlineMath, BlockMath, mediaSpec} from "./media"
import {elt, insertCSS} from "../../prosemirror/dist/dom"

const widgets = ["Textfield", "Textarea", "Checkbox", "Select", "IFrame", "InlineMath", "BlockMath", "MultipleChoice", "Scale", "Checklist"]
                 
class Widget extends Textblock {}
 
const insertWidget = widgets.map(w => ({
	value: "insert"+w,
	display: () => { return elt("span",null, w)}
}))

Widget.register("command", {
	name: "insertWidget",
	label: "Insert...",
	select(pm) { return true},
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

const widgetSchema = new Schema(defaultSchema.spec.update(formSpec.nodes).update(mediaSpec.nodes).update({Widget}))

let pm = window.pm = new ProseMirror({
  place: document.querySelector("#editor"),
  menuBar: true,
  doc: document.querySelector("#content").innerHTML,
  docFormat: "html",
  schema: widgetSchema,
  autoInput: true
})

insertCSS(`
		
div.ProseMirror-select-menu {
  position: absolute;
  background: #EEE;
  color: black;
  padding: 2px 2px;
  z-index: 15;
}

div.ProseMirror-select-menu div {
  cursor: pointer;
  padding: 0 1em 0 2px;
}

div.ProseMirror-select-menu div:hover {
  background: white;
}

div.ProseMirror-menu form {
	background: #EEE;
	width: 300px;
	border: 1px solid #AAA
}

div.ProseMirror-menu form select {
	background: white;
}

div.ProseMirror-menubar-sliding {
  -webkit-transition: right 0.2s ease-out;
  -moz-transition: right 0.2s ease-out;
  transition: right 0.2s ease-out;
  position: relative;
  left: 100%;
  width: 100%;
  box-sizing: -moz-border-box;
  box-sizing: border-box;
  padding-left: 16px;
  background: white;
}


`)

