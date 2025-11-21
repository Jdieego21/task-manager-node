const readline = require("readline");
const { login, registrarUser, listUsers, deleteUser, resetPassword, isAdmin } = require("./login");
const { loadTasks, getUserTasks, showTasks, showAllTasks, addTask, markTaskDone, deleteTask } = require("./tasks");
const { initFiles } = require("./init");

initFiles();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (input) => {
            resolve(input);
        });
    });
}

async function menUser(username) {
    let run = true;
    let tasksList = loadTasks();
    let userTasks = getUserTasks(tasksList, username);
    while(run){
        try {
            if(isAdmin(username)) {
                console.log("--- MENÚ ADMIN ---");
                console.log("1. Ver todos los usuarios");
                console.log("2. Ver todas las tareas");
                console.log("3. Borrar usuario");
                console.log("4. Resetear contraseña de usuario");
                console.log("5. Registrar usuario");
                console.log("6. Cerrar sesión");
                const op = parseInt(await ask("Elige una opción: "));
                if(op === 1){
                    listUsers();
                }else if(op === 2){
                    showAllTasks(tasksList);
                }else if(op === 3){
                    const userToDelete = await ask("Usuario a borrar: ");
                    if(userToDelete === username) {
                        console.log("No puedes borrarte a ti mismo.");
                    } else {
                        deleteUser(userToDelete);
                    }
                }else if(op === 4){
                    const userToReset = await ask("Usuario para resetear contraseña: ");
                    await resetPassword(ask, userToReset);
                }else if(op === 5){
                    await registrarUser(ask, true);
                }else if(op === 6){
                    run = false;
                    console.log("Sesión cerrada. ¡Hasta luego!");
                }else{
                    console.log("Opción incorrecta. Elige una opción válida.");
                }
            } else {
                console.log("--- MIS TAREAS ---");
                console.log("1. Ver mis tareas");
                console.log("2. Agregar tarea");
                console.log("3. Marcar tarea como hecha");
                console.log("4. Borrar tarea");
                console.log("5. Cerrar Sesión");
                const op = parseInt(await ask("Elige una opción: "));
                if(op === 1){
                    showTasks(userTasks);
                }else if(op === 2){
                    await addTask(ask, userTasks, tasksList);
                }else if(op === 3){
                    await markTaskDone(ask, userTasks, tasksList);
                }else if(op === 4){
                    await deleteTask(ask, userTasks, tasksList);
                }else if(op === 5){
                    run = false;
                    console.log("Sesión cerrada. ¡Hasta luego!");
                }else{
                    console.log("Opción incorrecta. Elige una opción válida.");
                }
            }
        } catch (err) {
            console.log("Error inesperado:", err.message);
        }
    }
}

async function menu(){
    let running = true;
    while(running){
        try {
            console.log("---- SISTEMA DE TAREAS ----");
            console.log("1. Login ");
            console.log("2. Registrar usuario");
            console.log("3. Salir");
            const opcion = parseInt(await ask("Elige una opción: "));
            if(opcion === 1){
                const username = await login(ask);
                if(username) await menUser(username);
            }else if(opcion === 2){
                await registrarUser(ask);
            }else if(opcion === 3){
                running = false;
            }else{
                console.log("Opción Incorrecta");
            }
        } catch (err) {
            console.log("Error inesperado:", err.message);
        }
    }
    rl.close();
}

menu();