import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select} from "./schema"

function def(type,tag,cls) {
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

def(Checkbox,"input","radiobutton")
def(Checkbox,"input","checkbox")
def(Textfield,"input","textfield")
def(Textarea,"input","textarea")
def(Select,"select","select")

def(Choice,"p","choice")
def(MultipleChoice,"div","multiplechoice")
def(Scale,"div","scale")
def(Checklist,"div","checklist")
