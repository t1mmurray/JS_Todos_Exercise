const form = document.querySelector("#add-todo");
const input = document.querySelector("#name");
const todoList = document.querySelector("#todo-list");



// retrieving past todos
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
for (let i = 0; i<savedTodos.length; i++){
    const newTodoDiv = document.createElement("div");
    const pastTodo = document.createElement("li");
    pastTodo.innerText = savedTodos[i].task;
    pastTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    if (pastTodo.isCompleted) {
        pastTodo.classList.add("crossed-out")
    }
    const removeBtn = document.createElement("button")
    removeBtn.innerText = "X";
    
    newTodoDiv.append(pastTodo);
    newTodoDiv.append(removeBtn);
    todoList.append(newTodoDiv);

}

// function declaration to be used when removing a specific todo from localStorage
function removeItemByValue(value){
    for(let i = 0; i < savedTodos.length; i++){
        if((savedTodos[i].task) === value){
          savedTodos.splice(i,1);
          }
        }
        localStorage.setItem('todos', JSON.stringify(savedTodos));
}
    
// adding todos to list and saving to localStorage
form.addEventListener("submit", (e)=> {
    e.preventDefault();
    const newTodoDiv = document.createElement("div");
    const newTodo = document.createElement("li")
    newTodo.innerText = input.value;
    newTodo.isCompleted = false;

    const removeBtn = document.createElement("button")
    removeBtn.innerText = "X";
    
    newTodoDiv.append(newTodo);
    newTodoDiv.append(removeBtn);
    todoList.append(newTodoDiv);

    savedTodos.push({ task: input.value, isCompleted: false });
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    input.value = "";

})

// Delete button, crossing todos off, saving in localStorage
todoList.addEventListener('click', (e)=> {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove();
        console.log(e.target.previousSibling.innerText);
        // This one isn't working! When you click the X button, it should also remove that todo from localStorage
        removeItemByValue(e.target.previousSibling.innerText);
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
