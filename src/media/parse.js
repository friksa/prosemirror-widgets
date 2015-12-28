import {InlineMath, BlockMath, IFrame, Spreadsheet} from "./schema"

function def(type,tag,className) {
	type.register("parseDOM", {
		tag: tag,
		rank: 25,
		parse: (dom, context, type, attrs) => {
			let contains = dom.classList.contains(className)
			if (!contains) return false
			context.insertFrom(dom, type, attrs)
		}
	})	
}

def(InlineMath,"span","inlinemath")
def(BlockMath,"div","blockmath")
def(IFrame,"iframe","iframe")
def(Spreadsheet,"div","spreadsheet")
