const form = document.querySelector("#add-todo");
const input = document.querySelector("#name");
const todoList = document.querySelector("#todo-list");

const savedTodos = JSON.parse(localStorage.getItem("todos"));
for (let i =0; i<savedTodos.length; i++){
    const pastTodo = document.createElement("li");
    pastTodo.innerText = savedTodos[i].task;
    pastTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    if (pastTodo.isCompleted) {
        pastTodo.classList.add("crossed-out")
    }
    todoList.append(pastTodo)
}

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    
    const newTodo = document.createElement("li")
    newTodo.innerText = input.value;
    newTodo.isCompleted = false;

    const removeBtn = document.createElement("button")
    removeBtn.innerText = "X";
    
    newTodo.append(removeBtn);
    todoList.append(newTodo);

    input.value = "";

    savedTodos.push({ task: newTodo.innerText, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));
})


todoList.addEventListener('click', (e)=> {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove()
    } else if (e.target.tagName === "LI" && e.target.isCompleted === false) {
        e.target.classList.add("crossed-out")
        e.target.isCompleted = true;
    } else if (e.target.tagName === "LI" && e.target.isCompleted === true) {
        e.target.classList.remove("crossed-out")
        e.target.isCompleted = false;
    }

    for (let i=0; i < savedTodos.length; i++){
        if (savedTodos[i].task === e.target.innerText) {
            savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
            localStorage.setItem("todos", JSON.stringify(savedTodos))
        }
    }
})
