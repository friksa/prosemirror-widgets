import {Block, Attribute} from "C:/Users/pboysen/git/prosemirror/dist/model"
import {insertCSS} from "C:/Users/pboysen/git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, selectedNodeAttr} from "../../utils"

export class Website extends Block {
	get attrs() {
		return {
			src: new Attribute,
			width: new Attribute({default: 200}),
			height: new Attribute({default: 200})
		}
	}
	get contains() { return null }
}

defParser(Website, "website", "widgets-website")

Website.prototype.serializeDOM = (node, s) => s.renderAs(node, "iframe",{ 
	src: node.attrs.src,
	width: node.attrs.width,
	height: node.attrs.height,
	content: "text/html;charset=UTF-8",
	class: "widgets-website widgets-edit",
	frameborder: "1",
	allowfullscreen: "1"
})

Website.register("command", "insert", {
	label: "Website",
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

defParamsClick(Website,"website:insert")

insertCSS(`

.ProseMirror .widgets-website:hover {
	padding-left: 16px;
    padding-top: 16px;
}

`)