import {InlineMath, BlockMath, IFrame} from "./schema"

const defW = "200"
const defH = "200"

InlineMath.attachCommand("insertInlineMath", function(type) {
	return {
		label: "InlineMath",
		run(pm, tex) {
	    	return pm.tr.replaceSelection(type.create({tex})).apply()
	  	},
		params: [
	     	{ name: "Latex Expression", type: "text", default: "" }
		],
	    menuGroup: "inline",
	    menuRank: 41,
	    icon: { css: "background: url('icons/equation.gif') no-repeat; height: 10px"},
	    prefillParams(pm) {
	      let {node} = pm.selection
	      if (node && node.type == type)
	        return [node.attrs.tex]
	    }
	}
})  

BlockMath.attachCommand("insertBlockMath", function(type) {
	return {
		label: "BlockMath",
		run(pm, tex) {
	    	return pm.tr.replaceSelection(type.create({tex})).apply()
	  	},
		params: [
	     	{ name: "Latex Expression", type: "text", default: "" }
		],
	    menuGroup: "block",
	    menuRank: 90,
	    icon: { css: "background: url('icons/equation.gif') no-repeat; height: 10px"},
	    prefillParams(pm) {
	      let {node} = pm.selection
	      if (node && node.type == type)
	        return [node.attrs.tex]
	    }
	}
})  

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
	    menuRank: 91,
	    icon: { css: "background: url('icons/world.png') no-repeat; height: 12px"},
	  	prefillParams(pm) {
	      let {node} = pm.selection
	      if (node && node.type == type)
	        return [node.attrs.src, node.attrs.width, node.attrs.height]
	    }
	}
})   

