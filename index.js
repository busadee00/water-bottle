import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update, remove, query, orderByChild, equalTo } from "firebase/database";
import express from 'express'
import bodyParser from "body-parser";

var app2 = express()
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001;

app2.listen(PORT, () => {
  console.log(`Server is running. ${PORT}`)
})

const firebaseConfig = {
  databaseURL: "https://water-bottle-bbca6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

//create user
app2.post('/users', (req, res) => {
  //var id = req.body.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var gender = req.body.gender;
  var birthday = req.body.birthday;
  var height = req.body.height;
  var weight = req.body.weight;
  var bmi = req.body.bmi;
  var disease = req.body.disease;
  var exercise = req.body.exercise;
  var wakeUp = req.body.wakeUp;
  var sleep = req.body.sleep;
  var waterAmount = req.body.waterAmount;


  try {
      console.log('>>>> firstName', firstName)
      console.log('path', 'users/' + firstName)
      set(ref(db, 'users/' + firstName), {
          //id: id,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          birthday: birthday,
          height: height,
          weight: weight,
          bmi: bmi,
          disease: disease,
          exercise: exercise,
          wakeUp: wakeUp,
          sleep: sleep,
          waterAmount: waterAmount,
          //date: new Date() + '',
      
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


//create water
app2.post('/amount', (req, res) => {
  var firstName = req.body.firstName;

  try {
      console.log('>>>> firstName', firstName)
      console.log('path', 'users/' + firstName)
      set(ref(db, 'users/' + firstName + '/amountToDrink'), {
        
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

// post amountToDrink by user
app2.post('/amountToDrink', (req, res) => {
  const firstName = req.body.firstName;

  try {
    set(ref(db, `users/${firstName}/amountToDrink`), {
      "1st": {
        time: "10:00-11:00 AM",
        drink: "400"
      },
      "2nd": {
        time: "12:00-13:00 PM",
        drink: "400"
      },
      "3rd": {
        time: "14:00-15:00 PM",
        drink: "400"
      },
      "4th": {
        time: "16:00-17:00 PM",
        drink: "200"
      },
      "5th": {
        time: "18:00-19:00 PM",
        drink: "200"
      },
      "6th": {
        time: "20:00-21:00 PM",
        drink: "200"
      },
      "7th": {
        time: "22:00-23:00",
        drink: "100"
      },
      "8th": {
        time: "00:00-01:00",
        drink: "100"
      },
      // "9th": {
      //   time: "",
      //   drink: ""
      // }
    });

    return res.status(200).json({
      RespCode: 200,
      RespMessage: 'good'
    });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message
    });
  }
});



//get
app2.get('/get', (req, res) => {

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
app2.get('/get/:firstName', (req, res) => {
  const firstName = req.params.firstName

  try {
    const usersRef = ref(db, 'users')
    const queryRef = query(usersRef, orderByChild('firstName'), equalTo(firstName))

    get(queryRef)
      .then((snapshot) => {
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
  var id = req.body.id
  // var lastname = req.body.lastname
  // var birthday = req.body.birthday
  // var gender = req.body.gender

  try {
    var updates = {};
    updates[`users/${firstname}/id`] = id;
    // updates[`users/${firstname}/lastname`] = lastname;
    // updates[`users/${firstname}/birthday`] = birthday;
    // updates[`users/${firstname}/gender`] = gender;
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
