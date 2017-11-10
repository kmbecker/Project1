//  ---------------- Initialize Seth Favorites Firebase ---------------!!!!!

var url ="https://movieproject-fc07e.firebaseio.com";
var dataRef = new Firebase(url);
var getKey;

//  ---------------- Firebase test Suggestions ---------------!!!!!

var url2 ="https://test-f0675.firebaseio.com";
var dataRef2 = new Firebase(url2);
var getKey2;
  
//  ---------------- Initialize Kyle Firebase ---------------!!!!!

var urlKyle ="https://kyle-6eb48.firebaseio.com";
var dataRefKyle = new Firebase(urlKyle);
var getKeyKyle;

//  ---------------- Initialize Cole Firebase ---------------!!!!!

var urlCole ="https://cole-d1c96.firebaseio.com";
var dataRefCole = new Firebase(urlCole);
var getKeyCole;

//  ---------------- Initialize Guest Firebase ---------------!!!!!

var urlGuest ="https://guest-e3750.firebaseio.com";
var dataRefGuest = new Firebase(urlGuest);
var getKeyCole;


//  ---------------- Creat Global Variables ---------------!!!!!
      var movie;
      var giphyName;
      var alertMovie;
      var rating;
      var release;
      var plot;
      var poster;
      var favs = [];
      var sugs = [];
      var actors = [];
      var actorArr = [];
      var movieTitle;
      var counter=0;

//  ---------------- Inititial document ready ---------------!!!!!     

   $(document).ready(function() {

$("#item1").change(function(){
  users();
  renderButtons();
  console.log("movin on up")
})

//  ---------------- Testing USER ACCOUNTS BELOW HERE ---------------!!!!! 

  function users(){
    // var userName = $("#user").val();
    // console.log(userName)

    var s = document.getElementById('item1');
    var item1 = s.options[s.selectedIndex].value;
    if (item1 == 1) {
      dataRef = dataRefCole;

      console.log("Cole")
    }
    else if (item1 == 2) {
      dataRef = dataRefKyle;
      console.log("Kyle")
    }
    else if (item1 == 3) {
      dataRef = new Firebase(url);
      console.log("Seth")
    }
    else {
      dataRef = dataRefGuest;
      console.log("Error")
    }
};//end users







//  ---------------- TESTING ABOVE ---------------!!!!! 

//  ---------------- This function handles events when submit button is clicked ---------------!!!!!

      $("#submitId").on("click", function(event) {
          event.preventDefault();
          users();
          var error = $("#searchInput").val();
          if (error === "") {
            console.log("yay")
            $("#error").css("display","block")
            $("#error").html("Please enter a Movie or TV show before pressing Search Button")
          } else {
            $("#error").css("display","none")
            submitClick();
            
          }
          // } else {
            // 
          // };
      });// ends submit

//  ------------------------------ Functions Below -----------------------------!!!!!

 //  ---------------- Search movie function ---------------!!!!!

      function submitClick(){

        $(function(){ $("#searchForm").on("submit", function(e){
            search_function($("#searchInput").val());
            e.preventDefault(); // Prevents submitting in most browsers
            return false; // Prevents submitting in some other browsers
          });
        });

        event.preventDefault();
        giphyName = $("#searchInput").val();
        movie = $("#searchInput").val().trim();// This line grabs the input from the textbox
        favs.push(movie);
        sugs.push(movie);
        
        $("#favbtnDiv").css("display" , "block")
        displayMovieInfo();
        displayGifs();
        $("#searchInput").val("");

      }

//  ---------------- Function for displaying the movie info ---------------!!!!!

      function displayMovieInfo(){
        
        //  ---------------- Ajax call for Omdb ---------------!!!!!
          var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=full&apikey=40e9cece";

          $.ajax({
              url: queryURL,
              method: "GET"
          }).done(function(response) {
    
              $("#actorDiv").empty()
         
              var col = "col-xs-3 col-sm-3 col-md-3 col-lg-3"
              actors = response.Actors;
              actorArr = actors.split(",");
              for (var i = actorArr.length - 1; i >= 0; i--) {
                var res=actorArr[i].replace(/ /g, "_");
                var wikiURL= "https://en.wikipedia.org/wiki/"+res+"?index.php?action=render";
                $("#actorDiv").append("<div class='container-fluid actimg" + col +"'><a href = "+ wikiURL + " target = '_blank'>" + actorArr[i] + "</a></div>");
              };
              
              movieTitle = response.Title;
              rating = response.Rated;
              release = response.Released;
              plot = response.Plot;
              poster = response.Poster;
             
                var overview = JSON.stringify(response);

                //  ---------------- Dynamically write to Divs ---------------!!!!!
        
           $(".trailer").html("<h3>Rating: " + rating +"<br>Released: " + release +"<br>Plot: "
           + plot + "</h3>");

          $("#favbtnDiv").html("<button type='button' class='btn btn-info btn-sm' id = 'favbtn'>Add to Favorites</button>")
          $("#sugDiv").html("<button type='button' class='btn btn-info btn-sm' " +
             "id = 'sugbtn'>Add to Suggestions</button>");
            
          $(".poster").html("<img src= " + poster +">");

          $("#htmlTitle").html("<h2>" + movieTitle + "</h2>");

          //  ---------------- Pull trailer playlist from YouTube ---------------!!!!!

          $("#playDiv").html("<iframe width='560' height='315' src='https://youtube.com/embed?listType=search&list=" +
           movie + "+trailer' frameborder='0' allowfullscreen></iframe>");

         


            });// ends response function

        
        };// ends display movie function
      
  

                //  ---------------- Below is Giphy API ---------------!!!!!

      function displayGifs(){
        $("#giphyDiv").empty();

        
        var gifyName = [];
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyName + "&api_key=dc6zaTOxFJmzC&limit=3&offset=" + counter;

          $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

             var results = response.data;

                for (var i = 0; i < results.length; i++) {
                  var gifDiv = $("<div class='item col-md-4'>");

                  gifyName[i] = giphyName;

                  var rating = results[i].rating;

                  var p = $("<p>").text("Rating: " + rating);

                  var gifyImage = $("<img>");
                  gifyImage.attr("class","gif")
                  gifyImage.attr("data-name", gifyName[i]);
                  gifyImage.attr("src", results[i].images.fixed_height_still.url);
                  gifDiv.prepend(gifyImage);
                  gifDiv.prepend(p);

                  $("#giphyDiv").append(gifDiv);
                  

                };
                counter=counter+3;
        });
      };//end of displayGifs
            //  ---------------- Render Suggestion Buttons ---------------!!!!!

      function renderSugButtons() {

           $("#suglocDiv").empty();
              dataRef2.on("child_added", function(childSnapShot){
              var sug = childSnapShot.val().favoritesFIRE;
              $("#suglocDiv").append("<div class = 'clearDiv' id = '" + childSnapShot.key() +"'><button data-name = '" +
              sug + "' class = 'sugMovie btn btn-info'>" +
              sug + "</button><br><div data-name = '" + sug + "' class = 'sugclear'>X</div</div")
                 
             });//end of child added
      };//end of render


          renderSugButtons();// initial render Suggestion call

              //  ---------------- Render Buttons Function ---------------!!!!!

      function renderButtons() {

          $("#favoritesDiv").empty();
            dataRef.on("child_added", function(childSnapShot){
            var fav = childSnapShot.val().favoritesFIRE;

          $("#favoritesDiv").append("<div class = 'clearDiv' id = '" + childSnapShot.key() +
             "'><button data-name = '" +
             fav + "' class = 'favMovie btn btn-info'>" +
             fav + "</button><br><div data-name = '" + fav + "' class = 'clear'>X</div</div")
               
           });//end of child added
      };//end of render

     // Render buttons inital call
      renderButtons();

                                
                  //  ---------------- Click functions below ---------------!!!!!

       //  ---------------- Suggestion movies click ---------------!!!!!

        $('body').on('click', '.sugMovie', function() {
          movie = $(this).text();
          giphyName = movie;
          displayGifs();
          displayMovieInfo();
        });//end of sug click function


       //  ---------------- Favorite Movies Click ---------------!!!!!
        $('body').on('click', '.favMovie', function() {
          movie = $(this).text();
          giphyName = movie;
          displayGifs();
          displayMovieInfo();
          $("#favbtnDiv").css("display" , "none")
        });//end of favorite click function


 //  ---------------- Add Suggestion Button click FIREBASE PUSH---------------!!!!!
        $('body').on('click', '#sugbtn', function() {
                  keyHolder2 = dataRef2.push({
                  favoritesFIRE: movie,
                  });//end of push

              renderSugButtons()

        })//end of sugbtn click function

  //  ---------------- Add Favorite Button Click FIREBASE PUSH---------------!!!!!
        $('body').on('click', '#favbtn', function() {
                  users();
                  keyHolder = dataRef.push({
                  favoritesFIRE: movie,
                  });//end of push
        
        renderButtons();
        
        });//end of favbtn
        //  ---------------- Clear Suggestion  ---------------!!!!!
                      
        $('body').on('click', '.sugclear', function() {
                
                $(this).closest ('button').remove();
                getKey2 = $(this).parent().attr('id');
                dataRef2.child(getKey2).remove();
                renderSugButtons();
                
        });//end Suggestion clear

          //  ---------------- Clear Favorites ---------------!!!!!
        $('body').on('click', '.clear', function() {
               
                $(this).closest ('button').remove();
                getKey = $(this).parent().attr('id');
                dataRef.child(getKey).remove();
                renderButtons();
           });// end favorite clear
         
        //  ---------------- Pause Gif Function ---------------!!!!!
          $('body').on('click', '.gif', function() {
            var src = $(this).attr("src");
          if($(this).hasClass('playing')){
             //stop
             $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
             $(this).removeClass('playing');
          } else {
            //play
            $(this).addClass('playing');
            $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
          }
        });//end of pause

        //-------------------Shuffle Giphy----------------------!!!!
          $("#giphyButton").on("click", function(event) {
            displayGifs();
          });//end of shuffle

// -----------------------------------------------hover css features ---------!!!!!
 // $(document).on("mouseover", ".favMovie", function(){
 //        console.log(this)
 //          // $(this)children().css("display","block");
 //          $(this).css("color","yellow");
 //          // $('span').css("display", "block")
 //      });

 //      $(document).on("mouseout", ".favMovie", function(){
        
 //          $(this).css("color","white");
 //      });
 //       $(document).on("mouseover", ".clear", function(){
      
 //          $(this).css("color","yellow");
 //      });
 //       $(document).on("mouseout", ".clear", function(){
 //          // console.log(this)
 //          $(this).css("color","red");
 //      });  


});//end of document ready     