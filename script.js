var vid;
var mmkay = new Audio('mmk.mp3');

function insert()
{
  vid = document.getElementById("vidToWard").value

  console.log(vid);

  if(vid.includes("https://www.youtube.com/watch?v="))
  {
    console.log("THIS SHOULD WORK");
    vid = vid.replace("https://www.youtube.com/watch?v=", "");
  }
  else if(vid.includes("https://youtu.be/"))
  {
    vid = vid.replace("https://youtu.be/", "");
  }

  $("input").css("display", "none");
  // $("img").css("display", "block");

  vid = vid.slice(0,11);

  genPlayer();
  letsGo();

}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player;
function genPlayer() {
  player = new YT.Player('player', {
    height: 500,
    width: 888,
    videoId: vid,
    playerVars: { 'autoplay': 1, 'controls': 0 },
    events: {
      'onReady': onPlayerReady,
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function letsGo()
{
  console.log("LETS GO");
  $("")
  var delay = getRandomInt(5000,15000);
  setTimeout(paulWard, delay);
}

function paulWard()
{
  animateDiv();
  $("img").css("display", "block");
  mmkay.play();
  player.pauseVideo();
  setTimeout(unPaulWard, 2000);
}

function unPaulWard()
{
  $("img").css("display", "none");
  player.playVideo();
  letsGo();
}

function makeNewPosition()
{
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - 1000;
  var w = $(window).width() - 1000;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh,nw];

}


function animateDiv()
{

  var newq = makeNewPosition();
  var oldq = $('.majestic').offset();

  var speed = calcSpeed([oldq.top, oldq.left], newq);

  $('.majestic').animate({ top: newq[0], left: newq[1] }, speed, function()
  {
      animateDiv();
    });

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 5;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;
}
