import {InlineMath, BlockMath, IFrame} from "./schema"

const defW = "200"
const defH = "200"

InlineMath.register("command", {
	name: "insertInlineMath",
	label: "InlineMath",
	run(pm, tex) {
    	return pm.tr.replaceSelection(this.create({tex})).apply()
  	},
	params: [
     	{ label: "Latex Expression", type: "text" }
	],
    prefillParams(pm) {
      let {node} = pm.selection
      if (node && node.type == this)
        return [node.attrs.tex]
    }
}) 

BlockMath.register("command", {
	name: "insertBlockMath",
	label: "BlockMath",
	run(pm, tex) {
    	return pm.tr.replaceSelection(this.create({tex})).apply()
  	},
	params: [
     	{ label: "Latex Expression", type: "text"}
	],
    prefillParams(pm) {
      let {node} = pm.selection
      if (node && node.type == this)
        return [node.attrs.tex]
    }
})

IFrame.register("command", {
	name: "insertIFrame",
	label: "websites, youTube, GoogleMaps,...",
	run(pm, src, width, height) {
    	return pm.tr.replaceSelection(this.create({src, width, height})).apply()
  	},
	params: [
     	{ label: "Link (website, youTube, Google Maps ...)", type: "text"},
     	{ label: "Width in pixels", type: "text", default: defW },
     	{ label: "Height in pixels", type: "text", default: defH },
	],
  	prefillParams(pm) {
      let {node} = pm.selection
      if (node && node.type == this)
        return [node.attrs.src, node.attrs.width, node.attrs.height]
    }
})

