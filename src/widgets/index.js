export {Answers,Input, CheckBox, RadioButton, CheckList, CheckItem, ChoiceList, Choice, Scale, Select, Essay, ShortAnswer} from "./answertypes"
export {Content,BlockMath,CarryForward,Image,InlineMath,SpreadSheet,Website} from "./contenttypes"

import {insertCSS} from "C:/Users/pboysen/git/prosemirror/dist/dom"
import {Answers, Input, CheckBox, RadioButton, CheckList, CheckItem, ChoiceList, Choice, Scale, Select, Essay, ShortAnswer} from "./answertypes"
import {Content, BlockMath, CarryForward, Image, InlineMath, SpreadSheet, Website} from "./contenttypes"

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
CheckList.register("insertMenu", "main", {label: "Check List", command: "insert", rank: 87})
ChoiceList.register("insertMenu", "main", {label: "Choice List", command: "insert", rank: 88})
Scale.register("insertMenu", "main", {label: "Scale", command: "insert", rank: 89})
Select.register("insertMenu", "main", {label: "Select Dropdown", command: "insert", rank: 90})
CheckBox.register("insertMenu", "main", {label: "Check Box", command: "insert", rank: 91})

insertCSS(`

.ProseMirror .widgets-edit:hover {
	background-image: url('icons/edit45.png');
	background-repeat: no-repeat;
	background-position: top left;
	cursor: pointer;
 }

`)








