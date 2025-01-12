const functions = require("firebase-functions");
process.env.MONGO_URL = functions.config().env.mongo_url;
process.env.SECRET = functions.config().env.secret;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const app = require("./app.js");
console.log(process.env);
exports.chifoumi = functions.https.onRequest(app);
