var title = new Array();
var id = new Array();
var isVisibleInCatalog = new Array();

// for(var i = 6001 ; i <= 7000 ; i++)
// {
//     $.getJSON("products/JSON/product (" + i + ").json", function (data) {
//         if(data.title.includes("\'"))
//         {
//             var arrayTitle = data.title.split('');
//             for(var j = 0 ; j < arrayTitle.length ; j++)
//             {
//                 if(arrayTitle[j] == "\'")
//                 {
//                     arrayTitle.splice(j, 0, "\'");
//                     var finalTitle = arrayTitle.join('');
//                     j = j + 2;
//                 }
//             }
//             title.push(finalTitle);
//             id.push(data.id);
//         }
//         else
//         {
//             title.push(data.title);
//             id.push(data.id);
//         }

//     }).fail(function () {
//         console.log("An error has occurred.");
//     });
// }

// console.log(title);
// console.log(id);

function getTitle() {
    var finalTitle;
    var title = $("#gameID").val();
        if(title.includes("\'"))
        {
            var arrayTitle = title.split('');
            for(var j = 0 ; j < arrayTitle.length ; j++)
            {
                if(arrayTitle[j] == "\'")
                {
                    arrayTitle.splice(j, 0, "\'");
                    var finalTitle = arrayTitle.join('');
                    j = j + 2;
                }
            }
        }
        else
        {
            finalTitle = title;
        }
    console.log(finalTitle);
        $.ajax({
            url: "connect.php",
            type: "POST",
            data: {
                id: finalTitle,
            },
            cache: false,
            success: function (dataResult) {
                console.log(dataResult);
                var parsedArray = JSON.parse(dataResult);
                console.log(parsedArray);
                $("#titlesContainer").html(null);
                for (let i = 0; i < parsedArray.length; i++) {
                    $("#titlesContainer").append( '<button type="button" onclick="getInfoFromTitle(\'' + parsedArray[i].id + '\')">' + parsedArray[i].title + '</button>' );   
                }
            }
        });
}

function getInfoFromTitle(id)
{
    console.log(id);
    $.ajax({
        url: "https://api.gog.com/v2/games/" + id + "?locale=fr-FR",
        type: "GET",
        cache: false,
        success: function (dataResult) {
            $("#logoImg").attr('src', "");
            $("#gameTitle").text(null);
            $("#gamePublisher").text(null);
            $("#gameDescription").html(null);
            $("#gameImg0").attr('src', "");
            $("#gameImg1").attr('src', "");
            $("#gameImg2").attr('src', "");
            $("#gameImg3").attr('src', "");
            $("#gameImg4").attr('src', "");
            $("#gameImg5").attr('src', "");

            console.log(dataResult);

            if(dataResult._links.galaxyBackgroundImage != undefined)
            {
                $("#backgroundImg").attr('src', dataResult._links.galaxyBackgroundImage.href);
            }
            else
            {
                $("#backgroundImg").attr('src', dataResult._links.backgroundImage.href);
            }

            console.log(dataResult._links.logo);

            if(dataResult._links.logo != undefined)
            {
                $("#logoImg").attr('src', dataResult._links.logo.href);
            }
            $("#gameTitle").text(dataResult._embedded.product.title);
            $("#gamePublisher").text(dataResult._embedded.publisher.name);
            $("#gameDescription").html(dataResult.description);
            var strArray = new Array();
            if(dataResult._embedded.screenshots[0] != undefined)
            {
                for(var i = 0 ; i < dataResult._embedded.screenshots.length ; i++)
                {
                    strArray[i] = dataResult._embedded.screenshots[i]._links.self.href;
                }
                for (let i = 0; i < strArray.length; i++) {
                    strArray[i] = strArray[i].replace(/_{formatter}/g, "");                           
                }
                $("#gameImg0").attr('src', strArray[0]);
                $("#gameImg1").attr('src', strArray[1]);
                $("#gameImg2").attr('src', strArray[2]);
                $("#gameImg3").attr('src', strArray[3]);
                $("#gameImg4").attr('src', strArray[4]);
                $("#gameImg5").attr('src', strArray[5]);
            }
        }
    });
}

function pushInfoInDB() {
    for (let i = 0; i < title.length; i++) {
        $.ajax({
            url: "https://api.gog.com/v2/games/" + id[i] + "?locale=fr-FR",
            type: "GET",
            cache: false,
            success: function (dataResult) {
                isVisibleInCatalog[i] = dataResult._embedded.product.isVisibleInCatalog.toString();
                console.log(title[i], isVisibleInCatalog[i]);
            },
            error:function (xhr, ajaxOptions, thrownError){
                if(xhr.status==404) {
                    console.log("YEEEEEEEEE");
                    isVisibleInCatalog[i] = "false";
                }}});

    }

}
function sendToDBFinal(){
    for (let i = 0; i < isVisibleInCatalog.length; i++) {
    console.log(id[i], title[i], isVisibleInCatalog[i]);
        
    }
    for (let i = 0; i < title.length; i++) {
        $.ajax({
            url: "push.php",
            type: "POST",
            data: {
                title: title[i],
                id: id[i],
                isVisibleInCatalog: isVisibleInCatalog[i]
            },
            cache: false,
            success: function (dataResult) {
                console.log(dataResult + title[i]);
            }
        });   
    }
}