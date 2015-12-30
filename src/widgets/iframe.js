import {Block, Attribute} from "../../../prosemirror/dist/model"
import {insertCSS} from "../../../prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class IFrame extends Block {}

IFrame.attributes = {
	src: new Attribute({default:""}),
	width: new Attribute({default: 200}),
	height: new Attribute({default: 200})
}

defParser(IFrame, "iframe", "widgets-iframe")

IFrame.prototype.serializeDOM = (node, s) => s.renderAs(node, "iframe",{ 
	src: node.attrs.src,
	width: node.attrs.width,
	height: node.attrs.height,
	content: "text/html;charset=UTF-8",
	class: "iframe",
	frameborder: "1",
	allowfullscreen: "1"
})

IFrame.register("command", {
	name: "insertIFrame",
	label: "show websites, youTube, GoogleMaps,...",
	run(pm, src, width, height) {
    	return pm.tr.replaceSelection(this.create({src, width, height})).apply(andScroll)
  	},
	params: [
     	{ label: "Link (website, youTube, Google Maps ...)", type: "text"},
     	{ label: "Width in pixels", type: "text", default: 200 },
     	{ label: "Height in pixels", type: "text", default: 200 },
	],
  	prefillParams(pm) {
      let {node} = pm.selection
      if (node)
        return [node.attrs.src, node.attrs.width, node.attrs.height]
    }
})

defParamsClick(IFrame)

insertCSS(`

.widgets-iframe {}

`)