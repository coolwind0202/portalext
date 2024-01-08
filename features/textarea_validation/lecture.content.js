const getLengthAsCRLF = (rawText) => {
  const trimmedText = rawText.trim();
  const newlineCount = [...trimmedText.matchAll("\n")].length;
  const lengthAsCRLF = trimmedText.length + newlineCount;
  return lengthAsCRLF;
}

const main = () => {
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach(textarea => {
    const maxLength = textarea.maxLength;
    const currentLengthBox = textarea.parentElement.querySelector("span:nth-of-type(1)");
    const submitButton = textarea.form.querySelector('button[type="submit"]');

    /* Set initial current length */
    currentLengthBox.textContent = getLengthAsCRLF(textarea.value);

    /* Replace limitation logic of textarea length */
    textarea.removeAttribute("maxlength");
    textarea.addEventListener("keyup", e => {
      const inputValue = e.target.value;
      const lengthAsCRLF = getLengthAsCRLF(inputValue);

      const isOverLength = lengthAsCRLF > maxLength
      const validity = isOverLength ? `この振り返りには、${maxLength}文字以下のメッセージのみ送信できます。` : "";
      textarea.setCustomValidity(validity);

      currentLengthBox.textContent = lengthAsCRLF;
    });

    submitButton.addEventListener("click", () => {
      /*
        TODO: if input value is invalid, this handler should prevent submit process.
      */
      textarea.reportValidity();
    });
  });
}

if (isLecturePage()) main();