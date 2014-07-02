var t=0;
var linenumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "29", "30", "31", "32", "33"];
var door = ["The doors are ", "The windows are ", "The ceiling is ", "The train is ", "The subway is ", "The line is ", "The crowds are ", "The tunnel is ", "The stationmaster is ", "The track is ", "The last train is ", "The rapid train is ", "The express train is ", "The local train is "];
var verb = ["closing", "opening", "moving", "beginning", "gathering", "hurting", "laughing", "getting cold", "awakening", "visible", "blooming", "falling", "floating", "speaking", "breaking", "listening", "watching", "arriving"];
var order = ["restrain yourself", "answer", "forgive us", "contact us", "accept this", "explain", "investigate", "prepare yourself", "beware", "question this", "instruct us", "take care of yourself", "confirm", "listen", "participate", "be calm", "cooperate", "understand", "use freely", "get ready", "give it back", "give us some time", "relax", "enter"];
function rand_range(max) {
 return Math.floor(Math.random()*(max+1));
}
function fresh(array) { 
 var index = rand_range(array.length - 2) + 1, selection = array[index];
 array[index] = array[0];
 array[0] = selection;
 return selection;
}
function story() {
 var main=document.getElementById('main');
 if (t<=12) {
  t+=1;
 } else {
  main.removeChild(document.getElementById('main').firstChild);
 }
 last=document.createElement('div');
 last.appendChild(document.createElement('br'));
 var lede = fresh(door) + fresh(verb) + " on Platform " + fresh(linenumber) + ". Please " + fresh(order) + ".";

 last.appendChild(document.createTextNode(lede));
 main.appendChild(last);
}
function produce_stories() {
 story();
 setInterval(story, 2000);
}

window.onload = produce_stories();