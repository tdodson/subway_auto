// Language Select
var language = "English";

$('#en').on('click', function() {
    language = "English"; // no 'var'; variable must be global in scope
});

$('#ja').on('click', function() {
    language = "Japanese"; // no 'var'; variable must be global in scope
});

// Original Javascript function for language switching; replaced with JQuery.
/*
function toggleEnglish() {
    language = "English"; // no 'var'; variable must be global in scope
}
function toggleJapanese() {
    language = "Japanese"; // no 'var'; variable must be global in scope
}
var textEn = document.getElementById('en');
var textJa = document.getElementById('ja');
textEn.onclick = toggleEnglish;
textJa.onclick = toggleJapanese; */

var i = 0;
var ut = "some utterance";
var linenumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "29", "30", "31", "32", "33"];

// Japanese
var door = ["ドア", "窓", "天井", "床", "電車", "地下鉄", "ホーム", "群衆", "トンネル", "駅長", "線路", "再終電車", "特急", "快速", "各駅停車"];
var verb = ["閉まります", "開きます", "動きます", "始まります", "集まります", "痛みます", "笑います", "冷めます", "起きます", "見えます", "咲きます", "倒れます", "浮かびます", "話せます", "壊れます", "聞いています", "見ています", "参ります", "止まります", "通過します", "出発します"];
var order = ["遠慮", "返事", "容赦", "連絡", "笑納", "説明", "検討", "用意", "用心", "質問", "教授", "自愛", "確認", "静聴", "出席", "安心", "査収", "同伴", "理解", "期待", "利用", "準備", "返却", "強力", "猶予", "放念", "入場"];
// End Japanese

// English
var door_en = ["The doors are ", "The windows are ", "The ceiling is ", "The train is ", "The subway is ", "The line is ", "The crowds are ", "The tunnel is ", "The stationmaster is ", "The track is ", "The last train is ", "The rapid train is ", "The express train is ", "The local train is "];
var verb_en = ["closing", "opening", "moving", "beginning", "gathering", "hurting", "laughing", "getting cold", "awakening", "visible", "blooming", "falling", "floating", "speaking", "coming to a stop", "passing through", "departing", "breaking", "listening", "watching", "arriving"];
var order_en = ["restrain yourself", "answer", "forgive us", "contact us", "accept this", "explain", "investigate", "prepare yourself", "beware", "question this", "instruct us", "take care of yourself", "confirm", "listen", "participate", "be calm", "cooperate", "understand", "use freely", "get ready", "give it back", "give us some time", "relax", "enter"];
// End English

// Function 'rand_range' generates a random number between 0 and the length of a given array. The Math.random function returns a number with its maximum value set by (max+1). The max parameter as applied in this script ends up being = (length of the door, verb, or order array) -2. The +1 is then added to the length. [e.g., slot (12-2 = 10) is given as the a param to rand_range, which transforms it to a value between 0.001 * 10, say, or 0.999 * 10. One is added to the max = 11. The result will be no larger than ~11.999999, which Math.floor drops to 11. The largest number returned will be 11.). Also avoids a case in which an array with only one item. Math.floor then rounds down the number to the nearest integer, essentially throwing away any decimal values. May not be truly 'random' but will generate a number within the desired range.

function rand_range(max) {
    return Math.floor(Math.random() * (max + 1));
}

// Function 'fresh' populates its parameter "array" with one of the other arrays( e.g., fresh(verb) ). It then applies rand_rage to that array, with it's length -2 as the max (see above). The random number returned by rand_range, will be, at most, array.length -1. Thus, +1 is added (a 0 results in -1, which is brought back up to 0 by the +1). Thus, the value of index = a number between 0 and array.length. 'Selection' is then set to the string corresponding to the slot in the array specified by the number (i.e., var index), array[index]. This string, array[index], is placed in an array at position 0. This is then converted to the variable "selection," which is retruned by the function.

function fresh(array) {
    var index = rand_range(array.length - 2) + 1,
        selection = array[index];
    array[index] = array[0];
    array[0] = selection;
    return selection;
} // end fresh

function story() {
    if (language === "English") {
        // Variable 'ut' (declared globally) builds up the utterance/text by running 'fresh' on each of the arrays and putting concatenating them into a sentence.
        ut = fresh(door_en) + fresh(verb_en) + " on Platform " + fresh(linenumber) + ". Please " + fresh(order_en) + ".";
    } else {
        ut = fresh(linenumber) + "番線、" + fresh(door) + "が" + fresh(verb) + "。ご" + fresh(order) + "ください。";
    }
    // Places the text into 'last', the div just created. Then adds the new div after the 'main' div. Note: the new div does not have an id.

    // If "i" is less than or equal to twelve, increment it. If it is 13 or greater, stop incrementing and remove the first child of 'main.'
    var main = document.getElementById('main');
    if (i <= 9) {
        i += 1;
    } else {
        main.removeChild(document.getElementById('main').firstChild);
    }
    // Create a new div and add a break tag to it.
    last = document.createElement('div');
    last.appendChild(document.createElement('br'));

    last.appendChild(document.createTextNode(ut));

    main.appendChild(last);

    // Voice Code
    // Voices: http://stackoverflow.com/questions/17224540/web-speech-api-speech-synthesis-getting-voice-list && https://output.jsbin.com/vayiti/latest
    try {
        if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) { // Checks to see if browser can run speech synthesis
            var msg = new SpeechSynthesisUtterance();
            msg.text = ut;

            if (language == "English") {
                msg.voiceURI = "GB voice";
                msg.voice = voices.filter(function(voice) {
                    return voice.lang == "en-GB"; })[0];
                // msg.lang = "en_US";
            } else {
                msg.voiceURI = "JP voice";
                msg.voice = voices.filter(function(voice) {
                    return voice.lang == "ja-JP"; })[0];
            }
            msg.volume = 1; // 0 to 1
            msg.rate = 1; // 0.1 to 10
            msg.pitch = 1; //0 to 2
            // Only speak if the voice selected above actually exist.
            if (msg.voice !== null) {
              speechSynthesis.speak(msg);
            }
        } // End if speechSynthesis
    } // End try
    catch (err) {} // Discard errors, speech synth is optional
} // end story

// Fix for Chrome since it loads voices asynchronously and will otherwise load default local "Alex" voice for first line if this is not set before produce_stories() is called.
window.speechSynthesis.onvoiceschanged = function(e) {
    voices = speechSynthesis.getVoices();
};


// Calls the story() function every 8 seconds.
function produce_stories() {
    story();
    setInterval(story, 8000);
}

// Runs produce_stories() on page load.
// window.onload = produce_stories();