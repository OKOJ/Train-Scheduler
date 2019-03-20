// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvd5GN-fIS0cCBQZPaf9KtvhNBcmCceNo",
  authDomain: "project-6744b.firebaseapp.com",
  databaseURL: "https://project-6744b.firebaseio.com",
  projectId: "project-6744b",
  storageBucket: "project-6744b.appspot.com",
  messagingSenderId: "741755675576"
};
firebase.initializeApp(config);

var database = firebase.database();

// button for adding Train
$("#submit-bt").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = moment($("#firstTrainTime").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  // Uploads train data to the database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

  // Logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Clears all of the text-boxes
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;

  // train Info
  /*console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);*/

  // converting time
  var firstTrainTimeConverted = moment.unix(firstTrainTime).format("HH:mm");
  console.log(firstTrainTimeConverted)

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // 
  var differ = moment().diff(moment.unix(firstTrainTime), "minutes");
  //console.log(differ);


  var timeReminder = differ % frequency;

  var minutesAway = frequency - timeReminder;
  //console.log(minutesAway);

  var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");


  // Create the new row
  var newRow = $("<tr>").append(

    $("<td>").append(trainName),
    $("<td>").append(destination),
    $("<td>").append(frequency),
    $("<td>").append(nextArrival),
    $("<td>").append(minutesAway)

  );
  // The new row to the table
  $("#train-table > tbody").append(newRow);
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});