import {InlineMath, BlockMath, IFrame, Spreadsheet} from "./schema"
import {elt} from "../../../prosemirror/dist/dom"

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

InlineMath.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("span", {class: "inlinemath"}, " \\("+node.attrs.tex+"\\) ")
		// wait until node is attached to document to render
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,node.rendered])
	}
	return node.rendered;
}

BlockMath.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("div", {class: "blockmath"}, "\\["+node.attrs.tex+"\\]");
		// wait until node is attached to document to render
		MathJax.Hub.Queue(["Delay",MathJax.Callback,100],["Typeset",MathJax.Hub,node.rendered])
	}
	return node.rendered; 
} 

IFrame.prototype.serializeDOM = node => { 
	let dom = elt("iframe", {
		  src: node.attrs.src,
		  width: node.attrs.width,
		  height: node.attrs.height,
		  content: "text/html;charset=UTF-8",
		  class: "iframe",
		  frameborder: "1",
		  allowfullscreen: "1"
		})
	return dom;
}

Spreadsheet.prototype.serializeDOM = node => {
	console.log("serial hot")
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("div", {id: "spreadsheet", class: "spreadsheet", width:node.attrs.width, height: node.attrs.height});
/*		var data = [
		            ["", "Ford", "Volvo", "Toyota", "Honda"],
		            ["2014", 10, 11, 12, 13],
		            ["2015", 20, 11, 14, 13],
		            ["2016", 30, 15, 12, 13]
		          ];

        var container = document.getElementById('spreadsheet');
        var hot = new Handsontable(container, {
        	data: data,
        	minSpareRows: 1,
        	rowHeaders: true,
        	colHeaders: true,
        	contextMenu: true
      })
 */   }
	return node.rendered; 
} 

