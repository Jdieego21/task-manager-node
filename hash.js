const bcrypt = require("bcrypt");

const pass = "9505";
const saltRounds = 10;

bcrypt.hash(pass, saltRounds, (err, hash) => {
    console.log("Hash generadp: ");
    console.log(hash);
});
