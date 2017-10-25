timer = setInterval(function() {
var time = Date.now();
var clock = moment(time).format("HH:mm:ss");
$("#time").text(clock);
}, 1000);


$("#submit-train").on("click", function(event) {
  event.preventDefault();
  //Assign Variables to Input Values
  var trainName = $("#train-name").val().trim();
  var destination= $("#destination").val().trim();
  var firstTrain = $("#first-train-time").val().trim();
  var frequency = $("#frequency").val().trim();
  //Table Assignment
  var tableRow = $('<tr>');
  var tableDataString = "<td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" + "<td>" + 0 + "</td>" + "<td>" + 0 + "</td>";
  var trainTable = $("#tableOne");
  //Calculations

  //Append to Table
  tableRow.attr("id", Date.now());
  tableRow.append(tableDataString);
  trainTable.append(tableRow)

  //Reset form so previous values dissapear
  $("form").trigger("reset");
});
