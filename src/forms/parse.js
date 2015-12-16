import {Choice, MultipleChoice, Scale, Checkitem, Checklist, Textfield, Checkbox, Textarea, Select} from "./schema"

function def(type,tag,clazz) {
	type.register("parseDOM", {
		tag: tag,
		rank: 25,
		parse: (dom, context, type, attrs) => {
			let contains = dom.classList.contains(clazz)
			if (!contains) return false
			context.insertFrom(dom, type, attrs)
		}
	})	
}

def(Choice,"div","choice")
def(MultipleChoice,"div","multiplechoice")
def(Scale,"div","scale")
def(Checklist,"div","checklist")
def(Textfield,"label","textfield")
def(Checkbox,"label","checkbox")
def(Textarea,"label","choice")
def(Select,"label","select")