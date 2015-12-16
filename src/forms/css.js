import {insertCSS} from "../../../prosemirror/dist/dom"

insertCSS(`
.ProseMirror-content[contenteditable = true] p:empty:before{
  content: attr(placeholder);
  opacity: 0.3;
  display: block; /* For Firefox */
}

.multiplechoice{}
.scale{}
.checkitem{}
.checklist{}
.textfield{}
.textarea{}
.checkbox{}
.select{}

`)