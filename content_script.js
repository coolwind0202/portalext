elements = document.querySelectorAll("p");

urlPattern = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g;
elements.forEach(element => {
    console.log(Array.from(element.innerHTML.matchAll(urlPattern)));
    element.innerHTML = element.innerHTML.replaceAll(urlPattern, `<a href="$&">$&</a>`);
});