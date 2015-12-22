function customizeWidget() {
  verifyInput();
  displayWidget();
}

function verifyInput() {
  var link = document.getElementById("link").value;
  var width = document.getElementById("width").value;
  var length = document.getElementById("length").value;
  if(link === "" || link === null) {
    link = "https://www.facebook.com/YorkRegionGovt";
  }
  if(width === null || width === "" || isNaN(width)) {
    width = 300;
  }
  if(length === null || length === "" || isNaN(length)) {
    length = 500;
  }
  createCustomWidget(link, width, length);
}

function createCustomWidget(link, width, height) {
  document.getElementById("fbPage").removeAttribute("data-href");
  document.getElementById("fbPage").setAttribute("data-href", link);
  document.getElementById("fbPage").removeAttribute("data-height");
  document.getElementById("fbPage").setAttribute("data-height", height);
  document.getElementById("fbPage").removeAttribute("data-width");
  document.getElementById("fbPage").setAttribute("data-width", width);
  loadfb(document, 'script', 'facebook-jssdk');
}

function displayWidget() {
  document.getElementById("form").className = "displayNone";
  document.getElementById("facebookWidget__SPNS__").className = "";
}

function previewWidget () {
  verifyInput();
  if(document.getElementById("facebookWidget__SPNS__").className !== "") {
    document.getElementById("facebookWidget__SPNS__").className = "";
    document.getElementById("__SPNS__preview-button").innerHTML = "Close Preview";
  }
  else {
    document.getElementById("facebookWidget__SPNS__").className = "displayNone";
    document.getElementById("__SPNS__preview-button").innerHTML = "Preview Widget";
  }
}

function loadfb(d, s, id) {
  console.log(d + " , " + s + ", " + id);
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}