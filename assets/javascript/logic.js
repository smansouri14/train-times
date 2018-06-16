$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC38x5cgnDWR54qXp5GPdFBvG5W-TjKAZc",
    authDomain: "project1-1f000.firebaseapp.com",
    databaseURL: "https://project1-1f000.firebaseio.com",
    projectId: "project1-1f000",
    storageBucket: "project1-1f000.appspot.com",
    messagingSenderId: "1057627859853"
  };
  firebase.initializeApp(config);



//variables
var database = firebase.database();
var trainName = [];
var destination = [];
var firstTrain = [];
var frequency = [];

// Button clicks
$("#add-train").on("click", function(event) {
    event.preventDefault();

//grabs user data
    trainName = $("#trainName-input").val().trim();
        console.log(trainName);
    destination = $("#destination-input").val().trim();
        console.log(destination);
    firstTrain = $("#firstTrain-input").val().trim();
        console.log(firstTrain);
    frequency = $("#frequency-input").val().trim();
        console.log(frequency);


// //sends the information to firebase
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

// Alert
  alert("Train successfully added");

// Clears all of the text-boxes
   $("#trainName-input").val("");
   $("#destination-input").val("");
   $("#firstTrain-input").val("");
   $("#frequency-input").val("");
   });  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

var trainName = childSnapshot.val().trainName;
var destination = childSnapshot.val().destination;
var firstTrain = childSnapshot.val().firstTrain;
var frequency = childSnapshot.val().frequency;


var frequency;
var firstTime = 0;

var ftConvert = moment(firstTime, "HH:mm").subtract(1, "years");
   console.log(ftConvert);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

// Difference between the times
var timeDifference = moment().diff(moment(ftConvert), "minutes");
console.log("DIFFERENCE IN TIME: " + timeDifference);

// Time apart (remainder)
var timeRemainder = timeDifference % frequency;
console.log(timeRemainder);

// Minute Until Train
var minutesUntillNextTrain = frequency - timeRemainder;
console.log("MINUTES TILL TRAIN: " + minutesUntillNextTrain);

// Next Train
var nextTrain = moment().add(minutesUntillNextTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

//displays the value typed in into the add train box
    $("#directory > tbody").append("<tr><td>" + trainName +"</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minutesUntillNextTrain + "</td></tr>");
    });
});
