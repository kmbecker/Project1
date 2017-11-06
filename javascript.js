// // Initialize Firebase
var url ="https://movieproject-fc07e.firebaseio.com";
var dataRef = new Firebase(url);

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





// ---------------------- below is  OMD API Call!!!!



      var movie;
      var giphyName;
      var alertMovie;
      var rating;
      var release;
      var plot;
      var poster;
      var favs = [];
      var actors = [];
      var actorArr = [];
      var website;
   
   $(document).ready(function() {

    //initial favorites firebase load
    //  dataref to set initial movie favorites




           

      // This function handles events where one button is clicked
      $("#submitId").on("click", function(event) {

        event.preventDefault();
        console.log("button pressed")
        giphyName = $("#searchInput").val();

        // This line grabs the input from the textbox
        movie = $("#searchInput").val().trim();
        favs.push(movie);
        console.log(favs);
        console.log(movie);
        
        $("#favbtnDiv").css("display" , "block")
        displayMovieInfo();
        displayGifs();
        $("#searchInput").val("");
      });// ends submit


           //---------------------------------Below is add to favorites button ------------




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
         
            // console.log(response.Actors)
              actors = response.Actors;
              actorArr = actors.split(",");
              $("#actorDiv").html(actorArr)
              
            console.log(actorArr)
            
              rating = response.Rated;
              release = response.Released;
              plot = response.Plot;
              poster = response.Poster;
              website = response.Website;
                var overview = JSON.stringify(response);
          $(".trailer").html("<a href = "+ website + " target = '_blank'>" + website +
           "</a>");
           $(".trailer").append("<br><h2>Rating: " + rating +"<br>Released: " + release +"<br>Plot: "
           + plot);
          $("#favbtnDiv").html("<button type='button' class='btn btn-info btn-sm' id = 'favbtn'>Add to Favorites</button>")
            
          $(".poster").html("<img src= " + poster +">");
         


            });// ends response function

        
        };// ends display movie function
      
      // $(document).on("click", ".movie", function(){
      //   console.log(this)
      //   movie = $(this).data( "name" );
       
      //   displayMovieInfo()
      // });


 

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
                // console.log(results) 

                for (var i = 0; i < results.length; i++) {
                  var gifDiv = $("<div class='item'>");

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
                }
        });
      };//end of displayGifs


      //render buttons function
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
          $("#favoritesDiv").empty();
           dataRef.on("child_added", function(childSnapShot){
          $("#favoritesDiv").append("<button class = 'favMovie btn btn-info'>" + childSnapShot.val().favoritesFIRE + "</button>")
               
           });//end of child added
          };//end of render

     // Render buttons inital 
      renderButtons();
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

      //Favorit button clicked

        $('body').on('click', '#favbtn', function() {
          event.preventDefault();
                  keyHolder = dataRef.push({
                  favoritesFIRE: movie,
           })//end of push
          
        renderButtons();
        
        });//end of favbtn
          

        
        // dataRef.on("child_added", function(childSnapShot){
        //   $("#favoritesDiv").append("<button class = 'favMovie'>" + childSnapShot.val().favoritesFIRE + "</button>")
            
        // });
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




});//end of document ready     
