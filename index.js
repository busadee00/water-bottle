import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove } from "firebase/database";
import express from 'express'
import bodyParser from "body-parser";

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})  

let PORT = process.env.PORT || 3001;

var app2 = express()
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }))
var server = app2.listen(PORT, console.log('server is running on port 3001'))

const firebaseConfig = {
    databaseURL: "https://water-bottle-50d9f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

//create
app2.post('/api/create', (req, res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var gender = req.body.gender;
    var birthday = req.body.birthday;

    try {
        console.log('>>>> firstname', firstname)
        console.log('path', 'users/' + firstname)
        set(ref(db, 'users/' + firstname), {
            name: firstname,
            lastname: lastname,
            gender: gender,
            birthday: birthday,
            // mil: new Date().getTime(),
            date: new Date() + ''
        })
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'good'
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})


//get
app2.get('/api/get', (req, res) => {
    try {
        get(ref(db, 'users'))
            .then((snapshot) => {
                console.log(snapshot.val())
                if (snapshot.exists()) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                        Result: snapshot.val()
                    })
                }
                else {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                        Result: 'not found data'
                    })
                }
            })
            .catch((err2) => {
                console.log(err2)
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: err2.message
                })
            })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//get by user
app2.post('/api/getbyuser', (req, res) => {
    var firstname = req.body.firstname

    try {
        get(ref(db, 'users/' + firstname))
            .then((snapshot) => {
                console.log(snapshot.val())
                if (snapshot.exists()) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                        Result: snapshot.val()
                    })
                }
                else {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                        Result: 'not found data'
                    })
                }
            })
            .catch((err2) => {
                console.log(err2)
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: err2.message
                })
            })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//update
app2.put('/api/update', (req, res) => {
    var firstname = req.body.firstname
    var lastname = req.body.lastname
    var birthday = req.body.birthday
    var gender = req.body.gender

    try {
        var updates = {};
        updates[`users/${firstname}/lastname`] = lastname;
        updates[`users/${firstname}/birthday`] = birthday;
        updates[`users/${firstname}/gender`] = gender;
        // updates[`users/${fullname}/date`] = new Date() + '';
        // updates[`users/${fullname}/mil`] = new Date().getTime();

        update(ref(db), updates)
            .then(() => {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good'
                })
            })
            .catch((err2) => {
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: 'bad ' + err2.message
                })
            })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//delete
app2.delete('/api/delete', (req, res) => {
    var firstname = req.body.firstname

    try {
        remove(ref(db, "users/" + firstname))
            .then(() => {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good'
                })
            })
            .catch((err2) => {
                return res.status(500).json({
                    RespCode: 500,
                    RespMessage: 'bad ' + err2.message
                })
            })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})