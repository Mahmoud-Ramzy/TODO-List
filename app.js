const inp = document.querySelector(".task-input input");
let taskBox = document.querySelector(".task-box");
let clearBTN = document.querySelector(".clear-btn");
let todos = JSON.parse(localStorage.getItem("todo-list"));

let editID;
let isEdited = false;

let bell = new Audio("./Bell.mp3");
function showTODO() {
  let li = "";
  document.getElementById("all").classList.add("active");
  document.getElementById("ToDo").classList.remove("active");
  document.getElementById("completed").classList.remove("active");

  //   todos item consists of todo{name, state} and id
  console.log(todos);
  if (todos) {
    todos.forEach((todo, id) => {
      let Pclass = todo.state === "completed" ? "checked" : "";
      let edit = todo.state === "completed" ? "hidden" : "";
      li += `
            <li class="task-item">
                <label for="${id}">
                <input onclick="updateState(this)" type="checkbox" id="${id}" ${Pclass} />
                <p class="${Pclass}" > ${todo.name} </p>
                </label>
                <div class="settings">
                <div class="dots">
                <div class="dot1"></div>
                <div class="dot2"></div>
                <div class="dot3"></div>
                </div>
                <ul class="task-menu">
                <li class="${edit}" onclick="Edit(${id},'${todo.name}')">Edit</li>
                <li onclick="Delete(${id})">Delete</li>
                </ul>
                </div>
            </li>
            `;
    });
  }
  taskBox.innerHTML = li;
}
showTODO();

// Update state on check task,
function updateState(selected) {
  //Get the paragraph where the name of task is saved to make it deleted
  let taskName = selected.parentElement.lastElementChild;
  if (selected.checked) {
    bell.play();
    taskName.classList.add("checked");
    todos[selected.id].state = "completed";
    console.log(taskName);
  } else {
    taskName.classList.remove("checked");
    todos[selected.id].state = "todo";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

clearBTN.addEventListener("click", (e) => {
  todos = [];
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTODO();
});

inp.addEventListener("keyup", (e) => {
  let Task = inp.value.trim();
  if (e.key == "Enter" && Task) {
    console.log(Task);
    // get all todo list from local storage
    if (!todos) {
      todos = [];
    }
    let taskInfo = { name: Task, state: "todo" };
    todos.push(taskInfo); //add this task to the tasks
    localStorage.setItem("todo-list", JSON.stringify(todos));
    inp.value = "";
    showTODO();
  } else if (e.key == "Enter" && !Task) {
    console.log("Insert a task");
    // Make a pop up error message
  }
});

//Pop up null error
//Pop up repeated error
//filter
function showWaited(State) {
  let li = "";
  document.getElementById("all").classList.remove("active");
  if (State === "todo") {
    document.getElementById("ToDo").classList.add("active");
    document.getElementById("completed").classList.remove("active");
  } else {
    document.getElementById("ToDo").classList.remove("active");
    document.getElementById("completed").classList.add("active");
  }
  //   todos item consists of todo{name, state} and id
  if (todos) {
    todos.forEach((todo, id) => {
      let Pclass = todo.state === "completed" ? "checked" : "";
      let edit = todo.state === "completed" ? "hidden" : "";
      let waited = todo.state;
      if (waited === State) {
        li += `
        <li class="task-item">
        <label for="${id}">
        <input onclick="updateState(this)" type="checkbox" id="${id}" ${Pclass} />
        <p class="${Pclass}" > ${todo.name} </p>
        </label>
        <div class="settings">
        <div class="dots">
        <div class="dot1"></div>
        <div class="dot2"></div>
        <div class="dot3"></div>
        </div>
        <ul class="task-menu">
        <li  class="${edit}" onclick="Edit(${id},'${todo.name}')">Edit</li>
        <li onclick="Delete(${id})">Delete</li>
        </ul>
        </div>
        </li>
        `;
      }
    });
  }
  taskBox.innerHTML = li;
}
function Edit(itemID, itemName) {
  inp.value = itemName;
  Delete(itemID);
}

function Delete(itemID) {
  todos.splice(itemID, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTODO();
}
