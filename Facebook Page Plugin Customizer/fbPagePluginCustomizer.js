function customizeWidget() {
  verifyInput();
  displayWidget();
}

function verifyInput() {
  var link = document.getElementById("link").value;
  var width = document.getElementById("width").value;
  var length = document.getElementById("length").value;
  if(link === "") {
    link = "https://www.facebook.com/YorkRegionGovt";
  }
  if(width === "" || isNaN(width)) {
    width = 300;
  }
  if(length === "" || isNaN(length)) {
    length = 500;
  }

  createCustomWidget(link, width, length);
}

function createCustomWidget(link, width, length) {
  document.getElementById("fbPage").removeAttribute("data-href");
  document.getElementById("fbPage").setAttribute("data-href", link);
  document.getElementById("fbPage").removeAttribute("data-height");
  document.getElementById("fbPage").setAttribute("data-height", length);
  document.getElementById("fbPage").removeAttribute("data-width");
  document.getElementById("fbPage").setAttribute("data-width", width);

  // Make facebook widget visible
  loadfb(document, 'script', 'facebook-jssdk');
}

function displayWidget() {
  document.getElementById("facebookWidget").className = "";
  document.getElementById("form").className = "displayNone";
}

function previewWidget () {
  verifyInput();
  if(document.getElementById("facebookWidget").className != "") {
    document.getElementById("facebookWidget").className = "";
  }
  else {
    document.getElementById("facebookWidget").className = "displayNone";
  }
}

function loadfb(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
}