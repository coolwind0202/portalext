const sessionStorage = chrome.storage.session;

// memorize answer endpoint URL we have to track now
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(chrome.storage.session);
  if (request.type != "portalext_answer_fire") return;

  // If the message is from not content script context
  if (!session.tab) return;

  // currentWatchingFormActionTarget should be managed by tab separately
  const watchingTarget = {
    currentWatchingFormActionTargetDict: {
      [sender.tab.id]: request.form_action_target
    }
  }

  sessionStorage.set(watchingTarget).then(() => {
    console.debug(`[debug] currentWatchingFormActionTarget on ${sender.tab} was changed to ${request.form_action_target}`);
  });
});

const processResponse = async (responseDetail) => {
  //  we expect type of formActionTarget is { [tab in string]: string } 
  const formActionTargetDict = await sessionStorage.get(["currentWatchingFormActionTargetDict"]);

  const entries = Object.entries(formActionTargetDict);
  for (const entry of entries) {
    const [tabId, formActionTarget] = entry;
    if (formActionTarget != responseDetail.URL) continue;

    // completed finding a tab which is waiting a response from responseDetail.URL
    const messagePayload = {
      type: "portal_ext_answer_confirm",
      isCompleted: responseDetail.statusCode == 200
    };
    chrome.tabs.sendMessage(tabId, messagePayload);
    console.debug(`[debug] tab: ${tabId}, status: ${messagePayload.isCompleted ? "completed" : "unknown"}`)
    break;
  };
}

chrome.webRequest.onResponseStarted.addListener((responseDetail) => {
  processResponse(responseDetail);
}, {
  urls: ["*://solomon.mc.chitose.ac.jp/wbt/*"]
});