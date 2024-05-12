const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const button = document.getElementById("btn");

function getList() {
  if (inputBox.value === "") {
    const h2 = document.createElement("h2");
    h2.innerHTML = "Please input something";
    listContainer.appendChild(h2);
    button.disabled = true
    
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    // Add event listener to the close button
    span.addEventListener("click", function () {
      li.remove();
      saveData();
      button.disabled = false
    });
   
  }
  inputBox.value = "";
  saveData();
  
}

button.addEventListener("click", getList);

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
});

function saveData() {
  // Save each task separately in localStorage
  const tasks = listContainer.querySelectorAll("li");
  const tasksData = [];
  tasks.forEach((task) => {
    tasksData.push(task.innerHTML);
  });
  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function showTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (savedTasks) {
    savedTasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerHTML = task;
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
      listContainer.appendChild(li);
      // Add event listener to the close button
      span.addEventListener("click", function () {
        li.remove();
        saveData();
      });
    });
  }
}

showTasks();
