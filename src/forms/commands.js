import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select} from "./schema"

MultipleChoice.attachCommand("insertMultipleChoice", function(type) {
	return {
		label: "Multiple-choice Question",
		run(pm, name) {
			//let content  = [formSchema.node("paragraph"), formSchema.node("choice")]
	    	return pm.tr.replaceSelection(type.create({name: name})).apply()
	  	},
		params: [
			{ name: "Name", type: "text"}
		],
		icon: {
		  width: 220, height: 220,
		  path: "M152.763,0H20v220h180V36.827L152.763,0z M58.333,195.333C49.865,195.333,43,188.468,43,180c0-8.468,6.865-15.333,15.333-15.333c8.468,0,15.333,6.865,15.333,15.333C73.667,188.468,66.802,195.333,58.333,195.333z M58.333,137.333C49.865,137.333,43,130.468,43,122c0-8.468,6.865-15.333,15.333-15.333c8.468,0,15.333,6.865,15.333,15.333C73.667,130.468,66.802,137.333,58.333,137.333z M58.333,76.333C49.865,76.333,43,69.468,43,61c0-8.468,6.865-15.333,15.333-15.333c8.468,0,15.333,6.865,15.333,15.333C73.667,69.468,66.802,76.333,58.333,76.333z M175,190H96v-21h79V190z M175,132H96v-21h79V132z M175,71H96V50h79V71z"
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
		  width: 533, height: 522,
		  path: "M233.333,66.667v-8.333c0-13.75-11.25-25-25-25H125c-13.75,0-25,11.25-25,25v8.333H0v66.667h100v8.333c0,13.75,11.25,25,25,25h83.333c13.75,0,25-11.25,25-25v-8.333h300V66.667H233.333z M133.333,133.333V66.667H200v66.667H133.333zM433.333,225c0-13.75-11.25-25-25-25H325c-13.75,0-25,11.25-25,25v8.333H0V300h300v8.333c0,13.751,11.25,25,25,25h83.334c13.75,0,25-11.249,25-25V300h100v-66.667h-100V225z M333.333,300v-66.667H400V300H333.333z M233.333,391.667c0-13.751-11.25-25-25-25H125c-13.75,0-25,11.249-25,25V400H0v66.667h100V475c0,13.75,11.25,25,25,25h83.333c13.75,0,25-11.25,25-25v-8.333h300V400h-300V391.667z M133.333,466.667V400H200v66.667H133.333z"
		},
	    menuGroup: "inline",
	    menuRank: 55,
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
			return pm.tr.replaceSelection(type.create({name, direction})).apply()
	  	},
		params: [
	     	{ name: "Name", type: "text"},
	     	{ name: "Direction (vertical, horizontal)", type: "text", default: "vertical"}
		],
		icon: {
			width: 294, height: 294,
			path: "M124.916,0.002c-1.649,0.045-3.169,0.9-4.064,2.285l-14.49,21.736h-49.35c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50c2.761,0,5-2.239,5-5V39.574l-10,15v19.449h-40v-40h37.682L85.631,55.117l-6.146-12.293c-1.205-2.485-4.196-3.523-6.681-2.318c-2.485,1.205-3.523,4.196-2.318,6.681c0.018,0.036,0.035,0.072,0.054,0.108l10,20c1.235,2.47,4.238,3.472,6.709,2.237c0.778-0.389,1.441-0.974,1.924-1.698l40-60c1.565-2.276,0.989-5.389-1.287-6.954C127.013,0.281,125.974-0.027,124.916,0.002L124.916,0.002z M147.012,44.025c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90c2.761,0,5-2.239,5-5v-10c0-2.761-2.239-5-5-5H147.012z M57.012,94.06c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50c2.761,0,5-2.239,5-5v-50c0-2.761-2.239-5-5-5H57.012zM62.012,104.06h40v40h-40V104.06z M147.012,114.023c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90c2.761,0,5-2.239,5-5v-10c0-2.761-2.239-5-5-5H147.012z M57.012,164.023c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50c2.761,0,5-2.239,5-5v-50c0-2.761-2.239-5-5-5H57.012z M62.012,174.023h40v40h-40V174.023z M147.012,184.058c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90c2.761,0,5-2.239,5-5v-10c0-2.761-2.239-5-5-5H147.012z M57.012,234.023c-2.761,0-5,2.239-5,5v50c0,2.761,2.239,5,5,5h50c2.761,0,5-2.239,5-5v-50c0-2.761-2.239-5-5-5L57.012,234.023L57.012,234.023z M62.012,244.023h40v40h-40V244.023z M147.012,254.023c-2.761,0-5,2.239-5,5v10c0,2.761,2.239,5,5,5h90c2.761,0,5-2.239,5-5v-10c0-2.761-2.239-5-5-5H147.012z"
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
		  width: 459, height: 459,
		  path: "M408,51v357H51V51H408 M408,0H51C22.95,0,0,22.95,0,51v357c0,28.05,22.95,51,51,51h357c28.05,0,51-22.95,51-51V51C459,22.95,436.05,0,408,0L408,0z"
		},
	    menuGroup: "inline",
	    menuRank: 52,
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
		  width: 23, height: 23,
		  path: "M16.203,11.026v7.417h-3.556v3.267l-0.048,0.044H1.935V1.528h14.268v4.019l1.529-1.529V0.764C17.732,0.341,17.389,0,16.968,0H1.171C0.749,0,0.407,0.341,0.407,0.764v21.754c0,0.422,0.342,0.764,0.764,0.764h11.721c0.188,0,0.369-0.07,0.51-0.194l4.076-3.648c0.162-0.145,0.254-0.352,0.254-0.569V9.498L16.203,11.026z"
		},
	    menuGroup: "inline",
	    menuRank: 53,
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
		  width: 498, height: 498,
		  path: "M493.65,109.76c-9.859-18.405-32.775-25.333-51.179-15.472c-22.059,11.816-42.897,23.982-62.82,36.717l0.003-51.276c0-11.313-9.146-20.494-20.493-20.494H20.457C9.164,59.235,0,68.417,0,79.729v338.7c0,11.291,9.163,20.474,20.457,20.474h338.686c11.348,0,20.496-9.183,20.496-20.474l0.009-195.875c30.092-22.165,62.312-42.213,98.529-61.615C496.582,151.079,503.509,128.166,493.65,109.76z M338.702,397.917H40.968V100.219h297.734v58.715c-40.715,29.649-78.022,62.759-114.834,101.677c-4.275-5.648-8.601-11.423-13.129-17.47c-9.354-12.491-19.958-26.648-32.375-42.632c-12.81-16.487-36.561-19.468-53.05-6.659c-16.488,12.811-19.47,36.562-6.659,53.051c12.007,15.455,21.949,28.728,31.563,41.565c13.841,18.482,26.915,35.938,42.45,54.771c7.075,8.576,17.566,13.604,28.682,13.745c0.162,0.002,0.321,0.002,0.482,0.002c10.94,0,21.356-4.741,28.541-13.012c29.482-33.939,58.199-62.952,88.329-88.826V397.917z"
		},
	    menuGroup: "inline",
	    menuRank: 51,
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
		console.log("run select")
	    	return pm.tr.replaceSelection(type.create({name,label,options,multiple})).apply()
	  	},
		params: [
	     	{ name: "Name", type: "text"},
	     	{ name: "Label", type: "text"},
	     	{ name: "Options (comma separated)", type: "text"},
	     	{ name: "Selection (single or multiple)", type: "text", default: "single" }
		],
		icon: {
		  width: 409, height: 409,
		  path: "M389.723,120.989H19.459C8.729,120.989,0,129.718,0,140.45v88.07c0,10.73,8.729,19.461,19.459,19.461h219.536c3.082,0,6.414-13.756,6.668-14.902c0.415-1.875,0.162-2.34-0.963-2.34H91.246c0,0-2.396-0.389-2.396-4.014c0-21.749,0-62.84,0-85.124c0-3.333,3.146-3.369,3.146-3.369h297.727c1.2,0,2.217,1.016,2.217,2.218v88.07c0,1.201-1.017,2.219-2.217,2.219h-34.271c0,0-4.876-0.327-3.51,2.921c1.236,2.938,4.517,9.692,5.845,11.335c2.414,2.986,5.665,2.986,5.665,2.986h26.271c10.729,0,19.461-8.73,19.461-19.461v-88.07C409.184,129.719,400.453,120.989,389.723,120.989z"
		},
	    menuGroup: "inline",
	    menuRank: 54,
	    prefillParams(pm) {
		    let {node} = pm.selection
		    if (node && node.type == type)
		      return [node.attrs.name, node.attrs.label, node.attrs.options, node.attrs.multiple]
		 }
	}
})  

