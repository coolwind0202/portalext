const sessionStorage = chrome.storage.session;

// memorize answer endpoint URL we have to track now
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type != "portalext_answer_fire") return;

  // If the message is from not content script context
  if (!sender.tab) return;

  // currentWatchingAction should be managed by tab separately
  const watchingTarget = {
    currentWatchingActionDict: {
      [sender.tab.id]: request.form_action_target
    }
  }

  sessionStorage.set(watchingTarget).then(() => {
    console.debug(`[debug] currentWatchingAction on ${sender.tab.id} was changed to ${request.form_action_target}`);
  });
});

/**
 * 
 * @param {chrome.webRequest.WebResponseCacheDetails} responseDetail 
 */
const processResponse = async (responseDetail) => {
  /**
   * @type {{ currentWatchingFormActionTargetDict?: { [tabId:number]: string }}}
   */
  const storageResponse = await sessionStorage.get(["currentWatchingActionDict"]);

  const currentWatchingActionDict = storageResponse.currentWatchingActionDict;
  if (!currentWatchingActionDict) return;

  for (const tabIdString in currentWatchingActionDict) {
    // tabId

    const tabId = Number.parseInt(tabIdString);
    const formActionTarget = currentWatchingActionDict[tabId];
    if (formActionTarget != responseDetail.url) continue;

    // completed finding a tab which is waiting a response from responseDetail.URL
    const messagePayload = {
      type: "portalext_answer_confirm",
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
  urls: [
    "https://solomon.mc.chitose.ac.jp/wbt/*"
    /*, "http://localhost:3000/*"*/
  ],
  types: ["xmlhttprequest"]
});