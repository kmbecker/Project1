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


//  database.ref to set initial movie favorites



// ---------------------- below is  OMD API Call!!!!



      var movie;
      var alertMovie;
      var rating;
      var release;
      var plot;
      var poster;
      var actors = [];
      var actorArr = [];
   

      // This function handles events where one button is clicked
      $("#submitId").on("click", function(event) {
        event.preventDefault();
        console.log("button pressed")

        // This line grabs the input from the textbox
        movie = $("#searchInput").val().trim();
        console.log(movie)
        
        
        displayMovieInfo();
        displayGifs();
      });

      // Function for displaying the movie info
      function displayMovieInfo(){
        
          movie = $("#searchInput").val();
          

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
                var overview = JSON.stringify(response);
          $("#favoritesId").html("<h2>Rating: " + rating +"<br>Released: " + release +"<br>Plot: "
           + plot +"<br><img src='" + poster +"'>" );
            })
        
        };
      
      // $(document).on("click", ".movie", function(){
      //   console.log(this)
      //   movie = $(this).data( "name" );
       
      //   displayMovieInfo()
      // });
      // ---------------------------------Below is Giphy API------------!!!!!!


      function displayGifs(){
        $("#giphyDiv").empty();

        var giphyName = $("#searchInput").val();
        var gifyName = [];

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphyName + "&api_key=dc6zaTOxFJmzC&limit=5";

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
      };

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





      
