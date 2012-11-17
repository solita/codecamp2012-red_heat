
var context;

var UserInfo = {
    HitPoints:0,
    fails:0,
    compoCounter: 0,
    multiplier: 1
};

var GameInfo = {
    gameStarted:false,
    currcharIdx:0
};

var Quotes = ["How are you?"];

$("html").keypress(function (e) {
    var typedChar = String.fromCharCode(e.charCode);
    if (GameInfo.gameStarted) {
        if (typedChar == msgType[GameInfo.currcharIdx]) {
            UserInfo.HitPoints++;
            GameInfo.currcharIdx++;
            $("#gametext").append('<span class="correct">'+typedChar+'</span>');
            UserInfo.compoCounter = UserInfo.compoCounter + 1;
            UserInfo.multiplier = Math.floor(UserInfo.compoCounter/3);
            $("#compo").html(UserInfo.compoCounter + " COMPO! (" + UserInfo.multiplier +"x)");
            if(UserInfo.compoCounter > 5) {
                addHeat(10*UserInfo.multiplier);
                $("#compo").show();
            } else  {
                addHeat(10);
            }
        } else {
            $("#gametext").append('<span class="fail">'+typedChar+'</span>');
            UserInfo.HitPoints--;
            failureClip.play();
            UserInfo.multiplier = 0;
            UserInfo.compoCounter = 0;
            $("#compo").hide();
            reduceHeat(5);
        }

        if (GameInfo.currcharIdx == msgType.length) {
            msgType = randomSentence();
            GameInfo.currcharIdx = 0;
        }
    }
});

$(document).ready(function () {
    $("#game").html("<span id='quote' class='quoteIn'>" + Quotes[0] + "</span>");
    beginIt();
    init();

});


function init() {
    context = new webkitAudioContext();
    var analyser = context.createAnalyser();
    var source0;
    failureClip = new Audio();   
    failureClip.src = 'resources/failure.wav';
    failureClip.controls = true;
    failureClip.autoplay = false;
    failureClip.loop = false;

    source0 = context.createMediaElementSource(failureClip);
    source0.connect(analyser);
    analyser.connect(context.destination);
   
}

msg = new Array("Global warming is the rise in the average temperature",
    "Warming of the climate system is unequivocal",
    "Warming and related changes will vary from region to region around the globe",
    "Effects of the warming include a more frequent occurrence of extreme-weather events",
    "Warming is expected to be strongest in the Arctic",
    "Warming of the climate system is unequivocal",
    "Some people think that the warming is because of people burning fossil fuels like coal",
    "Colder areas will warm up faster than warm areas",
    "If the earth's temperature becomes hotter the sea level will also become higher",
    "Warming of the climate system is unequivocal",
    "People in government have talked about global warming",
    "For most of the past 2000 years the temperature didn't change much");

function randomSentence()
{
   var randNum  = Math.floor((Math.random() * 10)) % 4;
   var newMsg = msg[randNum];

    if (GameInfo.gameStarted) {
        $("#gametext").fadeOut(function() {
            $("#gametext").html("");
            $("#gametext").show();
        });
        $("#game2").html("<span id='quoteForRemoval' class='quoteOut'>"+ msgType +"</span>"); //Vanha pois
    }
    $("#game").html("<span id='quote' class='quoteIn'>"+ newMsg +"</span>");
    $("#quote").css("margin-left", "-"+$("#quote").width);

   return  msg[randNum];
}

function beginIt() {

    day = new Date();
    startType = day.getTime();
    msgType = randomSentence();

    GameInfo.gameStarted = true;
    GameInfo.currcharIdx = 0;

    startTiming();
}

