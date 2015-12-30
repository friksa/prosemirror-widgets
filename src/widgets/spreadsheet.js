import {Block, Attribute} from "../../../prosemirror/dist/model"
import {elt,insertCSS} from "../../../prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"

export class SpreadSheet extends Block {}

SpreadSheet.attributes = {
	data: new Attribute({default: ""})
}

defParser(SpreadSheet,"div","widgets-spreadsheet")

SpreadSheet.prototype.serializeDOM = node => {
	if (node.rendered) {
		node.rendered = node.rendered.cloneNode(true)
	} else {
		node.rendered = elt("div", {
			id: "spreadsheet", 
			class: "widgets-spreadsheet"
		});
		// wait until node is attached to document to render
		window.setTimeout(function() {
			let data = [
	            ["", "Ford", "Volvo", "Toyota", "Honda"],
	            ["2014", 10, 11, 12, 13],
	            ["2015", 20, 11, 14, 13],
	            ["2016", 30, 15, 12, 13]
	        ];
	
	        let container = document.getElementById('spreadsheet');
	        let hot = new Handsontable(container, {
	        	data: data,
	            minSpareRows: 1,
	            rowHeaders: true,
	            colHeaders: true,
	            contextMenu: true
	        });
		}, 100)
	}
	return node.rendered; 
}

SpreadSheet.register("command", {
	name: "insertSpreadSheet",
	label: "SpreadSheet",
	run(pm, data) {
    	return pm.tr.replaceSelection(this.create({data})).apply(andScroll)
  	},
	params: [
     	{ label: "Link to data csv (fixed for demo)", type: "text", default: "cars.csv"}
	],
    prefillParams(pm) {
      let {node} = pm.selection
      if (node)
        return [node.attrs.data]
    }
})

defParamsClick(SpreadSheet)

insertCSS(`

.widgets-spreadsheet {}

`)