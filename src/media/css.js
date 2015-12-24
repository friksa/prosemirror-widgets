import {insertCSS} from "../../../prosemirror/dist/dom"

insertCSS(`
//.ProseMirror-content[contenteditable='true'] iframe { pointer-events: none; }
.inlinemath{}
.blockmath{}
.iframe{}

`)