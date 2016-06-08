function parseForMinAndMax(text){
  var rangeRegex = /\d+-\d+/g;
  var numberRegex = /\d+/g;

  var min,max = 0;

  // if has a range match
  var rangeMatch = text.match(rangeRegex);
  if (rangeMatch){
    var matchedText = rangeMatch[0];
    var divider = matchedText.indexOf("-");
    // parse for min as number
    var minValue = matchedText.substring(0,divider);
    min = parseInt(minValue);

    // parse for max as number
    var maxValue = matchedText.substring(divider+1); 
    max = parseInt(maxValue);

  } else {
    // check to see if it is a single number
    var numberMatch = text.match(numberRegex);
    if (numberMatch){
      min = parseInt(numberMatch);
      max = parseInt(numberMatch);
    }
  }
 
  return {"min": min, "max": max};
}

function sumTimes(times) {
  // sum up all of the min and max times
  var minTotal = 0;
  var maxTotal = 0;

  var index;
  for (index = 0; index < times.length; index++) {
    minTotal += times[index].min;
  }

  for (index = 0; index < times.length; index++) {
    maxTotal += times[index].max;
  }

  return {"min": minTotal, "max": maxTotal};
}

function generateMessage(result){
  var min = result.min;
  var max = result.max;

  if (min == max){
    // there is no range so return a single value
    return 'The duration will be '+ min +' mins.';
  }

  return 'The duration will be between '+ min +'-'+ max +' mins.';
}

function getTimes(text) {
  var rangeRegex = /\d+-\d+\s?mins/gi;
  var singleRegex = /\[\d+\s?mins/gi;
  
  // Parse body text for all of the instances of Time[X - Ymins]
  var timesText = [];
  
  var m;
  while (m = rangeRegex.exec(text)) {
    // Get the text that matched
    timesText.push(m[0]);
  }

  while (m = singleRegex.exec(text)) {
    timesText.push(m[0].substring(1));
  }

  return timesText;
}

function getTimeValues(timeTexts){
  // Iterate and extract the max and min for all of the time texts
  var times = [];

  var index;
  for (index = 0; index < timeTexts.length; index++) {
    var value = parseForMinAndMax(timeTexts[index]);
    times.push(value);
  }

  return times;
}

function showAlert(title, message) {
  var ui = DocumentApp.getUi(); 

  // assumption that times is always in minutes
  var result = ui.alert(
      title,
      message,
      ui.ButtonSet.OK);
}

function calculateTime(){
  var body = DocumentApp.getActiveDocument().getBody();  
  var bodyText = body.getText();

  var times = getTimes(bodyText);
  var timeValues = getTimeValues(times);
  var result = sumTimes(timeValues);
  var message = generateMessage(result);

  showAlert("Time Check", message);
}

function onInstall() {
  onOpen();
}

function onOpen() {
  var menu = DocumentApp.getUi().createAddonMenu(); 

  // Add a normal menu item (works in all authorization modes).
  menu.addItem('Get total duration', 'calculateTime');  

  menu.addToUi();
}
