function showDescription(element) {
	const childs = element.parentNode.parentNode.childNodes
	const el = childs[childs.length-2]
	el.style.display === "flex" ? el.style.display = "none" : el.style.display = "flex"
}