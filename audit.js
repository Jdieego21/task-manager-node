const fs = require("fs");

function logAudit(action, details) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${action}: ${details}\n`;
    fs.appendFileSync("./audit.log", entry);
}

module.exports = { logAudit };
