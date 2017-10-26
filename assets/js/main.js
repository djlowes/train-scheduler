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
  //Timestamp we can use for each Input
  //var timeStamp = firebase.database.ServerValue.TIMESTAMP;
  //Assign Variables to Input Values
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTrain = $("#first-train-time").val().trim();
  frequency = $("#frequency").val().trim()
  //Make sure variables have time values for calculation
  var timeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  var minConverted = moment(frequency, "hh:mm").subtract(1, "years");

  var currentTime = moment();
  var inMinutes = moment().diff(moment(timeConverted), "minutes");
  var inMinutes2 = moment().diff(moment(minConverted), "minutes");
  var tRemainder = inMinutes % inMinutes2;
  minutesAway = inMinutes2 - tRemainder;
  nextArrival = moment().add(minutesAway, "minutes");

  //var train = new Date(firstTrain).getTime() / 1000
  //Calculations

  //var nextArrival = new Array(1000 - frequency--);
//  console.log(nextArrival);
  //console.log(typeof nextArrival)
  //console.log(typeof time)

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
