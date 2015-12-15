import {Block, Inline, Attribute} from "../../../prosemirror/dist/model"
import {elt} from "../../../prosemirror/dist/dom"

const defW = "200"
const defH = "200"


export class IFrame extends Block {}

IFrame.attributes = {
		src: new Attribute({default:""}),
		width: new Attribute({default: defW}),
		height: new Attribute({default: defH})
	}

IFrame.attachCommand("insertIFrame", function(type) {
	return {
		label: "websites, youTube, GoogleMaps,...",
		run(pm, src, width, height) {
	    	return pm.tr.replaceSelection(type.create({src, width, height})).apply()
	  	},
		params: [
	     	{ name: "Link (website, youTube, Google Maps ...)", type: "text", default: "" },
	     	{ name: "Width in pixels", type: "text", default: defW },
	     	{ name: "Height in pixels", type: "text", default: defH },
		],
	    menuGroup: "block",
	    menuRank: 97,
	    icon: { css: "background: url('icons/media.gif') no-repeat; height: 10px"},
	    prefillParams(pm) {
	      let {node} = pm.selection
	      if (node && node.type == type)
	        return [node.attrs.src, node.attrs.width, node.attrs.height]
	    }
	}
})   

IFrame.register("parseDOM", {
  tag: "iframe", 
  rank: 25,
  parse: (dom, context, nodeType) => {
	let src = dom.querySelector("iframe").src;
	if (!src) return false;
    context.insert(nodeType.create(IFrame.attributes))
  }
})

IFrame.prototype.serializeDOM = node => { 
	let dom = elt("iframe", {
		  src: node.attrs.src,
		  width: node.attrs.width,
		  height: node.attrs.height,
		  content: "text/html;charset=UTF-8",
		  frameborder: "1",
		  allowfullscreen: "1"
		})
	return dom;
}
	 
