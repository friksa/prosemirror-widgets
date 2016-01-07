import {Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt,insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class Image extends Inline {
	get attrs() {
		return {
			src: new Attribute,
			alt: new Attribute,
			title: new Attribute,
			class: new Attribute({default: "widgets-img"})
		}
	}
}
 
defParser(Image, "img", "widgets-img")

Image.prototype.serializeDOM = (node, s) => s.renderAs(node, "img", node.attrs)

Image.register("command", {
  name: "insertImage",
  label: "Image",
  run(pm, src, alt, title) {
    return pm.tr.replaceSelection(this.create({src, title, alt})).apply(andScroll)
  },
  params: [
    {name: "File", label: "Image File", type: "file", default: "img.png"},
    {name: "Description", label: "Description / alternative text", type: "text"},
    {name: "Title", label: "Title", type: "text"}
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

defParamsClick(Image,"schema:image:insertImage")

insertCSS(`

.widgets-image {}

`)