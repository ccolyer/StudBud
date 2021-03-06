// -- HTML elements -- //
const libraryForm = document.getElementById("libraryForm");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const readingsList = document.getElementById("readingsList");

// -- HTML event listeners -- //
libraryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addToLibrary(titleInput.value, urlInput.value);
});

// -- Functions that actually do stuff -- //

// -- This function adds a reading to our library and also renders it -- //
function addToLibrary(title, url) {
  console.log("ADD:", title, url);

  if (!title || !url) {
    alert("Make sure you provide a title and URL first!");
    return;
  }

  const id = new Date().getTime();

  const stringReadings = localStorage.getItem("studBudReadings");
  const listOfReadings = stringReadings ? JSON.parse(stringReadings) : [];
  listOfReadings.push({
    title,
    url,
    id,
  });
  localStorage.setItem("studBudReadings", JSON.stringify(listOfReadings));

  renderItem(title, url, id);

  libraryForm.reset();
}

// -- This renders the item in HTML, inspired by the example -- //
function renderItem(title, url, id) {
  const item = document.createElement("li");
  item.innerHTML = `<div class="Lib">
        <div class="readingContent">
            <div class="readingTitle">
                ${title}
            </div>
            <div class="readingUrl">
                <a target="_blank" id="readingLink" href="${url}">${url}</a>
            </div>
        </div>
        <div class="readingActions">
            <button type="button" id="deleteButton${id}">
                Delete
            </button>
        </div>
    </div>`;

  readingsList.appendChild(item);

  const delButton = document.getElementById(`deleteButton${id}`);
  delButton.addEventListener("click", (event) => {
    item.remove();

    const stringReadings = localStorage.getItem("studBudReadings");
    const listOfReadings = stringReadings ? JSON.parse(stringReadings) : [];
    const index = listOfReadings.findIndex((reading) => reading.url === url);
    listOfReadings.splice(index, 1);
    localStorage.setItem("studBudReadings", JSON.stringify(listOfReadings));
  });
}

function rememberPriorItems() {
  const stringReadings = localStorage.getItem("studBudReadings");
  const listOfReadings = stringReadings ? JSON.parse(stringReadings) : [];

  for (const reading of listOfReadings) {
    renderItem(reading.title, reading.url, reading.id);
  }
}

// -- Call this when the page loads so we make sure to remember what items were previously saved -- //
rememberPriorItems();
