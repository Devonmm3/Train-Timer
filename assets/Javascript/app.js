//first step is to initialize the firebase with a configuration var

var config = {
    apiKey: "AIzaSyB79iq-Q8CWdEOMG1A73k24xFr--ZCSMCQ",
    authDomain: "train-homework-460dc.firebaseapp.com",
    databaseURL: "https://train-homework-460dc.firebaseio.com",
    projectId: "train-homework-460dc",
    storageBucket: "",
    messagingSenderId: "54122609132"
};
firebase.initializeApp(config);


var trainsName = $("#trainsNameInput").val().trim()
var trainsLine = $("#trainsLineInput").val().trim()
var Destination = $("#trainsDestinationInput").val().trim()
var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(1, "years").format("");
var trainFrequencyInput = $("#trainsFrequecyInput").val().trim();

var newTrain = {
    name: trainsName,
    line: trainsLine,
    Destination: Destination,
    start: trainTimeInput,
    frequency: trainFrequencyInput


};