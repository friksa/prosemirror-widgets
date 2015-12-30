import {Inline, Attribute} from "../../../prosemirror/dist/model"
import {elt,insertCSS} from "../../../prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class Image extends Inline {}
Image.attributes = {
  src: new Attribute,
  alt: new Attribute({default: ""}),
  title: new Attribute({default: ""}),
  class: new Attribute({default: "widgets-img"})
}

defParser(Image, "img", "widgets-img")

Image.prototype.serializeDOM = (node, s) => s.renderAs(node, "img", node.attrs)

Image.register("command", {
  name: "insertImage",
  label: "Insert image",
  run(pm, src, alt, title) {
    return pm.tr.replaceSelection(this.create({src, title, alt})).apply(andScroll)
  },
  params: [
    {label: "Image URL", type: "text"},
    {label: "Description / alternative text", type: "text", default: ""},
    {label: "Title", type: "text", default: ""}
  ],
  select(pm) {
    return pm.doc.path(pm.selection.from.path).type.canContainType(this)
  },
  prefillParams(pm) {
    let {node} = pm.selection
    if (node && node.type == this)
      return [node.attrs.src, node.attrs.alt, node.attrs.title]
  }
})

defParamsClick(Image)

insertCSS(`

.widgets-image {}

`)