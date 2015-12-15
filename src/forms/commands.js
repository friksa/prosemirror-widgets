import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select, formSchema} from "./schema"

MultipleChoice.attachCommand("insertMultipleChoice", function(type) {
	return {
		label: "Multiple-choice Question",
		run(pm, name) {
			let content  = [formSchema.node("paragraph"), formSchema.node("choice")]
	    	return pm.tr.replaceSelection(type.create({name: name},content)).apply()
	  	},
		params: [
			{ name: "Name", type: "text"}
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "block",
	    menuRank: 99,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name]
		 }
	}
})  

Scale.attachCommand("insertScale", function(type) {
	return {
		label: "Scale",
		run(pm, name, minvalue, minlabel, maxvalue, maxlabel) {
	    	return pm.tr.replaceSelection(type.create({name,minvalue,minlabel,maxvalue,maxlabel})).apply()
	  	},
		params: [
	     	{ name: "Name", type: "text"},
	     	{ name: "Minimum value", type: "text", default: 1},
	     	{ name: "Minimum label", type: "text", default: "min"},
	     	{ name: "Maximum value", type: "text", default: 10},
	     	{ name: "Maximum label", type: "text", default: "max"}
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "inline",
	    menuRank: 99,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name, node.attrs.minvalue, node.attrs.minlabel, node.attrs.maxvalue, node.attrs.maxlabel]
		 }
	}
})  

Checklist.attachCommand("insertChecklist", function(type) {
	return {
		label: "Checklist",
		run(pm, name, direction) {
			return pm.tr.replaceSelection(type.create({name, direction}, formSchema.node("checkitem"))).apply()
	  	},
		params: [
	     	{ name: "Name", type: "text"},
	     	{ name: "Direction (vertical, horizontal)", type: "text", default: "vertical"}
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "block",
	    menuRank: 99,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name, node.attrs.direction]
		 }
	}
})  

Textfield.attachCommand("insertTextfield", function(type) {
	return {
		label: "Textfield",
		run(pm, name, label, loc, size) {
	    	return pm.tr.replaceSelection(type.create({name,label,loc, size})).apply()
	  	},
		params: [
			     	{ name: "Name", type: "text"},
			     	{ name: "Label", type: "text"},
			     	{ name: "Label Location (left,right,top)", type: "text"},
			     	{ name: "Size", type: "text", default: "20" }
				],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "inline",
	    menuRank: 99,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name, node.attrs.label, node.attrs.loc, node.attrs.size]
		 }
	}
})  

Textarea.attachCommand("insertTextarea", function(type) {
	return {
		label: "Textarea",
		run(pm, name, label, rows, cols) {
	    	return pm.tr.replaceSelection(type.create({name,label,rows,cols})).apply()
	  	},
		params: [
	     	{ name: "Name", type: "text"},
	     	{ name: "Label", type: "text"},
	     	{ name: "Rows", type: "text"},
	     	{ name: "Columns", type: "text"}
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "block",
	    menuRank: 99,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name, node.attrs.label, node.attrs.rows, node.attrs.cols]
		 }
	}
})  

Checkbox.attachCommand("insertCheckbox", function(type) {
	return {
		label: "Checkbox",
		run(pm, name, label) {
	    	return pm.tr.replaceSelection(type.create({name, label})).apply()
	  	},
		params: [
	     	{ name: "Name", type: "text"},
	     	{ name: "Label", type: "text"}
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "inline",
	    menuRank: 99,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name, node.attrs.label]
		 }
	}
})  

Select.attachCommand("insertSelect", function(type) {
	return {
		label: "Select",
		run(pm, name, label, options, multiple) {		
	    	return pm.tr.replaceSelection(type.create({name,label,options,multiple})).apply()
	  	},
		params: [
	     	{ name: "Name", type: "text"},
	     	{ name: "Label", type: "text"},
	     	{ name: "Options (comma separated)", type: "text"},
	     	{ name: "Selection (single or multiple)", type: "text", default: "single" }
		],
		icon: {
		  width: 768, height: 896,
		  path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
		},
	    menuGroup: "inline",
	    menuRank: 99,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name, node.attrs.label, node.attrs.options, node.attrs.multiple]
		 }
	}
})  

