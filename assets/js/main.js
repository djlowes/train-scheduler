//Important variable
time = Date.now();
console.log(typeof trainName)

//Firebase Config
var config = {
  apiKey: "AIzaSyACI663gzqkpyqCUO9b68zMqbpK6Spqd4Y",
  authDomain: "countdown-1d39a.firebaseapp.com",
  databaseURL: "https://countdown-1d39a.firebaseio.com",
  projectId: "countdown-1d39a",
  storageBucket: "countdown-1d39a.appspot.com",
  messagingSenderId: "90439567725"
};
firebase.initializeApp(config);
var dataRef = firebase.database();

//Clock function
timer = setInterval(function() {
  var clock = moment(time).format("HH:mm:ss");
  $("#time").text(clock);
}, 1000);

//On Click, update database
$("#submit-train").on("click", function(event) {
  event.preventDefault();
  //Timestamp we can use for each Input
  //var timeStamp = firebase.database.ServerValue.TIMESTAMP;
  //Assign Variables to Input Values
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train-time").val().trim()
  frequency = $("#frequency").val().trim()
  //Make sure variables have time values for calculation
  moment(firstTrain).format("HH:mm");
  moment(frequency).format("mm");
  //var train = new Date(firstTrain).getTime() / 1000
  //Calculations

  var nextArrival = 0
  //console.log(typeof nextArrival)
  //console.log(typeof time)
  var minutesAway = time - nextArrival;

  //Push to database
  dataRef.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      nextArrival: nextArrival,
      minutesAway: minutesAway,
  })
});
  //Pull from DB
  dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().trainName);
  //Create Rows for Table
  var tableRow = $('<tr>');
  var tableDataString =
  "<td>" + childSnapshot.val().trainName + "</td>" +
  "<td>" + childSnapshot.val().destination + "</td>" +
  "<td>" + childSnapshot.val().frequency + "</td>" +
  "<td>" + 0 + "</td>" +
  "<td>" + 0 + "</td>";
  var trainTable = $("#tableOne");

  //tableRow.attr("id", Date.now());
  tableRow.append(tableDataString);
  trainTable.append(tableRow)
  //Reset form so previous values dissapear
  $("form").trigger("reset");
});
