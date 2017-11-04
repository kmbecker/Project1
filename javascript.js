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
      
      $(document).on("click", ".movie", function(){
        console.log(this)
        movie = $(this).data( "name" );
       
        displayMovieInfo()
      });
      
