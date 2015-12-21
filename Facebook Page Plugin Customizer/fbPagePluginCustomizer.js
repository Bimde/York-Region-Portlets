function __SPNS__customizeWidget()
{
  var page = document.getElementById("link").value;
  var width = document.getElementById("width").value;
  var length = document.getElementById("length").value;
  __SPNS__verifyInput(page, width, length);
}

function __SPNS__verifyInput(link, width, length)
{
  if(link == "") {
    link = "https://www.facebook.com/YorkRegionGovt";
  }
  if(width == "" || isNaN(width)) {
    width = 300;
  }
  if(length == "" || isNaN(length)) {
    length = 500;
  }  
  __SPNS__createCustomWidget(link, width, length);
}

function __SPNS__createCustomWidget(link, width, length)
{  
  // chnage data to specified values
  document.getElementById("fbPage").removeAttribute("data-href");
  document.getElementById("fbPage").setAttribute("data-href", link);
  document.getElementById("fbPage").removeAttribute("data-height");
  document.getElementById("fbPage").setAttribute("data-height", length);
  document.getElementById("fbPage").removeAttribute("data-width");
  document.getElementById("fbPage").setAttribute("data-width", width);
  
  // Make facebook widget visible
  document.getElementById("facebookWidget").className = "";
  document.getElementById("form").className = "displayNone";
}

function __SPNS__previewWidget ()
{
  if(document.getElementById("facebookWidget").className != "") {
    document.getElementById("facebookWidget").className = "";
  }
  else {
    document.getElementById("facebookWidget").className = "displayNone";
  }
}

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');