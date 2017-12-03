//Giftastic Homework Assignment//

$(document).ready(function () {

let topics = ["Rangers", "RedSox", "Yankees", "Dodgers", "Astros"]

function loadButtons()  {
    $("#buttonDiv").empty();
    let topicButtons = topics.map(function(topic, index)    {
        $("#buttonDiv").append(`
        <button class ="btn btn-primary topic terms"  id=${topic}>${topic}</button>
        `)
    });


    $(".topic").on("click", function () {
        let term = $(this).attr("id");
        $("#gifDiv").empty();
        console.log(term);


        var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${term}&limit=10`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })//Closes Ajax

            .done(function (response) {

                let dataArr = response.data;

                console.log(dataArr);

                $.each(dataArr, function (index, value) {
                    let gif = dataArr[index];
                    $('#gifDiv').prepend(`
                <div class="gif-box">
                <img id=${term} class="img-box" src="${gif.images.original_still.url}" alt="a gif of ${term}"/>
                <p class="gif-rating">Rating: ${gif.rating}</p>
                </div>
                `);
                });

                $(".img-box").each(function(index)  {
                $(this).on("click", function()  {
                    let src = $(this).attr("src")
                    if(src.endsWith("s.gif")) {
                        $(this).attr("src", src.replace("_s.gif", ".gif"))
                    } else {
                        $(this).attr("src", src.replace(".gif", "_s.gif"));
                    }
                })
                })
            });//Closes done function

    })//Closes on.click

}//closes function loadButtons

loadButtons();//Load Buttons with preset topics on DOM

    $(document).on("submit")

})//Closes document.ready