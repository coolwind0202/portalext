const isLecturePage = () => {
  const heading = document.evaluate("//div/p[text() = '講義の日程と内容']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue
  return heading != null;
}

const isLockbackPage = () => {
  const tableTitle = document.evaluate("//tbody/tr/td/span/p[text() = '振り返りと授業評価アンケート (対面・オンライン)']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue
  return tableTitle != null;
}