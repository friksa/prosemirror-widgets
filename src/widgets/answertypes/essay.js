import {Block, Attribute} from "prosemirror/dist/model"
import {insertCSS} from "prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll, namePattern, nameTitle, selectedNodeAttr, getLastClicked} from "../../utils"

export class Essay extends Block {
	get attrs() {
		return {
			name: new Attribute,
			rows: new Attribute,
			cols: new Attribute,
			class: new Attribute({default: "widgets-essay widgets-edit"})
		}
	}
	get contains() { return null }
}

defParser(Essay,"input","widgets-essay")

// if new then use default. If style has changed, Essay has been resized otherwise return the stored value
/*function getDim(pm, dim) {
	let dom = getLastClicked()
	if (!dom) return 200
	if (dom.style[dim].length > 2) return dom.style[dim].slice(0,dom.style[dim].length-2)
}
*/
Essay.prototype.serializeDOM = (node,s) => s.renderAs(node,"textarea",{
	name: node.attrs.name,
	rows: node.attrs.rows,
	cols: node.attrs.cols,
	class: "widgets-essay widgets-edit"
})

Essay.register("command", "insert", {
	label: "Essay",
	run(pm, name, rows, cols) {
    	return pm.tr.replaceSelection(this.create({name,rows,cols})).apply(andScroll)
  	},
	params: [
  	    { name: "Name", label: "Short ID", type: "text",
     	  prefill: function(pm) { return selectedNodeAttr(pm, this, "name")},
   		  options: {
   			  pattern: namePattern, 
   			  size: 10, 
   			  title: nameTitle
   		  }},
   		  { name: "Rows", label: "In lines lines", type: "number", default: "4", options: {min: 2, max:24}, 
   			  prefill: function(pm) { return selectedNodeAttr(pm, this, "rows") }
   		  },
   	      { name: "Columns", label: "In characters", type: "number", default: "40", 
   			  prefill: function(pm) { return selectedNodeAttr(pm, this, "cols") },
   			  options: {min: 2, max:80}
   		  }
	]
}) 

defParamsClick(Essay,"essay:insert")

insertCSS(`

.ProseMirror .widgets-essay {
	resize: none;
}

`)