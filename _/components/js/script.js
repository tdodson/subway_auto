
// Voice Code
var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices.filter(function(voice) { return voice.name == 'Google 日本人'; })[0];
msg.voiceURI = "Google 日本人";
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 1; //0 to 2
msg.text = 'Hello World';
// msg.lang = 'en-US';
msg.lang = 'ja-JP';


function talk() {
	speechSynthesis.speak(msg);
}

var t=0;
var linenumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "29", "30", "31", "32", "33"];

/*
// English
var door = ["The doors are ", "The windows are ", "The ceiling is ", "The train is ", "The subway is ", "The line is ", "The crowds are ", "The tunnel is ", "The stationmaster is ", "The track is ", "The last train is ", "The rapid train is ", "The express train is ", "The local train is "];
var verb = ["closing", "opening", "moving", "beginning", "gathering", "hurting", "laughing", "getting cold", "awakening", "visible", "blooming", "falling", "floating", "speaking", "breaking", "listening", "watching", "arriving"];
var order = ["restrain yourself", "answer", "forgive us", "contact us", "accept this", "explain", "investigate", "prepare yourself", "beware", "question this", "instruct us", "take care of yourself", "confirm", "listen", "participate", "be calm", "cooperate", "understand", "use freely", "get ready", "give it back", "give us some time", "relax", "enter"];
// End English
*/

// Japanese
var door = ["ドア", "窓", "天井", "床", "電車", "地下鉄", "ホーム", "群衆", "トンネル", "駅長", "線路", "再終電車", "特急", "快速", "各駅停車"];
var verb = ["閉まります", "開きます", "動きます", "始まります", "集まります", "痛みます", "笑います", "冷めます", "起きます", "見えます", "咲きます", "倒れます", "浮かびます", "話せます", "壊れます", "聞いています", "見ています", "参ります"];
var order = ["遠慮", "返事", "容赦", "連絡", "笑納", "説明", "検討", "用意", "用心", "質問", "教授", "自愛", "確認", "静聴", "出席", "安心", "査収", "同伴", "理解", "期待", "利用", "準備", "返却", "強力", "猶予", "放念", "入場"];
// End Japanese

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
 var ut_en = fresh(door) + fresh(verb) + " on Platform " + fresh(linenumber) + ". Please " + fresh(order) + ".";
 var ut_ja = fresh(linenumber) + "番線、" + fresh(door) + "が" + fresh(verb) + "。ご" + fresh(order) + "ください。";

 /*
 // English Text
 last.appendChild(document.createTextNode(ut_en));
 */	

 // Japanese Text
 last.appendChild(document.createTextNode(ut_ja));

 main.appendChild(last);

 	/*
	// English Speech
	msg.text = ut_en;
	*/

	// Japanese Speech
	msg.text = ut_ja;

 speechSynthesis.speak(msg);
}
function produce_stories() {
 story();
 setInterval(story, 8000);
}

window.onload = produce_stories();

// Voices: http://stackoverflow.com/questions/17224540/web-speech-api-speech-synthesis-getting-voice-list