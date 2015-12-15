import {insertCSS} from "../../../prosemirror/dist/dom"

insertCSS(`
[contenteditable = true]:empty:before{
  content: attr(placeholder);
  opacity: 0.3;
  display: block; /* For Firefox */
}

inlinemath {}
blockmath {}
iframe {}

`)