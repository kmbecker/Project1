// // Initialize Firebase
var url ="https://movieproject-fc07e.firebaseio.com";
var dataRef = new Firebase(url);
var getKey;

// ------------ Firebase 2nd Suggestions _--------!
var url2 ="https://test-f0675.firebaseio.com";
var dataRef2 = new Firebase(url2);
var getKey2;
  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyDHolWI_ZAvFdCLyYUFDiSNnsWLiS485OQ",
  //   authDomain: "movieproject-fc07e.firebaseapp.com",
  //   databaseURL: "https://movieproject-fc07e.firebaseio.com",
  //   projectId: "movieproject-fc07e",
  //   storageBucket: "",
  //   messagingSenderId: "42818863827"
  // };
  // firebase.initializeApp(config);
// create global variables

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

   $(document).ready(function() {

      // This function handles events where submit button is clicked
      $("#submitId").on("click", function(event) {
        var error = $("#searchInput").val();

        if (error === "") {
          $("#error").html("Please Enter A Movie or Tv show")

        } else {
          ("#error").empty()
          submitClick()
        }
        
      });// ends submit

// --------------------------------------------------- functions---------------------------!!!!
        function submitClick(){

            function search_function(searchInput){
              // Do your search action here
              alert(searchInput);
            };
            $(function(){
              $("#searchForm").on("submit", function(e){
                search_function($("#searchInput").val());
                e.preventDefault(); // Prevents submitting in most browsers
                return false; // Prevents submitting in some other browsers
              });
            });

            event.preventDefault();
            giphyName = $("#searchInput").val();

            // This line grabs the input from the textbox
            movie = $("#searchInput").val().trim();
            favs.push(movie);
            sugs.push(movie);
            
            $("#favbtnDiv").css("display" , "block")
            displayMovieInfo();
            displayGifs();
            $("#searchInput").val("");
         };

      // Function for displaying the movie info
      function displayMovieInfo(){
        
        
          // Here we construct our URL
          var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
            console.log(queryURL);
          $.ajax({
              url: queryURL,
              method: "GET"
          }).done(function(response) {
                    // Creates a div to hold the movie
          // Retrieves the Rating Data
         console.log(response)
              $("#actorDiv").empty()
         
              var col = "col-xs-3 col-sm-3 col-md-3 col-lg-3"
              actors = response.Actors;
              actorArr = actors.split(",");
              for (var i = actorArr.length - 1; i >= 0; i--) {

              // $("#actorDiv").append("<div class = 'container-fluid actimg " + col +"' id = "  +
              //  "'" + actorArr[i] + "'>" + actorArr[i]+ "</div>");
                var res=actorArr[i].replace(/ /g, "_");
                var wikiURL= "https://en.wikipedia.org/wiki/"+res+"?index.php?action=render";
                  console.log(wikiURL);
                $("#actorDiv").append("<div class='container-fluid actimg" + col +"'><a href = "+ wikiURL + " target = '_blank'>" + actorArr[i] + "</a></div>");
              };
              
              
            console.log(actorArr)
              movieTitle = response.Title;
              rating = response.Rated;
              release = response.Released;
              plot = response.Plot;
              poster = response.Poster;
             
                var overview = JSON.stringify(response);
        
           $(".trailer").html("<h3>Rating: " + rating +"<br>Released: " + release +"<br>Plot: "
           + plot + "</h3>");

          $("#favbtnDiv").html("<button type='button' class='btn btn-info btn-sm' id = 'favbtn'>Add to Favorites</button>")
          $("#sugDiv").html("<button type='button' class='btn btn-info btn-sm' " +
             "id = 'sugbtn'>Add to Suggestions</button>");
            
          $(".poster").html("<img src= " + poster +">");

          $("#htmlTitle").html("<h2>" + movieTitle + "</h2>");

          // Pull trailer playlist from YouTube

          $("#playDiv").html("<iframe width='560' height='315' src='https://youtube.com/embed?listType=search&list=" +
           movie + "+trailer' frameborder='0' allowfullscreen></iframe>");

         


            });// ends response function

        
        };// ends display movie function
      
  

      // ---------------------------------Below is Giphy API------------!!!!!!


      function displayGifs(){
        $("#giphyDiv").empty();

        
        var gifyName = [];

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyName + "&api_key=dc6zaTOxFJmzC&limit=3";

          $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
          console.log(response)
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
                  $("#newGiphy").on("click", function(){
                    var imgSrc;
                    console.log("click");
                    $.ajax({
                    url: queryURL,
                    method: "GET",
                    success: function(response){
                      imgSrc=response.data.image_url;
                      $("#giphyDiv").attr("src", imgSrc);
                      return false;
                      console.log(imgSrc);
                    },
                    error: function(e) {
                      console.log("uh oh")
                    }
                  });
                });
              }
        });
      };//end of displayGifs

// render suggestions buttons !!!!!!!!!
      function renderSugButtons() {
        $("#suglocDiv").empty();
        dataRef2.on("child_added", function(childSnapShot){
            var sug = childSnapShot.val().favoritesFIRE;
       $("#suglocDiv").append("<div class = 'clearDiv' id = '" + childSnapShot.key() +"'><button data-name = '" +
           sug + "' class = 'sugMovie btn btn-info'>" +
           sug + "</button><br><div data-name = '" + sug + "' class = 'sugclear'>X</div</div")
               
           });//end of child added
          };//end of render

          renderSugButtons();
      //render buttons function
      function renderButtons() {


        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
          $("#favoritesDiv").empty();
           dataRef.on("child_added", function(childSnapShot){
            var fav = childSnapShot.val().favoritesFIRE;
            // console.log(fav);
            // console.log(childSnapShot.key())
          $("#favoritesDiv").append("<div class = 'clearDiv' id = '" + childSnapShot.key() +"'><button data-name = '" +
           fav + "' class = 'favMovie btn btn-info'>" +
           fav + "</button><br><div data-name = '" + fav + "' class = 'clear'>X</div</div")
               
           });//end of child added
          };//end of render

     // Render buttons inital 
      renderButtons();

// ------------------------------------------------ click functions --------------------!!!!

      // suggestion movies click

        $('body').on('click', '.sugMovie', function() {
          movie = $(this).text();
          console.log(this)
        console.log(movie)
        giphyName = movie;
          displayGifs();
          displayMovieInfo();
        });//end of sug click function


      // favorit movies on click
      $('body').on('click', '.favMovie', function() {
          movie = $(this).text();
          console.log(this)
        console.log(movie)
        giphyName = movie;
          displayGifs();
          displayMovieInfo();
          $("#favbtnDiv").css("display" , "none")
        });//end of favorite click function


//    --------------------suggestion button _-----
       $('body').on('click', '#sugbtn', function() {
                  keyHolder2 = dataRef2.push({
                  favoritesFIRE: movie,
        });//end of push

     //Favorit button clicked

                })//end of push

        $('body').on('click', '#favbtn', function() {
          event.preventDefault();
                  keyHolder = dataRef.push({
                  favoritesFIRE: movie,
                  });//end of push
                  

        renderSugButtons()
        renderButtons();
        
        });//end of favbtn
         //clear favorite
        $('body').on('click', '.sugclear', function() {
          
          var test = $(this).attr('data-name');
          // console.log(test)
          $(this).closest ('button').remove();
          getKey2 = $(this).parent().attr('id');
          dataRef2.child(getKey2).remove();
          renderSugButtons();
           })

        //clear favorite
        $('body').on('click', '.clear', function() {
         
          var test = $(this).attr('data-name');
          // console.log(test)
          $(this).closest ('button').remove();
          getKey = $(this).parent().attr('id');
          console.log(getKey);
          dataRef.child(getKey).remove();
          renderButtons();
           })
         
         // pause gif function
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