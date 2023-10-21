chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "/dashboard/dist/index.html" });
});