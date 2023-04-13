import express, { response } from "express";
//import admin from "firebase-admin";
import credentials from "./key.json" assert { type: "json" };

const admin = require('firebase-admin');
const app = express();
const db = admin.firestore();
const PORT = process.env.PORT || 3001;

const admin = require('firebase-admin');
const serviceAccount = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://water-bottle-bbca6-default-rtdb.asia-southeast1.firebasedatabase.app"
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/create', async (req, res) => {
//     try {
//         console.log(req.body);
//         const id = req.body.userId;
//         const userJson = {
//             userId: req.body.userId,
//             firstName: req.body.firstname,
//             lastName: req.body.lastName,
//             gender: req.body.gender
//         };
//         const response = db.collection("users").doc(id).set(userJson);
//         res.send(response);
//     } catch (error) {
//         res.send(error);
//     }
// })







