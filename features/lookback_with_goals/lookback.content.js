const getLecturePageURL = () => {
  const href = document.evaluate(
    "//a[text() = '授業内容に戻る']/@href",
    document,
    null,
    XPathResult.STRING_TYPE,
    null,
  )?.stringValue;
  
  return href ?? null;
}

const getGoalSettingPageURL = (lecturePageDocument) => {
  const href = lecturePageDocument.evaluate(
    "//span[text() = '目標設定']/parent::a/@href",
    lecturePageDocument,
    null,
    XPathResult.STRING_TYPE,
    null,
  )?.stringValue;
  
  return href ?? null;
}

const getTextareaContents = (pageDocument) => {
  const elements = [...pageDocument.querySelectorAll("textarea")];
  const contents = elements.map(element => element.textContent);
  return contents;
}

const fetchGoalSettingPage = async (lecturePageDocument) => {
  const goalSettingPageURL = getGoalSettingPageURL(lecturePageDocument);
  const resp = await fetch(goalSettingPageURL);
  const respText = await resp.text();

  const goalSettingPageDocument = new DOMParser().parseFromString(respText, "text/html");   
  
  return goalSettingPageDocument;
}

const getGoalSettings = (goalSettingPageDocument) => {
  const textareaContents = getTextareaContents(goalSettingPageDocument);
  return textareaContents;
}

const fetchLecturePage = async () => {
  const lecturePageURL = getLecturePageURL();
  const resp = await fetch(lecturePageURL);
  const respText = await resp.text();

  const lecturePageDocument = new DOMParser().parseFromString(respText, "text/html");
  return lecturePageDocument;
}

/**
 * 
 * @param {Element} element 
 * @param {string} content
 */
const generateTbodyElement = (element, content) => {
  element.insertAdjacentHTML("beforebegin", "<tbody><tr><th class='orig'>設定目標</th><td class='orig' data-generated><p></p></td></tr></tbody>");

  const p = element.parentElement.querySelector("td[data-generated] > p");
  if (p == null) throw TypeError("not found p element in generated tbody");

  p.insertAdjacentText("beforeend", content);
}

const main_lookback_with_goals = async () => {
  // get lecture page
  const lecturePageDocument = await fetchLecturePage();

  // get goal setting
  const goalSettingPageDocument = await fetchGoalSettingPage(lecturePageDocument);
  const goalSettings = getGoalSettings(goalSettingPageDocument);

  const lookbackTextareaSnapshots = document.evaluate("//table/tbody/tr/td/textarea/ancestor::tbody", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

  goalSettings.forEach((goalSetting, index) => {
    const lookbackTextarea = lookbackTextareaSnapshots.snapshotItem(index);
    generateTbodyElement(lookbackTextarea, goalSetting);
  });
}
if (isLockbackPage()) main_lookback_with_goals();