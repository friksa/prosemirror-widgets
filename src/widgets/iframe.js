import {Block, Attribute} from "../../../../git/prosemirror/dist/model"
import {insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, selectedNodeAttr} from "../utils"

export class IFrame extends Block {
	get attrs() {
		return {
			src: new Attribute,
			width: new Attribute({default: 200}),
			height: new Attribute({default: 200})
		}
	}
	get contains() { return null }
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
	label: "IFrame",
	run(pm, src, width, height) {
    	return pm.tr.replaceSelection(this.create({src, width, height})).apply(andScroll)
  	},
	params: [
     	{ name: "URL", label: "Link to website, youTube, Google Maps ...", type: "url", 
       	  prefill: function(pm) { return selectedNodeAttr(pm, this, "src") }},
     	{ name: "Width", label: "Width in pixels", type: "number", default: 200, 
          prefill: function(pm) { return selectedNodeAttr(pm, this, "width") },
       	  options: {min: 50, height:800}},
     	{ name: "Height", label: "Height in pixels", type: "number", default: 200, 
          prefill: function(pm) { return selectedNodeAttr(pm, this, "height") },
       	  options: {min: 50, height:800}}
	]
})

defParamsClick(IFrame,"schema:iframe:insertIFrame")

insertCSS(`

.ProseMirror .widgets-iframe:hover {
	cursor: pointer;
}

`)