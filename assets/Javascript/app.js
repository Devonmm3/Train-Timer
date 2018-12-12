//first step is to initialize the firebase with a configuration var

var config = {
  apiKey: "AIzaSyB79iq-Q8CWdEOMG1A73k24xFr--ZCSMCQ",
  authDomain: "train-homework-460dc.firebaseapp.com",
  databaseURL: "https://train-homework-460dc.firebaseio.com",
  projectId: "train-homework-460dc",
  storageBucket: "train-homework-460dc",
  messagingSenderId: "54122609132"
};
firebase.initializeApp(config);
var database = firebase.database();

//need a button for adding the train
$("#addTrainButton").on("click", function(event) {
  event.preventDefault();

  var trainsName = $("#trainsNameInput")
    .val()
    .trim();
  var trainsLine = $("#trainsLineInput")
    .val()
    .trim();
  var Destination = $("#trainsDestinationInput")
    .val()
    .trim();
  var trainTimeInput = moment(
    $("#trainTimeInput")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(1, "years")
    .format("");
  var trainFrequencyInput = $("#trainsFrequencyInput")
    .val()
    .trim();

  console.log(trainsName);
  console.log(trainsLine);
  console.log(Destination);
  console.log(trainTimeInput);
  console.log(trainFrequencyInput);

  var newTrain = {
    name: trainsName,
    line: trainsLine,
    Destination: Destination,
    start: trainTimeInput,
    frequency: trainFrequencyInput
  };

  database.ref().push(newTrain);

  $("#trainsNameInput").val("");
  $("#trainsLineInput").val("");
  $("#trainsDestinationInput").val("");
  $("#trainTimeInput").val("");
  $("#trainFrequencyInput").val("");

  return false;
});

//need a firebase add of the train to the database that then reflects in the HTML
database.ref().on("child_added", function(childSnapshot, previousChildKey) {
  console.log(childSnapshot.val());

  var FirebaseTrainsName = childSnapshot.val().name;
  var FirebaseTrainsLine = childSnapshot.val().line;
  var FirebaseDestination = childSnapshot.val().Destination;
  var firebaseTrainTimeInput = childSnapshot.val().start;
  var firebaseTrainFrequency = childSnapshot.val().frequency;

  var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
  var remainder = diffTime % firebaseTrainFrequency;
  var minutes = firebaseTrainFrequency - remainder;

  var nextTrain = moment()
    .add(minutes, "m")
    .format("hh:mm A");

  console.log(minutes);
  console.log(nextTrain);
  console.log(moment().format("hh:mm A"));
  console.log(nextTrain);
  console.log(moment().format("X"));

  $("#trainTable > tbody").append(
    "<tr><td>" +
      FirebaseTrainsName +
      "</td><td>" +
      FirebaseTrainsLine +
      "</td><td>" +
      FirebaseDestination +
      "</td><td>" +
      firebaseTrainFrequency +
      "</td><td>" +
      "mins" +
      "</td><td>" +
      nextTrain +
      "</td><td>" +
      minutes +
      "</td></tr"
  );
});
