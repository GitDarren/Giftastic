//Giftastic Homework Assignment//

$(document).ready(function () {

//Variable to set up default buttons with topics already selected//    
let topics = ["Rangers", "RedSox", "Yankees", "Dodgers", "Astros"]

//Function to load buttons with prefined values from the variable topics.  
function loadButtons()  {
    $("#buttonDiv").empty();
    //Creates a variable to map the topics onto the buttons using append//
    let topicButtons = topics.map(function(topic, index)    {
        $("#buttonDiv").append(`
        <button class ="btn btn-primary topic terms"  id=${topic}>${topic}</button>
        `)
    });

    //Basically uses this to assign term to the id of gifDiv
    $(".topic").on("click", function () {
        let term = $(this).attr("id");
        $("#gifDiv").empty();
        console.log(term);

        //Sets up variable for the queryURL which includes a JSON String
        var queryURL = `https://api.giphy.com/v1/gifs/search?apikey=dc6zaTOxFJmzC&q=${term}&limit=9`;

        //Sets up AJAX to get data from the appropriate URL
        $.ajax({
            url: queryURL,
            method: "GET"
        })//Closes Ajax


            .done(function (response) {

                let dataArr = response.data;

                console.log(dataArr);

                //Dynamically creates new divs with the gif and associated rating.//
                $.each(dataArr, function (index, value) {
                    let gif = dataArr[index];
                    let row = index
                    $('#gifDiv').prepend(`
                <div class="gif-box col-sm-4 col-lg-6">
                <img id=${term} class=" img-box" src="${gif.images.fixed_width_still.url}" alt="a gif of ${term}"/>
                <p class="gif-rating">Rating: ${gif.rating}</p>
                </div>
                `);
                });

                //This create the function that starts and stops the gif from playing - in acuality it just replaces the url with the still and animated version of the gif.
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

    $(document).on("submit", "form", function(event)    {
        event.preventDefault();
        let formValue = $("input").val().trim();
        if( (formValue == "")  ||  (formValue== null) )   {
            alert("Stop this stupid Shit");
            return;
        } else  {
            topics.push(formValue);
            $("input:text").val('');
            loadButtons();
            return false;
        }
    })

})//Closes document.ready