function createLiMarkup(task) {
  return task
    .map(
      ({ text, id, statusbar }) =>
        `<li class="${statusbar ? "checked" : ""}" data-id="${id}">${text}
        <button type="button">&#10006;</button>
        </li>`
    )
    .join("");
}
export { createLiMarkup };
