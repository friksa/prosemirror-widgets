export {BlockMath} from "./blockmath"
export {CheckBox} from "./checkbox"
export {CheckList, CheckItem} from "./checklist"
export {Website} from "./website"
export {InlineMath} from "./inlinemath"
export {Input} from "./input"
export {ChoiceList, Choice} from "./choicelist"
export {RadioButton} from "./radiobutton"
export {Scale} from "./scale"
export {Select} from "./select"
export {Essay} from "./essay"
export {ShortAnswer} from "./shortanswer"
export {Image} from "./image"
export {SpreadSheet} from "./spreadsheet"
export {CarryForward} from "./carryforward"
export {Content,Answers} from "../utils"

import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {Content, Answers} from "../utils"
import {BlockMath} from "./blockmath"
import {CheckBox} from "./checkbox"
import {CheckList, CheckItem} from "./checklist"
import {Website} from "./website"
import {InlineMath} from "./inlinemath"
import {Input} from "./input"
import {ChoiceList, Choice} from "./choicelist"
import {RadioButton} from "./radiobutton"
import {Scale} from "./scale"
import {Select} from "./select"
import {Essay} from "./essay"
import {ShortAnswer} from "./shortanswer"
import {Image} from "./image"
import {SpreadSheet} from "./spreadsheet"
import {CarryForward} from "./carryforward"

// hr starts at 70
Content.register("insertMenu", "main", {label: "Content Types", command: "insert", rank: 69})
Image.register("insertMenu", "main", {label: "Image", command: "insert", rank: 76})
Website.register("insertMenu", "main", {label: "Website", command: "insert", rank: 77})
InlineMath.register("insertMenu", "main", {label: "Inline Math", command: "insert", rank: 78})
BlockMath.register("insertMenu", "main", {label: "Block Math", command: "insert", rank: 79})
SpreadSheet.register("insertMenu", "main", {label: "Spreadsheet", command: "insert", rank: 80})
CarryForward.register("insertMenu", "main", {label: "Carry Forward", command: "insert", rank: 81})

Answers.register("insertMenu", "main", {label: "Answer Types", command: "insert", rank: 84})
ShortAnswer.register("insertMenu", "main", {label: "Short Answer", command: "insert", rank: 85})
Essay.register("insertMenu", "main", {label: "Essay", command: "insert", rank: 86})
Select.register("insertMenu", "main", {label: "Select Menu", command: "insert", rank: 88})
CheckBox.register("insertMenu", "main", {label: "Check Box", command: "insert", rank: 89})
CheckList.register("insertMenu", "main", {label: "Check List", command: "insert", rank: 91})
ChoiceList.register("insertMenu", "main", {label: "Choice List", command: "insert", rank: 92})
Scale.register("insertMenu", "main", {label: "Scale", command: "insert", rank: 93})

insertCSS(`

.ProseMirror .widgets-edit:hover {
	background-image: url('icons/edit45.png');
	background-repeat: no-repeat;
	background-position: top left;
	cursor: pointer;
 }

.ProseMirror-dropdown-menu div:nth-child(1), div:nth-child(9) {
	 background: #CCC;
 	 color: white;
 	 font-weight: bold;
 }
`)








