// Not 'const' to allow to better browser support
var __SPNS__MIN_WIDTH = 180, __SPNS__MAX_WIDTH = 500, __SPNS__MIN_HEIGHT = 70;
var __SPNS__height, __SPNS__width, __SPNS__link;

function __SPNS__customizeWidget() {
  __SPNS__verifyInput();
  __SPNS__displayWidget();
}

function __SPNS__setPortletPreferences(obj) {
  var temp = obj === null ? null : JSON.stringify(obj);
  console.log("set: ");
  console.log(obj);
  console.log("as: ");
  console.log(temp);
  __SPNS__myspHelper.setPortletPreferences(temp);
}

function __SPNS__init() {
  __SPNS__myspHelper.getPortletPreferences().then(function(prefData) {
    if(!(prefData === undefined || prefData === null)) {
      var prefs = JSON.parse(prefData);
      var link = (prefs === undefined || prefs.link === undefined) ? "https://www.facebook.com/YorkRegionGovt" : prefs.link;
      var width = (prefs === undefined || prefs.width === undefined) ? "300" : prefs.width;
      var height = (prefs === undefined || prefs.height === undefined) ? "500" : prefs.height;
      __SPNS__createCustomWidget(link, width, height);
      __SPNS__displayWidget();
    }
  }, function(error){
    console.error(error);
  });
}

function __SPNS__verifyInput() {
  var link = document.getElementById("__SPNS__link").value;
  var width = document.getElementById("__SPNS__width").value;
  var height = document.getElementById("__SPNS__height").value;

__SPNS__myspHelper.getPortletPreferences().then(function(prefData){
    var prefs = JSON.parse(prefData);
    if(link === null || link == "") {
      link = "https://www.facebook.com/YorkRegionGovt";
    }
    if(width === null || width === "" || isNaN(width)) {
      width = "300";
    }
    if(height === null || height === "" || isNaN(height)) {
      height = "500";
    }
    __SPNS__createCustomWidget(link, width, height);
  }, function(error){
    console.error(error);
  });
}

function __SPNS__createCustomWidget(link, width, height) {
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

  __SPNS__setPortletPreferences({"height" : height, "width" : width, "link" : link});

  // Reload the widget as facebook's page plugin doesn't have dynamic width adjustment
  __SPNS__loadFB(document, 'script', 'facebook-jssdk');
}

function __SPNS__displayWidget() {
  document.getElementById("form__SPNS__").className = "__SPNS__displayNone";
  document.getElementById("overflow__SPNS__").style.display = "block";
  document.getElementById("customize__SPNS__").style.display = "block";
}

function __SPNS__openCustomization() {
  __SPNS__myspHelper.getPortletPreferences().then(function(prefData){
    var prefs = JSON.parse(prefData);
    console.log("openCustomization: " + prefs);
    document.getElementById("__SPNS__link").value = (prefs === undefined || prefs.link === undefined || prefs.link === "https://www.facebook.com/YorkRegionGovt") ? null : prefs.link;
    document.getElementById("__SPNS__height").value = (prefs === undefined || prefs.height === undefined || prefs.height === "500") ? null : prefs.height;
    document.getElementById("__SPNS__width").value = (prefs === undefined || prefs.width === undefined || prefs.width === "300") ? null : prefs.width;
    document.getElementById("form__SPNS__").className = "";
    document.getElementById("overflow__SPNS__").style.display = "none";
    document.getElementById("customize__SPNS__").style.display = "none";
  }, function(error){
    console.error(error);
  });
}

function __SPNS__toggleWidget() {
  console.log(document.getElementById("overflow__SPNS__").style.display);
  if(document.getElementById("overflow__SPNS__").style.display !== "block") {
    __SPNS__verifyInput();
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

function __SPNS__loadFB(d, s, id) {
  // Reloads the widget with the new width / height if it already exists
  if (d.getElementById(id)) {
     FB.XFBML.parse();
  }

  // Facebook-provided code to initialize widget
  var js, fjs = d.getElementsByTagName(s)[0];
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}