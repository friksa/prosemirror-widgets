import {insertCSS} from "../../../prosemirror/dist/dom"

insertCSS(`

p.choice:first-child:::before {
  content: "Enter stem text";
  opacity: 0.4;
  display: inline-block; /* For Firefox */
}

p.choice:nth-child(n+2)::before {
  content: "Enter choice text";
  opacity: 0.4;
  display: inline-block; /* For Firefox */
}

.multiplechoice {
}

.scale{
}

.checkitem{	
}

.checklist {
}

input.textfield {}

.textarea{}
.checkbox{}
.select{}

`)