const fs = require("fs");
const bcrypt = require("bcrypt");
const { logAudit } = require("./audit");

function loadUsers() {
    return JSON.parse(fs.readFileSync("./users.json", "utf8"));
}

function saveUsers(users) {
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));
}

function isAdmin(username) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    return user && user.role === "admin";
}

async function login(ask) {
    const users = loadUsers();
    const user = await ask("Username: ");
    const pass = await ask("Password: ");
    const foundUser = users.find((u) => u.username === user);
    if (!foundUser) {
        console.log("Usuario no encontrado");
        logAudit("login_fail", `Usuario: ${user}`);
        return null;
    }
    const isMatch = await bcrypt.compare(pass, foundUser.password);
    if (isMatch) {
        console.log(`Bienvenido ${foundUser.username}`);
        console.log(`Rol: ${foundUser.role}`);
        logAudit("login_success", `Usuario: ${foundUser.username}`);
        return foundUser.username;
    } else {
        console.log("Contraseña incorrecta");
        logAudit("login_fail", `Usuario: ${user}`);
        return null;
    }
}

async function registrarUser(ask, adminMode = false) {
    const users = loadUsers();
    const newUser = await ask("Nuevo Usuario: ");
    const newPass = await ask("Nueva Contraseña: ");
    let role = "user";
    if (adminMode) {
        role = await ask("Rol (admin/user): ");
        if (role !== "admin" && role !== "user") role = "user";
    }
    if (newUser.trim() === "") {
        console.log("El nombre de usuario no puede estar vacío.");
        return;
    }
    if (newPass.length < 6) {
        console.log("La contraseña debe tener al menos 6 caracteres.");
        return;
    }
    const exists = users.find((u) => u.username === newUser);
    if (exists) {
        console.log("Usuario ya existe");
        return;
    }
    const hash = await bcrypt.hash(newPass, 10);
    const newAcc = {
        username: newUser,
        password: hash,
        role
    };
    users.push(newAcc);
    saveUsers(users);
    logAudit("register_user", `Usuario: ${newUser}, Rol: ${role}`);
    console.log("Usuario registrado exitosamente");
}

function listUsers() {
    const users = loadUsers();
    console.log("--- TODOS LOS USUARIOS ---");
    users.forEach(u => {
        console.log(`Usuario: ${u.username}, Rol: ${u.role}`);
    });
}

function deleteUser(username) {
    let users = loadUsers();
    users = users.filter(u => u.username !== username);
    saveUsers(users);
    logAudit("delete_user", `Usuario: ${username}`);
    console.log(`Usuario ${username} eliminado.`);
}

async function resetPassword(ask, username) {
    let users = loadUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
        console.log("Usuario no encontrado");
        return;
    }
    const newPass = await ask("Nueva contraseña para " + username + ": ");
    if (newPass.length < 6) {
        console.log("La contraseña debe tener al menos 6 caracteres.");
        return;
    }
    user.password = await bcrypt.hash(newPass, 10);
    saveUsers(users);
    logAudit("reset_password", `Usuario: ${username}`);
    console.log("Contraseña reseteada correctamente.");
}

module.exports = { login, registrarUser, listUsers, deleteUser, resetPassword, isAdmin };
