$(document).ready( function() {
    var accessToken = "2271466728.9124996.1ef50ce916c249b39691e52c3927b95e";
    var noImages = 6;
    var url = "https://api.instagram.com/v1/users/1345487931/media/recent/?access_token="+accessToken+"&count="+noImages;
    var images;
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url,
        success: function(data) {
            images = document.getElementsByTagName("td");
            for (var i = 0; i < noImages; i++) {
                var img = document.createElement("IMG");
                var link = document.createElement("A");
                link.setAttribute("href", data.data[i].images.standard_resolution.url);
                link.setAttribute("target", "_blank");
                img.setAttribute("src", data.data[i].images.thumbnail.url);
                link.appendChild(img);
                images[i].appendChild(link);
            }
        }
    });});
