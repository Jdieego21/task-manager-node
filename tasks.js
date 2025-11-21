const fs = require("fs");

function loadTasks() {
    return JSON.parse(fs.readFileSync("./tasks.json", "utf8"));
}

function saveTasks(tasks) {
    fs.writeFileSync("./tasks.json", JSON.stringify(tasks, null, 2));
}

function getUserTasks(tasksList, username) {
    let userTasks = tasksList.find(u => u.username === username);
    if (!userTasks) {
        userTasks = { username, tasks: [] };
        tasksList.push(userTasks);
    }
    return userTasks;
}

function showTasks(userTasks) {
    if (userTasks.tasks.length > 0) {
        console.log(`Tareas de ${userTasks.username}:`);
        userTasks.tasks.forEach(task => {
            console.log(`${task.id}. [${task.done ? 'x' : ' '}] ${task.title} (${task.createdAt})`);
        });
    } else {
        console.log("No tienes tareas");
    }
}

function showAllTasks(tasksList) {
    console.log("--- TODAS LAS TAREAS DEL SISTEMA ---");
    tasksList.forEach(userTasks => {
        showTasks(userTasks);
    });
}

async function addTask(ask, userTasks, tasksList) {
    const newTitle = await ask("Título de la nueva tarea: ");
    if (newTitle.trim() === "") {
        console.log("El título no puede estar vacío.");
        return;
    }
    const newId = userTasks.tasks.length > 0 ? userTasks.tasks[userTasks.tasks.length-1].id + 1 : 1;
    userTasks.tasks.push({ id: newId, title: newTitle, done: false, createdAt: new Date().toISOString() });
    saveTasks(tasksList);
    console.log("Tarea agregada correctamente.");
}

async function markTaskDone(ask, userTasks, tasksList) {
    if (userTasks.tasks.length === 0) {
        console.log("No tienes tareas para marcar.");
        return;
    }
    const id = parseInt(await ask("ID de la tarea a marcar como hecha: "));
    const tarea = userTasks.tasks.find(t => t.id === id);
    if (tarea) {
        tarea.done = true;
        saveTasks(tasksList);
        console.log("Tarea marcada como hecha.");
    } else {
        console.log("ID de tarea no encontrado.");
    }
}

async function deleteTask(ask, userTasks, tasksList) {
    if (userTasks.tasks.length === 0) {
        console.log("No tienes tareas para borrar.");
        return;
    }
    const id = parseInt(await ask("ID de la tarea a borrar: "));
    const idx = userTasks.tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
        userTasks.tasks.splice(idx, 1);
        saveTasks(tasksList);
        console.log("Tarea borrada correctamente.");
    } else {
        console.log("ID de tarea no encontrado.");
    }
}

module.exports = { loadTasks, saveTasks, getUserTasks, showTasks, showAllTasks, addTask, markTaskDone, deleteTask };
