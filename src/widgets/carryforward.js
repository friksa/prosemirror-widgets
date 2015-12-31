import {Block, Inline, Attribute} from "../../../../git/prosemirror/dist/model"
import {elt, insertCSS} from "../../../../git/prosemirror/dist/dom"
import {defParser, defParamsClick, andScroll} from "../utils"
 
let carryOptions = []

function getCarryOptions(names) {
	return names.map(w => ({value: w, label: w}))
}
 
export class CarryForward extends Inline {}
                             
CarryForward.attributes = {
	name: new Attribute()
}

defParser(CarryForward,"thinkspace","widgets-carryforward")

CarryForward.prototype.serializeDOM = node => {
	return elt("thinkspace",{class: "widgets-carryforward", name: node.attrs.name},
		elt("img",{src: "forward.png", width:16, height:16, title:"Carry forward "+node.attrs.name})
	)
}

CarryForward.register("command", {
	name: "insertCarryForward",
	label: "CarryForward",
	run(pm, name) {
    	return pm.tr.replaceSelection(this.create({name})).apply(andScroll)
  	},
	params: [
     	{ label: "Input name", type: "select", options: carryOptions }
	],
    prefillParams(pm) {
  		pm.commands.insertCarryForward.spec.params[0].options = getCarryOptions(["test1","test2"])
	    let {node} = pm.selection
	    if (node) {
	      return [node.attrs.name]
	    }
	 }
})

defParamsClick(CarryForward)

insertCSS(`

.widgets-carryforward {}

`)