export {Input} from "./input"
export {CheckBox} from "./checkbox"
export {RadioButton} from "./radiobutton"
export {ShortAnswer} from "./shortanswer"
export {Essay} from "./essay"
export {Select} from "./select"
export {ChoiceList, Choice} from "./choicelist"
export {CheckList, CheckItem} from "./checklist"
export {Scale} from "./scale"

import {NodeType} from "C:/Users/pboysen/git/prosemirror/dist/model"
export class Answers extends NodeType {}
Answers.register("command", "insert", { run(pm) { return false}})