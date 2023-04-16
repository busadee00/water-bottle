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
app2.post('/am', (req, res) => {
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
      }
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

app2.post('/amo', async (req, res) => {
  const firstName = req.body.firstName;
  const userRef = ref(db, `users/${firstName}`);

  try {
    // Get the user data
    const userSnap = await get(userRef);
    const userData = userSnap.val();

    // Calculate the average amount of water drank
    const totalWaterAmount = Object.values(userData.amountToDrink).reduce((acc, curr) => acc + parseInt(curr.drink), 0);
    const avgWaterAmount = Math.floor(totalWaterAmount / 8);

    // Create the new amountWater object with child objects 1st-8th
    const amountWaterObj = {
      "1st": {
        time: "10:00-11:00 AM",
        drink: userData.amountToDrink["1st"].drink,
        waterAmount: avgWaterAmount.toString()
      },
      "2nd": {
        time: "12:00-13:00 PM",
        drink: userData.amountToDrink["2nd"].drink,
        waterAmount: avgWaterAmount.toString()
      },
      "3rd": {
        time: "14:00-15:00 PM",
        drink: userData.amountToDrink["3rd"].drink,
        waterAmount: avgWaterAmount.toString()
      },
      "4th": {
        time: "16:00-17:00 PM",
        drink: userData.amountToDrink["4th"].drink,
        waterAmount: avgWaterAmount.toString()
      },
      "5th": {
        time: "18:00-19:00 PM",
        drink: userData.amountToDrink["5th"].drink,
        waterAmount: avgWaterAmount.toString()
      },
      "6th": {
        time: "20:00-21:00 PM",
        drink: userData.amountToDrink["6th"].drink,
        waterAmount: avgWaterAmount.toString()
      },
      "7th": {
        time: "22:00-23:00",
        drink: userData.amountToDrink["7th"].drink,
        waterAmount: avgWaterAmount.toString()
      },
      "8th": {
        time: "00:00-01:00",
        drink: userData.amountToDrink["8th"].drink,
        waterAmount: avgWaterAmount.toString()
      }
    };

    // Set the amountWater object in the database
    set(ref(userRef, "amountWater"), amountWaterObj);

    return res.status(200).json({
      RespCode: 200,
      RespMessage: 'good'
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message
    });
  }
});



//create daily by user
app2.post('/daily', (req, res) => {
  var firstName = req.body.firstName;
  var time = new Date();
  var drunk = req.body.drunk;
  var temp = req.body.temp;

  try {
      console.log('>>>> firstName', firstName)
      console.log('path', 'users/' + firstName)
      set(ref(db, 'users/' + firstName + '/daily/' + time), {
        drunk: drunk,
        temp: temp
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

// create waterAmount by user
app2.post('/waterAmount', async (req, res) => {
  const firstName = req.body.firstName;

  try {
    const userRef = ref(db, `users/${firstName}`);
    const userSnapshot = await get(userRef);

    if (!userSnapshot.exists()) {
      return res.status(404).json({
        RespCode: 404,
        RespMessage: 'User not found'
      })
    }

    const weight = userSnapshot.child('weight').val();
    const waterAmount = weight * 33;

    set(ref(db, `users/${firstName}/waterAmount`), waterAmount);

    return res.status(200).json({
      RespCode: 200,
      RespMessage: 'Water amount stored successfully'
    })
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({
      RespCode: 500,
      RespMessage: err.message
    })
  }
})


app2.post('/amountToDrinkk', (req, res) => {
  const firstName = req.body.firstName;
  const wakeUp = req.body.wakeUp;
  const sleep = req.body.sleep;

  // Calculate the total amount of water the user needs to drink
  get(ref(db, 'users/' + firstName + '/weight'))
    .then((snapshot) => {
      const weight = snapshot.val();
      const totalWater = weight * 33;

      // Calculate the amount of water the user needs to drink each hour
      const hoursToDrink = (sleep - wakeUp) / 3600000; // Convert to hours
      const waterPerHour = totalWater / hoursToDrink;

      // Calculate the average amount of water to drink during each 1-hour interval
      const intervals = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
      const intervalData = {};
      let startTime = wakeUp;
      for (let i = 0; i < intervals.length; i++) {
        const endTime = startTime + 3600000; // End time is 1 hour after start time
        const intervalWater = waterPerHour;
        if (!isNaN(intervalWater)) {
          intervalData[intervals[i]] = {
            drink: intervalWater,
            temp: null
          };
        } else {
          console.log(`Invalid intervalWater value for interval ${intervals[i]}: ${intervalWater}`);
        }
        startTime = endTime; // Set the start time for the next interval
      }

      // Save the amountToDrink data to the database
      set(ref(db, 'users/' + firstName + '/amountToDrink'), {
        ...intervalData
      });

      // Save the amountTo data to the database
      get(ref(db, `users/${firstName}/amountToDrink`)).then((snapshot) => {
        const amountToDrink = snapshot.val();

        set(ref(db, `users/${firstName}/amountTo`), amountToDrink);

        return res.status(200).json({
          RespCode: 200,
          RespMessage: 'Success'
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        RespCode: 500,
        RespMessage: err.message
      });
    });
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
