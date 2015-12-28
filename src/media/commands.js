import {InlineMath, BlockMath, IFrame, Spreadsheet} from "./schema"
import {readParams} from "../../../prosemirror/dist/menu/menu"
import {Pos} from "../../../prosemirror/dist/model"
import {selectableNodeAbove} from "../../../prosemirror/dist/edit/selection"

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
      if (node)
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
      if (node)
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
      if (node)
        return [node.attrs.src, node.attrs.width, node.attrs.height]
    }
})

Spreadsheet.register("command", {
	name: "insertSpreadsheet",
	label: "Spreadsheet",
	run(pm, data, width, height) {
	console.log("create")
    	return pm.tr.replaceSelection(this.create({data, width, height})).apply()
  	},
	params: [
     	{ label: "Link to data", type: "text"},
     	{ label: "Width in pixels", type: "text", default: defW },
     	{ label: "Height in pixels", type: "text", default: defH },
	],
  	prefillParams(pm) {
      let {node} = pm.selection
      if (node)
        return [node.attrs.data, node.attrs.width, node.attrs.height]
    }
})

function selectClickedNode(pm, e) {
  let pos = selectableNodeAbove(pm, e.target, {left: e.clientX, top: e.clientY}, true)
  if (!pos) return pm.sel.pollForUpdate()

  let {node, from} = pm.selection
  if (node && pos.depth >= from.depth && pos.shorten(from.depth).cmp(from) == 0) {
    if (from.depth == 0) return pm.sel.pollForUpdate()
    pos = from.shorten()
  }

  pm.setNodeSelection(pos)
  pm.focus()
  e.preventDefault()
}

function defParamsClick(type) {
	type.prototype.handleClick = (pm, e, path, node) => {
		let menu = pm.mod.menuBar.menu
		let cmd = pm.commands["insert"+type.name]
		if (menu && cmd) {
			selectClickedNode(pm,e)
			menu.enter(readParams(cmd))
			return true;
		} else
			return false;
	}
}

defParamsClick(InlineMath)
defParamsClick(BlockMath)
defParamsClick(IFrame)
defParamsClick(Spreadsheet)