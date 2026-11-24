
const API = "/api/tasks";

// Fetch and display tasks
async function loadTasks() {
    const response = await fetch(API);
    const tasks = await response.json();

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let completed = 0;

    tasks.forEach(task => {

        if (task.completed) completed++;

        const card = document.createElement("div");
        card.className = "task-card";

        const details = document.createElement("div");

        const heading = document.createElement("h3");
        heading.textContent = task.title;

        const description = document.createElement("p");
        description.textContent = task.description || "";

        const status = document.createElement("p");
        status.textContent = task.completed ? "Completed" : "Pending";
        status.className = task.completed ? "completed" : "";

        details.append(heading, description, status);

        const actions = document.createElement("div");

        const toggleButton = document.createElement("button");
        toggleButton.textContent = task.completed ? "Undo" : "Complete";
        toggleButton.onclick = () => updateTask(task);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteTask(task.id);

        actions.append(toggleButton, deleteButton);
        card.append(details, actions);

        taskList.appendChild(card);
    });

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = tasks.length - completed;
}

// Add task
async function addTask() {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    if (!title) {
        alert("Please enter a task title");
        return;
    }

    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            description: description,
            completed: false
        })
    });

    if (!response.ok) {
        alert("Unable to create task");
        return;
    }

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadTasks();
}

// Update task
async function updateTask(task) {

    await fetch(`${API}/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: task.title,
            description: task.description,
            completed: !task.completed
        })
    });

    loadTasks();
}

// Delete task
async function deleteTask(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

// Load tasks when page opens
loadTasks();
