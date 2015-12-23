// Not 'const' to allow to better browser support
var __SPNS__MIN_WIDTH = 180, __SPNS__MAX_WIDTH = 500, __SPNS__MIN_HEIGHT = 70;
var __SPNS__height, __SPNS__width, __SPNS__link;

function __SPNS__customizeWidget() {
  verifyInput();
  __SPNS__displayWidget();
}

function verifyInput() {
  var link = document.getElementById("__SPNS__link").value;
  var width = document.getElementById("__SPNS__width").value;
  var height = document.getElementById("__SPNS__height").value;
  if(link === "" || link === null) {
    link = "https://www.facebook.com/YorkRegionGovt";
  }
  if(width === null || width === "" || isNaN(width)) {
    width = "300";
  }
  if(height === null || height === "" || isNaN(height)) {
    height = "500";
  }
  createCustomWidget(link, width, height);
  //loadFB(document, 'script', 'facebook-jssdk');
}

function createCustomWidget(link, width, height) {
  // This prevents the container div from becoming larger than the widget
  if (width > __SPNS__MAX_WIDTH) {
    width = __SPNS__MAX_WIDTH;
  }
  document.getElementById("fbPage").removeAttribute("data-href");
  document.getElementById("fbPage").setAttribute("data-href", link);
  document.getElementById("fbPage").removeAttribute("data-height");
  document.getElementById("fbPage").removeAttribute("data-width");
  // Checks here to adhere to facebook's minimum width / height policies
  document.getElementById("fbPage").setAttribute("data-height", height < __SPNS__MIN_HEIGHT ? __SPNS__MIN_HEIGHT : height);
  document.getElementById("fbPage").setAttribute("data-width", width < __SPNS__MIN_WIDTH ? __SPNS__MIN_WIDTH : width);

  document.getElementById("facebookWidget__SPNS__").style.width = width + "px";
  document.getElementById("facebookWidget__SPNS__").style.height = height + "px";

// Save the values for later use
  __SPNS__height = height;
  __SPNS__width = width;
  __SPNS__link = link;

  loadFB(document, 'script', 'facebook-jssdk');
}

function __SPNS__displayWidget() {
  document.getElementById("form").className = "displayNone";
  document.getElementById("overflow__SPNS__").style.display = "block";
  document.getElementById("customize__SPNS__").style.display = "block";
}

function __SPNS__openCustomization() {
  document.getElementById("__SPNS__link").value = __SPNS__link === "https://www.facebook.com/YorkRegionGovt" ? null : __SPNS__link;
  document.getElementById("__SPNS__height").value = __SPNS__height === "500" ? null : __SPNS__height;
  document.getElementById("__SPNS__width").value = __SPNS__width === "300" ? null : __SPNS__width;
  document.getElementById("form").className = "";
  document.getElementById("overflow__SPNS__").style.display = "none";
  document.getElementById("customize__SPNS__").style.display = "none";
}

function toggleWidget() {
  console.log(document.getElementById("overflow__SPNS__").style.display);
  if(document.getElementById("overflow__SPNS__").style.display !== "block") {
    verifyInput();
    document.getElementById("overflow__SPNS__").style.display = "block";
    document.getElementById("__SPNS__preview-button").innerHTML = "Close Preview";
    console.log("entered1: " + document.getElementById("overflow__SPNS__").style.display);
  }
  else {
    document.getElementById("overflow__SPNS__").style.display = "none";
    document.getElementById("__SPNS__preview-button").innerHTML = "Preview Widget";
    console.log("entered2: " + document.getElementById("overflow__SPNS__").style.display);
  }
}

function loadFB(d, s, id) {
  console.log(d + " , " + s + ", " + id);
  var js, fjs = d.getElementsByTagName(s)[0];

  // Reloads the widget with the new width / height if ti already exists
  if (d.getElementById(id)) {
     FB.XFBML.parse();
  }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}