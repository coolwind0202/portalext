const getSubmenuTitle = () => {
  return document.querySelector(".submenuttl")?.textContent ?? null
}

const isLecturePage = () => {
  const title = getSubmenuTitle();
  return title == "授業";
}