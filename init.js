// Inicializa los archivos de datos si no existen
const fs = require("fs");

function initFiles() {
    if (!fs.existsSync("./users.json")) {
        fs.writeFileSync("./users.json", "[]");
    }
    if (!fs.existsSync("./tasks.json")) {
        fs.writeFileSync("./tasks.json", "[]");
    }
}

module.exports = { initFiles };
