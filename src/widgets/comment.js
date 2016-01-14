class Comment {
	constructor(id, text, range) {
		this.id = id
		this.text = text
		this.range = range
}

/*	var commands = exports.commands = { annotate: {
	    label: "Add annotation",
	    select: function select(pm) {
	      return pm.mod.comments && !pm.selection.empty;
	    },
	    run: function run(pm, text) {
	      pm.mod.comments.createComment(text);
	    },

	    params: [{ name: "Annotation text", type: "text" }],
	    menuGroup: "inline(99)",
	    display: {
	      type: "icon",
	      width: 1024, height: 1024,
	      path: "M512 219q-116 0-218 39t-161 107-59 145q0 64 40 122t115 100l49 28-15 54q-13 52-40 98 86-36 157-97l24-21 32 3q39 4 74 4 116 0 218-39t161-107 59-145-59-145-161-107-218-39zM1024 512q0 99-68 183t-186 133-257 48q-40 0-82-4-113 100-262 138-28 8-65 12h-2q-8 0-15-6t-9-15v-0q-1-2-0-6t1-5 2-5l3-5t4-4 4-5q4-4 17-19t19-21 17-22 18-29 15-33 14-43q-89-50-141-125t-51-160q0-99 68-183t186-133 257-48 257 48 186 133 68 183z"
	    }
	  } };
*/	
export class CommentStore {
	constructor(pm) {
		pm.mod.comments = this
		this.pm = pm
		thiscomments = Object.create(null)
	}
    prepareUpdate() {
    	let sel = this.pm.selection,
		comments = undefined;
    	if (!pm.mod.comments || !sel.empty || !pm.hasFocus() || (comments = pm.mod.comments.findCommentsAt(sel.head)).length == 0) {
    		return function () {
    			tooltip.close()
    			clearHighlight()
    			displaying = null
    		}
    	} else {
    		let id = comments.map(function (c) { return c.id }).join(" ");
    		if (id != displaying) {
    			let _ret = function () {
    				displaying = id;
    				let coords = bottomCenterOfSelection();
    				return {
    					v: function v() {
    						return tooltip.open(renderComments(comments), coords)
    					}
    				}
    			}()

    			if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    		}
    	}
    }
    addComment(from, to, text, id) {
    	if (!comments[id]) {
    		let range = pm.markRange(from, to, { className: "comment", id: id })
    		range.on("removed", function () { return removeComment(id) })
    		comments[id] = new Comment(text, id, range);
    	}
    }
    removeComment(id) {
    	let found = comments[id];
    	if (found) {
    		pm.removeRange(found.range);
    		delete comments[id];
    		return true;
    	}
    }
}

export class CommentUI {
	constructor(pm) {
		this.pm = pm
		tooltip = new Tooltip(pm.wrapper, "below");
	    highlighting = null;
	    displaying = null;
	}	
	highlightComment(comment) {
	    clearHighlight();
	    highlighting = pm.markRange(comment.range.from, comment.range.to, { className: "currentComment" });
	}
	clearHighlight() {
	    if (highlighting) {
	    	pm.removeRange(highlighting);
	        highlighting = null;
	    }
	}
	renderComment(comment) {
		let btn = elt("button",{class: "buttonDelete", title: "delete comment", "x")
		btn.addEventListener("click", e => {
			clearHighlight()
			pm.mod.comments.deleteComment(comment.id)
			update()
		})
		let li = elt("li",{class: "commentText"},btn)
	    li.addEventListener("mouseover", function (e) {
	      if (!li.contains(e.relatedTarget)) highlightComment(comment);
	    })
	    li.addEventListener("mouseout", function (e) {
	      if (!li.contains(e.relatedTarget)) clearHighlight();
	    })
	    return li;
	}	
	renderComments(comments) {
		let rendered = comments.map(function (c) { renderComment(c) })
		return elt("ul", { class: "commentList" }, rendered)
	}
}
	
function bottomCenterOfSelection() {
	  let rects = window.getSelection().getRangeAt(0).getClientRects();
	  let _rects = rects[rects.length - 1];
	  let left = _rects.left;
	  let right = _rects.right;
	  let bottom = _rects.bottom;
	  return { top: bottom, left: (left + right) / 2 };
}
