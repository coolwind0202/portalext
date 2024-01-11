const main_solomon_reanswer_feedback_text = () => {
  const answerConfirmButtonContainer = document.querySelector(".examContentsButtonLayout");

  if (!answerConfirmButtonContainer) return;
  const answerConfirmButton = answerConfirmButtonContainer.querySelector("button");

  answerConfirmButton.addEventListener("click", () => {
    const questionForm = answerConfirmButton.form;
    const messagePayload = {
      type: "portalext_answer_fire",
      form_action_target: questionForm.action
    }
    chrome.runtime.sendMessage(messagePayload);
  });

  const convertConfirmStatusToJapanese = (isCompleted) => {
    if (isCompleted) {
      return "答案の決定に成功しました。";
    }
    return "答案決定リクエストが失敗しました。開発者ツールを確認してください。";
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const isConfirmMessage = request.type == "portalext_answer_confirm"
    if (!isConfirmMessage) return;

    const japaneseLabel = convertConfirmStatusToJapanese(request.completed);
    const answerCompletedLabel = document.createElement("p");
    answerCompletedLabel.textContent = japaneseLabel;
    answerConfirmButtonContainer.appendChild(answerCompletedLabel);
  });
}

if (isExamPage()) main_solomon_reanswer_feedback_text();
console.log(isExamPage())