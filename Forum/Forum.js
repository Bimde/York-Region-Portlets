<script>

var __SPNS__cache = [Plugin:Portlet key="sharedForumPortletKey" compute="once"]spHelper;

// Using '__SPNS__' as a variable prefix / postfix results in the 'Web Content Manager
// ScriptPortletNamespace plug-in' on WebShere automatically replacing in with a portlet
// specific namespace, allowing for the variable names in each portlet to not interfere
var __SPNS__HOME = "__SPNS__home";
var __SPNS__QUESTION_VIEW = "__SPNS__question-view";
var __SPNS__ASK_QUESTION = "__SPNS__ask-question";

function __SPNS__loadForumQuestionsData() {
  __SPNS__loadHomePanel();
  __SPNS__switchPanel(__SPNS__HOME);
}

/**
* Loads up the main panel with all of the currently active questions
*/
function __SPNS__loadHomePanel() {
  __SPNS__cache.getPortletPreference().then(function(forumPortletCacheData) {

  }, function(error) {
      console.log("error in loadHomePanel");
  });
  if(forumPortletCacheData) {
      forumPortletCacheData = JSON.parse(forumPortletCacheData);
  } else {
      forumPortletCacheData = {"questions":[]};
      __SPNS__saveCurrentState(forumPortletCacheData);
  }
  var array = forumPortletCacheData.questions;
  for(var i = 0; i < array.length; i ++) {
      var li = document.createElement("LI");
      var header = document.createElement("H4");
      var content = document.createElement("P");

      var textNode = document.createTextNode(array[i].text);
      content.appendChild(textNode);

      textNode = document.createTextNode(array[i].title);
      header.appendChild(textNode);

      li.appendChild(header);
      li.appendChild(content);
      li.setAttribute("class", "__SPNS__item");
      li.setAttribute("id", "__SPNS__questionNumber"+i);
      li.setAttribute("index", i+"");
      li.setAttribute("oncontextmenu", "__SPNS__removeQuestion(this)")

      var list = document.getElementById("__SPNS__itemList");
      list.appendChild(li);
  }
}

/**
* Adds the data to the local questions array and saves the
* data to the cache using 'JSON.stringify()'
*/
function __SPNS__writeToCache(title, text) {
  var forumPortletCacheData = localStorage.getItem(__SPNS__FORUM_PORTLET_CACHE_LOCATION);
  if(forumPortletCacheData) {
      forumPortletCacheData = JSON.parse(forumPortletCacheData);
  } else {
      forumPortletCacheData = {"questions":[]};
  }
  forumPortletCacheData.questions[forumPortletCacheData.questions.length] = {"title":title, "text":text, "responses":[]};
  __SPNS__saveCurrentState(forumPortletCacheData);
}

function __SPNS__deleteFromCache(index) {
  var forumPortletCacheData = localStorage.getItem(__SPNS__FORUM_PORTLET_CACHE_LOCATION);
  if(forumPortletCacheData) {
      forumPortletCacheData = JSON.parse(forumPortletCacheData);
  } else {
      forumPortletCacheData = {"questions":[]};
  }
  forumPortletCacheData.questions.splice(index, 1);
  __SPNS__saveCurrentState(forumPortletCacheData);
}

function __SPNS__saveCurrentState(forumPortletCacheData) {
  localStorage.setItem(__SPNS__FORUM_PORTLET_CACHE_LOCATION, JSON.stringify(forumPortletCacheData));
}

/**
* Loads the question and associated details into the 'question-view' panel
*/
function __SPNS__addToQuestionList(title, text, forumPortletCacheData) {
  var li = document.createElement("LI");
  var header = document.createElement("H3");
  var content = document.createElement("P");

  var textNode = document.createTextNode(text);
  content.appendChild(textNode);

  textNode = document.createTextNode(title);
  header.appendChild(textNode);

  li.appendChild(header);
  li.appendChild(content);
  li.setAttribute("class", "item");
  li.setAttribute("index", forumPortletCacheData.questions.length+"");
  li.setAttribute("id", "questionNumber" + forumPortletCacheData.questions.length);

  var list = document.getElementById("__SPNS__itemList");
  list.appendChild(li);
  __SPNS__writeToCache(title, text);
}

function __SPNS__showAnswerQuestionForm() {
  return;
}

function __SPNS__showAskQuestionForm() {
  __SPNS__switchPanel(__SPNS__ASK_QUESTION);
}

/**
* *** Called from the 'Post question' button ***
* Verifies the question input data and adds in the storage if requirements are met
* Forces the question to have a title, but only gives warning if body is missing
*/
function __SPNS__postQuestion() {
  var forumPortletCacheData = localStorage.getItem(__SPNS__FORUM_PORTLET_CACHE_LOCATION);
  if(forumPortletCacheData) {
      forumPortletCacheData = JSON.parse(forumPortletCacheData);
  } else {
      forumPortletCacheData = {"questions":[]};
  }

  var title = document.getElementById("__SPNS__question-title").value;
  var text = document.getElementById("__SPNS__question-text").value;
  title = title.trim();
  text = text.trim();

  if(title === "" || title === null) {
      alert("Enter a question title!");
      return;
  } else if (text === "" || text === null) {
      var verify = confirm("You are asking a question " +
              "without any text in the body, are you sure you want to proceed?");
      if(verify != true) {
          return;
      }
  }

  __SPNS__addToQuestionList(title, text, forumPortletCacheData);
  __SPNS__switchPanel(__SPNS__QUESTION_VIEW);
  __SPNS__loadQuestion(forumPortletCacheData.questions.length);
}

function __SPNS__removeQuestion(li) {
  __SPNS__deleteFromCache(li.getAttribute("index"));
  li.remove();
}

/**
* Loads an individual question onto the display
* @param num integer index in the 'questions' array where the
*    question is stored
*/
function __SPNS__loadQuestion(num) {
  var forumPortletCacheData = localStorage.getItem(__SPNS__FORUM_PORTLET_CACHE_LOCATION);
  if(forumPortletCacheData) {
      forumPortletCacheData = JSON.parse(forumPortletCacheData);
  } else {
      forumPortletCacheData = {"questions":[]};
  }
  var arrayData = forumPortletCacheData.questions[num];
  var list = document.getElementById("__SPNS__responses");
  while(list.firstChild) {
      list.removeChild(list.firstChild);
  }

  var li = document.createElement("LI");
  var header = document.createElement("H3");
  var content = document.createElement("P");

  var text = document.createTextNode(arrayData.title);
  header.appendChild(text);

  text = document.createTextNode(arrayData.text);
  content.appendChild(text);

  li.appendChild(header);
  li.appendChild(content);
  li.setAttribute("class", "__SPNS__item");
  li.setAttribute("id", "__SPNS__actual-question");

  list.appendChild(li);

  for(var i = 0; i < arrayData.responses.length; i++) {
      li = document.createElement("LI");
      content = document.createElement("P");

      text = document.createTextNode(arrayData.responses[i].text);
      content.appendChild(text);

      li.appendChild(content);
      li.setAttribute("class", "__SPNS__item");
      li.setAttribute("id", "__SPNS__question"+num+"Response"+i);

      list.appendChild(li);
  }
}

function __SPNS__switchPanel(panelName) {
  var panel = document.getElementById(panelName);
  panel.style.display = "block";

  switch(panelName) {
      case __SPNS__HOME:
          document.getElementById(__SPNS__QUESTION_VIEW).style.display = "none";
          document.getElementById(__SPNS__ASK_QUESTION).style.display = "none";
          break;
      case __SPNS__QUESTION_VIEW:
          document.getElementById(__SPNS__HOME).style.display = "none";
          document.getElementById(__SPNS__ASK_QUESTION).style.display = "none";
          break;
      case __SPNS__ASK_QUESTION:
          document.getElementById(__SPNS__QUESTION_VIEW).style.display = "none";
          document.getElementById(__SPNS__HOME).style.display = "none";
          break;
  }
}

window.onload = __SPNS__loadForumQuestionsData;