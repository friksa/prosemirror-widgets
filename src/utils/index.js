export {widgetParamHandler, defineFileHandler, namePattern, nameTitle, defParamsClick, selectedNodeAttr} from "./params"
export {Content, Answers} from "./divider"
import {selectableNodeAbove} from "C:/Users/pboysen/git/prosemirror/dist/edit/selection"
import {widgetParamHandler} from "./params"

export const andScroll = {scrollIntoView: true}

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

