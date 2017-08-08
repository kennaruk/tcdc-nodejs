var config = {
    apiKey: "AIzaSyDNmZJnJcMMJmetNRWUgwBe7GJ90P7MgIY",
    authDomain: "tcdc-49b99.firebaseapp.com",
    databaseURL: "https://tcdc-49b99.firebaseio.com",
    projectId: "tcdc-49b99",
    storageBucket: "tcdc-49b99.appspot.com",
    messagingSenderId: "89126620901"
  };
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const request = require('request');
admin.initializeApp(functions.config().firebase);

exports.addCustomer = functions.https.onRequest((req, res) => {

  if(req.method.toUpperCase() === "POST") {
    var customer = {
      fullname: req.body.fullname,
      age: req.body.age,
      gender: req.body.gender,
      occupation: req.body.occupation,
      field: req.body.field,
      interests: req.body.interests,
      frequency: req.body.frequency,
      days: req.body.days,
      arrivalTime: req.body.arrivalTime,
      duration: req.body.duration,
      transportation: req.body.transportation,
      suggestion: req.body.suggestion,
      timestamp: new Date()
    }
    admin.database().ref('/customer').push(customer).then(snapshot => {
      res.json({success: true, msg: "customer was added: ", customer});
    });
  } else {
    res.json({success: false, msg: "Unhandler http request method".});
  }

});

exports.addSurvey = functions.https.onRequest((req, res) => {
  if(req.method.toUpperCase() === "POST") {
    var survey = req.body;
    admin.database().ref('/survey').push(survey).then(snapshot => {
      res.json({success: true, msg: "'"+survey.name+"' survey added."})
    });
  } else {
    res.json({success: false, msg: "Unhandler http request method."});
  }
});

exports.getSurveyByName = functions.https.onRequest((req, res) => {
  if(req.method.toUpperCase() === "POST") {
    var name = req.body.name;
    admin.database().ref('/survey').orderByChild("name").equalTo(name).on("value", snapshot => {
      var val = snapshot.val();
      if(val != null) {
        res.json({success: true, msg: "Get survet by name: '"+name+"' success.", data: val});
      } else {
        res.json({success: false, msg: "Cannot get any survey name match: '"+name+"'", data:""});
      }
    })
  } else {
    res.json({success: false, msg: "Unhandler http request method.", data:""});
  }
});
