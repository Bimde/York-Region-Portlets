function __SPNS__appendResults(text) {
    var results = document.getElementById('results');
    results.appendChild(document.createElement('P'));
    results.appendChild(document.createTextNode(text));
}

function __SPNS__makeRequest() {
    var request = gapi.client.urlshortener.url.get({
        'shortUrl': 'http://goo.gl/fbsS'
    });
    request.then(function(response) {
        appendResults(response.result.longUrl);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}

function __SPNS__init() {
    gapi.client.setApiKey('AIzaSyBDJKTF_mYHQUsr-bnRocRUq5DX3sSQ7wQ');
    gapi.client.load('urlshortener', 'v1').then(makeRequest);
}

function __SPNS__getLatestVideo () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCFxY4DNdnKNRh0rUyf__gFw&maxResults=1&order=date&fields=items%2Fid&key=AIzaSyBDJKTF_mYHQUsr-bnRocRUq5DX3sSQ7wQ", false);
    xhr.send();
    myText = xhr.response;
    myText = JSON.parse(myText);
    myText = myText.items[0].id.videoId;
    __SPNS__loadVideo();
}

function __SPNS__loadVideo() {
    document.getElementById("results").style.display = "none";
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;
    done = false;
}

// Play video for 3 seconds as a 'peak' into the video
function __SPNS__onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(__SPNS__stopVideo, 3000);
        done = true;
    }
}

function __SPNS__onPlayerReady(event) {
    event.target.playVideo();
}

function __SPNS__stopVideo() {
    player.stopVideo();
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '216',
        width: '384',
        videoId: myText,
        events: {
            'onReady': __SPNS__onPlayerReady,
            'onStateChange': __SPNS__onPlayerStateChange
        }
    });
}
window.onload = __SPNS__getLatestVideo();