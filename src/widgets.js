import {ProseMirror} from "../../prosemirror/dist/edit"
import {Schema, defaultSchema, SchemaSpec} from "../../prosemirror/dist/model"
import {commandGroups} from "../../prosemirror/dist/menu/menu"
import "../../prosemirror/dist/menu/menubar"
import "../../prosemirror/dist/inputrules/autoinput"

import {formSchema} from "./forms"
//import "./media"
 

let pm = window.pm = new ProseMirror({
  place: document.querySelector("#editor"),
  menuBar: true,
  doc: document.querySelector("#content").innerHTML,
  docFormat: "html",
  schema: formSchema,
  autoInput: true
})



