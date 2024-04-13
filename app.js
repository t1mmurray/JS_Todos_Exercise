const form = document.querySelector("#add-todo");
const input = document.querySelector("#name");
const todoList = document.querySelector("#todo-list");

todoList.addEventListener('click', (e)=> {
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove()
        console.log(currentList)
    } else if (e.target.tagName === "LI") {
        e.target.classList.add("crossed-out")
    }
})

form.addEventListener("submit", (e)=> {
    e.preventDefault();
    
    const newTodo = document.createElement("li")
    newTodo.innerText = input.value;

    const removeBtn = document.createElement("button")
    removeBtn.innerText = "X";
    
    newTodo.append(removeBtn);
    todoList.append(newTodo);

    currentList.task = newTodo.innerText
    currentList.struck = false;
    localStorage.setItem("current", JSON.stringify(currentList))
    console.log(currentList)

    input.value = "";
})

