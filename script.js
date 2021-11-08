function launchAjax() {
    var ID = $("#gameID").val();
    $.ajax({

        url: 'https://api.gog.com/v2/games/'+ ID +'?locale=fr-FR',
        type: 'GET',
        dataType: "json",
        'success': function (data) {
            $("#gameTitle").text(data._embedded.product.title)
            $("#gamePublisher").text(data._embedded.publisher.name)
            $("#gameDescription").html(data.description)
            var str = data._embedded.screenshots[0]._links.self.href;
            var imgLink = str.replace(/_{formatter}/g, "")
            $("#gameImg0").attr("src", imgLink);
            var str = data._embedded.screenshots[1]._links.self.href;
            var imgLink = str.replace(/_{formatter}/g, "")
            $("#gameImg1").attr("src", imgLink);
            var str = data._embedded.screenshots[2]._links.self.href;
            var imgLink = str.replace(/_{formatter}/g, "")
            $("#gameImg2").attr("src", imgLink);
            var str = data._embedded.screenshots[3]._links.self.href;
            var imgLink = str.replace(/_{formatter}/g, "")
            $("#gameImg3").attr("src", imgLink);
            var str = data._embedded.screenshots[4]._links.self.href;
            var imgLink = str.replace(/_{formatter}/g, "")
            $("#gameImg4").attr("src", imgLink);
            var str = data._embedded.screenshots[5]._links.self.href;
            var imgLink = str.replace(/_{formatter}/g, "")
            $("#gameImg5").attr("src", imgLink);
            var str = data._links.galaxyBackgroundImage.href;
            $("#backgroundImg").attr("src", str);
            var str = data._links.logo.href;
            $("#logoImg").attr("src", str);
            console.log(data);
        },
        'error': function (request, error) {
            alert("Request: ");
        }
    });
}