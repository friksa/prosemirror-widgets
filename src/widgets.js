import {ProseMirror} from "../../prosemirror/dist/edit"
import {Schema, defaultSchema} from "../../prosemirror/dist/model"
import {commandGroups} from "../../prosemirror/dist/menu/menu"
import "../../prosemirror/dist/menu/menubar"
import "../../prosemirror/dist/inputrules/autoinput"

import {formSpec} from "./forms"
import {mediaSpec} from "./media"

const widgetSchema = new Schema(defaultSchema.spec.updateNodes(formSpec.nodes).updateNodes(mediaSpec.nodes))

let pm = window.pm = new ProseMirror({
  place: document.querySelector("#editor"),
  menuBar: true,
  doc: document.querySelector("#content").innerHTML,
  docFormat: "html",
  schema: widgetSchema,
  autoInput: true
})



