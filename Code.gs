///https://youtu.be/5f7wCeD4gB4
// doPost needs the spreadsheet ID, it has no concept of "active spreadsheet".

var ss = SpreadsheetApp.openById('####################################');
//var sheet = ss.getSheetByName('Esp8266 trends');  
var sheet = ss.getSheetByName('#######################3');

function doPost(e) {
  var val = e.parameter.value;
  
  if (e.parameter.value !== undefined){
    var range = sheet.getRange('A2');
    range.setValue(val);
  }
}

function doGet(e){
  var val = e.parameter.value;
  var cal = e.parameter.cal;
  var read = e.parameter.read;
  
  if (cal !== undefined){
    return ContentService.createTextOutput(GetEventsOneWeek());
  }
  
  if (read !== undefined){
    return ContentService.createTextOutput(sheet.getRange('C2').getValue());
  }
  
  if (e.parameter.value === undefined)
    return ContentService.createTextOutput("No value passed as argument to script Url.");
    
    
    
    
  var range = sheet.getRange('A2');
  var retval = range.setValue(val).getValue();
  
   //var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    //newRange.setValues([rowData]);
  
  
  
  if (retval == e.parameter.value)
    return ContentService.createTextOutput("Successfully wrote: " + e.parameter.value + "\ninto spreadsheet.");
  else
    return ContentService.createTextOutput("Unable to write into spreadsheet.\nCheck authentication and make sure the cursor is not on cell 'A2'." + retval + ' ' + e.parameter.value);
}


function GetEventsOneWeek(){
  var Cal = CalendarApp.getCalendarsByName('PDAControl')[0];
  // Need to create 2 separate Date() objects. Cannot do 'OneWeekFromNow = Nowjs' to 
  // simply get it's value and use that later without modifying 'Now'
  // since in JS, an object is automatically passed by reference
  var Now = new Date();
  var OneWeekFromNow = new Date();
  OneWeekFromNow.setDate(Now.getDate() + 7);
  //Logger.log(Now);
  //Logger.log(OneWeekFromNow);
  var events = Cal.getEvents(Now, OneWeekFromNow);
  //Logger.log(events.length);
  var str = '\nEvent Title,\tDescription,\tRecurring?,\tAll-day?,\tFirst Reminder (in minutes before event)\n';
  for (var i = 0; i < events.length; i++){
    str += events[i].getTitle() + ',\t' + events[i].getDescription() + ',\t' + events[i].isRecurringEvent() +  ',\t' + events[i].isAllDayEvent() + ',\t' + events[i].getPopupReminders()[0];
    str += '\n';
  }
  //Logger.log(str);
  return str;
}
