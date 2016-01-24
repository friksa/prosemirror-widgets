export {BlockMath} from "./blockmath"
export {Website} from "./website"
export {InlineMath} from "./inlinemath"
export {Image} from "./image"
export {SpreadSheet} from "./spreadsheet"
export {CarryForward} from "./carryforward"

import {NodeType} from "C:/Users/pboysen/git/prosemirror/dist/model"
export class Content extends NodeType {}
Content.register("command", "insert", { run(pm) { return false }})
