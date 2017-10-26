//Firebase Config
var config = {
    apiKey: "AIzaSyAskmrWwU6cDbIMZPdKQsYTPdzHiyNSULM",
    authDomain: "train-timetable-552b5.firebaseapp.com",
    databaseURL: "https://train-timetable-552b5.firebaseio.com",
    projectId: "train-timetable-552b5",
    storageBucket: "train-timetable-552b5.appspot.com",
    messagingSenderId: "686010964636"
  };
firebase.initializeApp(config);
var dataRef = firebase.database();

//Clock function
timer = setInterval(function() {
  let time = moment();
  var clock = moment(time).format("HH:mm:ss");
  $("#time").text(clock);
}, 1000);

//On Click, update database
$("#submit-train").on("click", function(event) {
  event.preventDefault();
  //Assign Variables to Input Values
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train-time").val().trim();
  frequency = $("#frequency").val().trim()
  //Calculations
  var timeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
  console.log(timeConverted);
  let time = moment();
  console.log(time);
  var diffTime = moment(time).diff(moment(timeConverted), "minutes");
  console.log("Time difference in mins = " + diffTime);
  var tRemainder = diffTime % frequency;
  console.log("Leftover mins = " + tRemainder);
  var minutesAway = frequency - tRemainder;
  console.log("Next train in mins = " + minutesAway);
  var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
  console.log("Next arrivan in mins = " + nextArrival)
  console.log("first train = " + firstTrain)
  //Push to DB from click
  dataRef.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      nextArrival: nextArrival,
      minutesAway: minutesAway,
  })
});

  //Pull from DB to display inputs and calculations
  dataRef.ref().on("child_added", function(childSnapshot) {
  //Create Rows for Table
  var tableRow = $('<tr>');
  //Assign ID for style
  $(tableRow).attr("id", "tableRow");
  var tableDataString =
  "<td>" + childSnapshot.val().trainName + "</td>" +
  "<td>" + childSnapshot.val().destination + "</td>" +
  "<td>" + childSnapshot.val().frequency + "</td>" +
  "<td>" + childSnapshot.val().nextArrival + "</td>" +
  "<td>" + childSnapshot.val().minutesAway + "</td>";
  var trainTable = $("#tableOne");
  tableRow.append(tableDataString);
  trainTable.append(tableRow);
  //Reset form so previous values dissapear
  $("form").trigger("reset");
});
