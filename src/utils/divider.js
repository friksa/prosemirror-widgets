import {NodeType} from "../../../../git/prosemirror/dist/model"

export class Content extends NodeType {}

Content.register("command", "insert", { run(pm) { return false }})

export class Answers extends NodeType {}

Answers.register("command", "insert", { run(pm) { return false}})
