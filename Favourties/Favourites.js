var __SPNS__favourtiesBarPreLoadedCachedData;
const __SPNS__FAVOURITES_BAR_CACHE_NAME = 'favourites-myPortal-cache';

// USE localStorage['varname'] to save favourites and load all values into array for faster access
function __SPNS__openAddMenu() {
    document.getElementById("__SPNS__favouritesBarInputForm").style.display = "block";
    document.getElementById("__SPNS__favouritesBarBar").style.display = "none";
}

function __SPNS__closeAddFavouritesMenu() {
    document.getElementById("__SPNS__favouritesBarInputForm").style.display = "none";
    document.getElementById("__SPNS__favouritesBarBar").style.display = "block";
}

function __SPNS__clickedFavourite(__SPNS__item) {
    window.open(__SPNS__item.getAttribute("href"),'_blank');
}

function __SPNS__removeFromBookmarks(__SPNS__item) {
    __SPNS__removeFromStorage(__SPNS__item.getAttribute("index"));
    __SPNS__item.remove();
}

function __SPNS__saveToFile(name, link) {
    if (localStorage && localStorage.getItem(__SPNS__FAVOURITES_BAR_CACHE_NAME)) {
        var storage = JSON.parse(localStorage.getItem(__SPNS__FAVOURITES_BAR_CACHE_NAME));
        storage.favourites.push({"name":name, "link":link});
        __SPNS__favourtiesBarPreLoadedCachedData = storage;
        localStorage.setItem(__SPNS__FAVOURITES_BAR_CACHE_NAME, JSON.stringify(storage));
    }
    else {
        var data = {"favourites":[{"name":name, "link":link}]};
        __SPNS__favourtiesBarPreLoadedCachedData = data;
        localStorage.setItem(__SPNS__FAVOURITES_BAR_CACHE_NAME, JSON.stringify(data));
    }
    console.log(JSON.parse(localStorage.getItem(__SPNS__FAVOURITES_BAR_CACHE_NAME)));
}

function __SPNS__loadFavouritesBarData() {
    if (localStorage && localStorage.getItem(__SPNS__FAVOURITES_BAR_CACHE_NAME)) {
        var storage = JSON.parse(localStorage.getItem(__SPNS__FAVOURITES_BAR_CACHE_NAME));
        for(var i = 0; i < storage.favourites.length; i++) {
            __SPNS__internalAddToFavourites(storage.favourites[i].name, storage.favourites[i].link, i);
        }
        __SPNS__favourtiesBarPreLoadedCachedData = storage;
    } else {
        __SPNS__favourtiesBarPreLoadedCachedData = {"favourites":[]};
    }
}

function __SPNS__addToFavourites() {
    var text = document.getElementById("addToListName").value.trim();
    var link = document.getElementById("addToListLink").value.trim();

    if(link === null || link === "") {
        alert("You entered an invalid link! Please re-enter.")
    } else {
        if(text == null || text == "") {
            text = link;
        }
        var index = __SPNS__favourtiesBarPreLoadedCachedData.favourites.length;
        __SPNS__internalAddToFavourites(text, link, index);
        __SPNS__saveToFile(text, link);
        __SPNS__closeAddFavouritesMenu();
    }
}

function __SPNS__internalAddToFavourites(name, link, index) {
    var list = document.getElementById("__SPNS__favouritesBarBar");
    var li = document.createElement("LI");
    var div = document.createElement("DIV");
    var textNode = document.createTextNode(name);
    div.appendChild(textNode);
    div.setAttribute("class", "__SPNS__item");
    li.setAttribute("href", link);
    li.setAttribute("onclick", "__SPNS__clickedFavourite(this)");
    li.setAttribute("oncontextmenu", "__SPNS__removeFromBookmarks(this)");
    li.appendChild(div);
    li.setAttribute("class", "__SPNS__item");
    li.setAttribute("index", index);
    list.appendChild(li);
}

function __SPNS__removeFromStorage(index) {
    __SPNS__favourtiesBarPreLoadedCachedData.favourites.splice(index, 1);
    localStorage.setItem(__SPNS__FAVOURITES_BAR_CACHE_NAME, JSON.stringify(__SPNS__favourtiesBarPreLoadedCachedData));
}

window.onload = __SPNS__loadFavouritesBarData;