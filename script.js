$.ajax({

    url : 'https://api.gog.com/v2/games/1126478335?locale=fr-FR',
    type : 'GET',
    dataType: "json",
    'success' : function(data) {       
        $("#gameTitle").text(data._embedded.product.title)       
        $("#gamePublisher").text(data._embedded.publisher.name)  
        $("#gameDescription").html(data.description)  
        var str = data._embedded.screenshots[0]._links.self.href;
        var imgLink = str.replace(/_{formatter}/g, "")
        $("#gameImg").attr("src", imgLink);  
        console.log(data);   
    },
    'error' : function(request,error)
    {
        alert("Request: ");
    }
});