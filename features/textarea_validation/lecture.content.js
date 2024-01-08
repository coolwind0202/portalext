const getLengthAsCRLF = (text) => {
  const newlineCount = [...text.matchAll("\n")].length;
  const lengthAsCRLF = text.length + newlineCount;
  return lengthAsCRLF;
}

const main = () => {
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach(textarea => {
    const maxLength = textarea.maxLength;
    const currentLengthBox = textarea.parentElement.querySelector("span:nth-of-type(1)");

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
  });
}

if (isLecturePage()) main();