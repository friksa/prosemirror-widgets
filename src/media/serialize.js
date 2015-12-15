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
		  frameborder: "1",
		  allowfullscreen: "1"
		})
	return dom;
}
