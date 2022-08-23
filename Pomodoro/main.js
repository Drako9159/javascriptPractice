const tasks = []; //Almacena las tareas
let time = 0; //Tiempo inicial en 0
let timer = null; //funcion setinterval
let timerBreak = null; //5 minutos de descanso
let current = null; //Tarea a actual

const $bAdd = document.querySelector("#bAdd");
const $itTask = document.querySelector("#itTask");
const $form = document.querySelector("#form");
const $taskName = document.querySelector("#time #taskName");

$form.addEventListener("submit", (e) => {
  e.preventDefault();

  if ($itTask.value != "") {
    //Si no está vacio
    createTask($itTask.value); //Crea la tarea
    $itTask.value = "";
    renderTasks(); //Renderiza las tareas
  }
});
function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };
  tasks.unshift(newTask);
}
function renderTasks() {
  const html = tasks.map((e) => {
    return `<div class="task">
          <div class="completed">${
            e.completed
              ? `<span class="done">Done</span>`
              : `<button class="start-button" data-id="${e.id}">Start</button>`
          }</div>
          <div class="title">${e.title}</div>
       </div>`;
  });
  const $tasksContainer = document.querySelector("#tasks");
  $tasksContainer.innerHTML = html.join("");

  const $startButtons = document.querySelectorAll(".task .start-button");
  $startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!timer) {
        const id = button.getAttribute("data-id");
        startButtonHandler(id);
        button.textContent = "In rogress";
      }
    });
  });
}
function startButtonHandler(id) {
  time = 25 * 60;
  current = id;
  const taskIndex = tasks.findIndex((e) => e.id === id);

  $taskName.textContent = tasks[taskIndex].title;

  timer = setInterval(() => {
    timeHandler(id);
  }, 1000);
  //ejecuta una funcion de manera indefinida
  //Se ejecuta cada 1000 milisegundos
}
function timeHandler(id) {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timer);
    //Detiene el set interval
    current = null;
    //cuelve a null
    $taskName.textContent = "";
    renderTime();
  }
}
function renderTime() {
  const $timeDive = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  $timeDive.textContent = `${minutes < 10 ? "0" : ""} ${minutes}:${
    seconds < 10 ? "0" : ""
  } ${seconds}`;
  //Si minutos es menor que 10, coloca 0, y si no, coloca nada
}
