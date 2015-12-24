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

def(Checkbox,"label","checkbox")
def(Textfield,"label","textfield")
def(Textarea,"label","textarea")
def(Select,"label","select")

def(Choice,"label","choice")
def(MultipleChoice,"div","multiplechoice")
def(Scale,"div","scale")
def(Checklist,"div","checklist")
