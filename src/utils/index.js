export {widgetParamHandler, defineFileHandler, namePattern, nameTitle, selectedNodeAttr} from "./params"
import {readParams} from "../../../../git/prosemirror/dist/menu/menu"
import {Pos} from "../../../../git/prosemirror/dist/model"
import {selectableNodeAbove} from "../../../../git/prosemirror/dist/edit/selection"
import {widgetParamHandler} from "../utils"

export const andScroll = {scrollIntoView: true}
	
MathJax.Hub.Queue(function () {
    MathJax.Hub.Config({
    	tex2jax: {
        	displayMath: [ ["\\[","\\]"] ], 
        	inlineMath: [ ["\\(","\\)"] ],
        	processEscapes: true
    	},
    	displayAlign:"left"
	})
})

export function defParser(type,tag,cls) {
	type.register("parseDOM", {
		tag: tag,
		rank: 25,
		parse: (dom, context, type, attrs) => {
			let contains = dom.classList.contains(cls)
			if (!contains) return false
			context.insertFrom(dom, type, attrs)
		}
	})	
}

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

export function defParamsClick(type, cmdname) {
	type.prototype.handleClick = (pm, e, path, node) => {
		let cmd = pm.commands[cmdname]
		if (cmd) {
			selectClickedNode(pm,e)
			widgetParamHandler(pm,cmd)
			return true;
		} else
			return false;
	}
}
