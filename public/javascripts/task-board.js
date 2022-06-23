// -- HTML elements -- //
const taskForm = document.getElementById("taskForm");
const titleInput = document.getElementById("title");
const dueDateInput = document.getElementById("dueDate");
const estCompletionTimeInput = document.getElementById("estCompletionTime");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");

// -- HTML event listeners -- //
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addTask(
    titleInput.value,
    dueDateInput.value,
    estCompletionTimeInput.value,
    priorityInput.value
  );
});
// -- Functions that actually do stuff -- //
function addTask(title, dueDate, estCompletionTime, priority) {
  if (!title) {
    alert("Make sure you provide a title first!");
    return;
  }

  const id = new Date().getTime();
  const stringTasks = localStorage.getItem("studBudTasks");
  const listOfTasks = stringTasks ? JSON.parse(stringTasks) : [];
  listOfTasks.push({
    title,
    dueDate,
    estCompletionTime,
    priority,
    id,
  });
  localStorage.setItem("studBudTasks", JSON.stringify(listOfTasks));

  renderItem(title, dueDate, estCompletionTime, priority, false, id);

  taskForm.reset();
}

// -- This renders the item in HTML, inspired by the example -- //
function renderItem(title, dueDate, estCompletionTime, priority, checked, id) {
  const item = document.createElement("li");
  item.innerHTML = `<div class="taskOutput">
        <div class="taskContent" id="taskContent${id}">
            <div class="taskTitle">
                ${title}
            </div>
            <div class="additionalDetails">
                ${dueDate} - ${priority} priority
            </div>
        </div>
        <div class="taskActions">
            <button type="button" id="deleteButton${id}">
                Delete
            </button>
            <input type="checkbox" id="checkbox${id}">
        </div>
    </div>`;

  taskList.appendChild(item);

  const delButton = document.getElementById(`deleteButton${id}`);
  delButton.addEventListener("click", (event) => {
    item.remove();

    const stringTasks = localStorage.getItem("studBudTasks");
    const listOfTasks = stringTasks ? JSON.parse(stringTasks) : [];
    const index = listOfTasks.findIndex((task) => task.title === title);
    listOfTasks.splice(index, 1);
    localStorage.setItem("studBudTasks", JSON.stringify(listOfTasks));
  });

  const checkbox = document.getElementById(`checkbox${id}`);
  if (checked) {
    checkbox.setAttribute("checked", "true");
  }

  setStrikethrough(id, checked);

  checkbox.addEventListener("change", (event) => {
    const stringTasks = localStorage.getItem("studBudTasks");
    const listOfTasks = stringTasks ? JSON.parse(stringTasks) : [];
    const index = listOfTasks.findIndex((task) => task.title === title);
    const taskToUpdate = listOfTasks[index];
    taskToUpdate.checked = !taskToUpdate.checked;
    localStorage.setItem("studBudTasks", JSON.stringify(listOfTasks));
    setStrikethrough(id, taskToUpdate.checked);
  });
}

function setStrikethrough(id, checked) {
  const taskContent = document.getElementById(`taskContent${id}`);
  if (checked) {
    taskContent.classList.add("strikethrough");
  } else {
    taskContent.classList.remove("strikethrough");
  }
}

function rememberPriorItems() {
  const stringTasks = localStorage.getItem("studBudTasks");
  const listOfTasks = stringTasks ? JSON.parse(stringTasks) : [];

  for (const task of listOfTasks) {
    renderItem(
      task.title,
      task.dueDate,
      task.estCompletionTime,
      task.priority,
      task.checked,
      task.id
    );
  }
}

// -- Call this when the page loads so we make sure to remember what items were previously saved -- //
rememberPriorItems();
