const getRootChildrenURL = (name) => {
  const origin = new URL(document.URL).origin;
  const url = new URL(`./portal2/${name}`, origin);
  return url;
}

const functionsGetAlternativeHref = {
  "MyPage": () => getRootChildrenURL("MyPage"),
  "連絡": () => getRootChildrenURL("ViewUnReadTitles"),
  "予定": () => getRootChildrenURL("MonthlyScheduleViewer"),
  "授業": () => getRootChildrenURL("CoursesForUser"),
  "アンケート": () => getRootChildrenURL("QuestionnaireTopPage"),
}

const main_clickable_current_tab = () => {
  const tabAElements = document.querySelectorAll(".mainMenu > .tabMenu > li > a");
  tabAElements.forEach(a => {
    const getAlternativeHref = functionsGetAlternativeHref[a.textContent];
    const alternativeHref = getAlternativeHref ? getAlternativeHref() : document.URL;

    if (!a.href) {
      a.parentElement.dataset.wasEmpty = true;
    }
    a.href ||= alternativeHref;
  });
}

main_clickable_current_tab();