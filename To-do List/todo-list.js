var __SPNS__myspHelper = [Plugin:Portlet key="namespace" compute="once"]spHelper;

function __SPNS__addElement(text, num) {
    if (text.trim() != "") {
        var textNode = document.createTextNode(text);
        var spanNode = document.createElement("SPAN");
        spanNode.setAttribute("class", ".__SPNS__text");
        spanNode.appendChild(textNode);
        var li = document.createElement("DIV");
        var span = document.createElement("SPAN");
        span.setAttribute("class", ".__SPNS__span");
        li.setAttribute("class", "__SPNS__liWide");
        li.appendChild(span);
        span.appendChild(spanNode);
        document.getElementById("__SPNS__ulList").appendChild(li);
        li.setAttribute("index", (num+""));
    }
}

function __SPNS__setToDoListPortletPreferences(obj) {
    if(obj === null) {
        __SPNS__myspHelper.setPortletPreferences(null);
    }
    else {
        __SPNS__myspHelper.setPortletPreferences(JSON.stringify(obj));
    }
}

function __SPNS__init() {
    var list = document.getElementsByClassName("__SPNS__li");
    if(__SPNS__body.offsetWidth < 600) {
        for(var i = 0; i < list.length; i++) {
            var temp = list[i];
            temp.setAttribute("class", "__SPNS__liWide");
        }
    }
}

function __SPNS__addToList() {
    var text = document.getElementById("__SPNS__input").value;
    document.getElementById("__SPNS__input").value = null;
    if (text.trim() != "") {
        var textNode = document.createTextNode(text);
        var li = document.createElement("DIV");
        var spanNode = document.createElement("SPAN");
        spanNode.setAttribute("class", ".__SPNS__text");
        spanNode.appendChild(textNode);
        var span = document.createElement("SPAN");
        span.setAttribute("class", ".__SPNS__span");
        li.setAttribute("class", "__SPNS__liWide");
        li.appendChild(span);
        span.appendChild(spanNode);
        document.getElementById("__SPNS__ulList").appendChild(li);
        var data = {"myData":[text]};
        __SPNS__myspHelper.getPortletPreferences().then(function(prefData){
            if(prefData !== null) {
                var obj = JSON.parse(prefData);
                if (obj.myData !== null) {
                    li.setAttribute("index", ((obj.myData.length) + ""));
                    obj.myData.splice(obj.myData.length, 0, text);
                    __SPNS__setToDoListPortletPreferences(obj);
                }
                else {
                    __SPNS__setToDoListPortletPreferences(data);
                }
            }
            else {
                __SPNS__setToDoListPortletPreferences(data);
            }
        }, function(error){return;});
    }
}

function __SPNS__removeFromList(index) {
    __SPNS__myspHelper.getPortletPreferences().then(function(prefData){
        var obj = JSON.parse(prefData);
        obj.myData.splice(index, 1);
        __SPNS__setToDoListPortletPreferences(obj);
    }, function(error){return;});
}

function __SPNS__loadToDoListPortletPreferenceData() {
    __SPNS__myspHelper.getPortletPreferences().then(function(prefData) {
        var temp = {"myData":[]};
        if(prefData !== null) {
            obj = JSON.parse(prefData);
            if (obj.myData !== null) {
                for (var i = 0; i < obj.myData.length; i++) {
                    __SPNS__addElement(obj.myData[i], i);
                }
            }
            else {
                __SPNS__setToDoListPortletPreferences(temp);
            }
        }
        else {
            __SPNS__setToDoListPortletPreferences(temp);
        }
    }, function(error) {
        return;
    });
};

$("#__SPNS__ulList").on('click', 'div', function() {
    var temp = $(this).attr("index");
    __SPNS__removeFromList(temp);
    $(this).remove();
});

$("#__SPNS__input").keydown(function(event){
    if(event.which === 13) {
        __SPNS__addToList();
    }
})

$(document).ready(function() {
    __SPNS__loadToDoListPortletPreferenceData();
    __SPNS__body = document.getElementById("__SPNS__box-design");
    __SPNS__init();
});