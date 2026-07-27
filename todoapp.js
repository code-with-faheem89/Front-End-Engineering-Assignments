(function () {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let id = Number(localStorage.getItem("id")) || 0;

    const todoContainer = document.getElementById("todo");

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("id", id);
    }

    function getTaskText(task) {
        return typeof task === "string" ? task : task.text || "";
    }

    function getTaskIndex(task) {
        return todos.findIndex((item) => {
            if (typeof item === "string") {
                return item === task;
            }
            return item && item.id === task.id;
        });
    }

    const style = document.createElement("style");
    style.textContent = `
        .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 10px;
        }

        .controls input {
            flex: 1;
            min-width: 180px;
        }
    `;
    document.head.appendChild(style);

    const controlBox = document.createElement("div");
    controlBox.className = "controls";

    const todoInput = document.createElement("input");
    todoInput.type = "text";
    todoInput.placeholder = "Enter Task....";

    const addButton = document.createElement("button");
    addButton.textContent = "Add";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search task...";

    const searchButton = document.createElement("button");
    searchButton.textContent = "Search";

    const todoList = document.createElement("div");
    todoList.id = "taskList";

    controlBox.append(todoInput, addButton, searchInput, searchButton);
    todoContainer.append(controlBox, todoList);

    function renderTask(task) {

        const todoItem = document.createElement("div");
        todoItem.className = "todoItem";

        const p = document.createElement("p");
        p.textContent = getTaskText(task);

        const buttonBox = document.createElement("div");
        buttonBox.className = "buttons";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";

        completeBtn.addEventListener("click", () => {
            const taskIndex = getTaskIndex(task);

            if (taskIndex !== -1) {
                if (typeof todos[taskIndex] === "string") {
                    todos[taskIndex] = { id: id + 1, text: todos[taskIndex], complete: false, edit: 0 };
                    id += 1;
                }

                todos[taskIndex].complete = !todos[taskIndex].complete;
                saveTodos();
            }

            if (todoItem.classList.contains("completed")) {
                todoItem.classList.remove("completed");
                completeBtn.textContent = "Complete";
            } else {
                todoItem.classList.add("completed");
                completeBtn.textContent = "Undo";
            }

        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {

            const newTask = prompt("Edit your task:", p.textContent);

            if (newTask !== null && newTask.trim() !== "") {
                const taskIndex = getTaskIndex(task);

                if (taskIndex !== -1) {
                    if (typeof todos[taskIndex] === "string") {
                        todos[taskIndex] = { id: id + 1, text: todos[taskIndex], complete: false, edit: 0 };
                        id += 1;
                    }

                    todos[taskIndex].text = newTask.trim();
                    todos[taskIndex].edit += 1;
                    saveTodos();
                }

                p.textContent = newTask.trim();
            }

        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {

            const index = getTaskIndex(task);

            if (index !== -1) {
                todos.splice(index, 1);
                saveTodos();
            }

            todoItem.remove();
        });

        buttonBox.append(completeBtn, editBtn, deleteBtn);

        todoItem.append(p, buttonBox);

        todoList.append(todoItem);
    }

    function renderTasks(filterText = "") {
        todoList.innerHTML = "";
        const searchTerm = filterText.trim().toLowerCase();

        const visibleTodos = todos.filter((task) => {
            const taskText = getTaskText(task);
            return taskText.toLowerCase().includes(searchTerm);
        });

        visibleTodos.forEach((task) => renderTask(task));
    }

    function addTodo() {
        const task = todoInput.value.trim();

        if (!task) {
            todoInput.focus();
            return;
        }

        id = id + 1;
        const obj = {
            id: id,
            text: task,
            complete: false,
            edit: 0
        };
        todos.unshift(obj);

        saveTodos();

        renderTasks(searchInput.value);

        todoInput.value = "";
        todoInput.focus();
    }

    function searchTodo() {
        renderTasks(searchInput.value);
    }

    addButton.addEventListener("click", addTodo);

    todoInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTodo();
        }
    });

    searchButton.addEventListener("click", searchTodo);

    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            searchTodo();
        }
    });

    renderTasks();
})();
