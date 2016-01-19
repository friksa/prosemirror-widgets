export {widgetParamHandler, defineFileHandler, namePattern, nameTitle, selectedNodeAttr} from "./params"
import {selectableNodeAbove} from "../../../../git/prosemirror/dist/edit/selection"
import {widgetParamHandler} from "./params"

export const andScroll = {scrollIntoView: true}

let lastClicked = null;

export function getLastClicked() { return lastClicked }

if (window.MathJax)
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
	  e.preventDefault()
	  lastClicked = e.target
	}

export function defParamsClick(type, cmdname, spots = ["topleft"]) {
	type.prototype.handleClick = (pm, e, path, node) => {
		let spotClicked = false
		spots.forEach(function check(loc) {
			let r = e.target.getBoundingClientRect()
			if (loc == "all") spotClicked = true;
			else if (loc == "topleft") spotClicked = spotClicked || (e.clientX < (r.left+16) && e.clientY < (r.top+16))
			else if (loc == "bottomright") spotClicked = spotClicked || (e.clientX > (r.right-32) && e.clientY > (r.bottom-32))			
		})
		if (spotClicked) {
			let cmd = pm.commands[cmdname]
			if (cmd) {
				selectClickedNode(pm,e)
				widgetParamHandler(pm,cmd)
				return true;
			} else
				return false;
		}
	}
}
