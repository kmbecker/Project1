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



// ---------------------- below is API Call!!!!


// Initial array of movies
      var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
      var movie;
      var alertMovie;
      var rating;
      var release;
      var plot;
      var poster;
   

      // This function handles events where one button is clicked
      $("#submitId").on("click", function(event) {
        event.preventDefault();
        console.log("button pressed")

        // This line grabs the input from the textbox
        movie = $("#searchInput").val().trim();
        console.log(movie)
        // The movie from the textbox is then added to our array
        movies.push(movie);

        
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
          // Creates an element to have the rating displayed
          // Displays the rating
          // Retrieves the release year
          // Creates an element to hold the release year
          // Displays the release year
          // Retrieves the plot
          // Creates an element to hold the plot
          // Appends the plot
          // Creates an element to hold the image
          // Appends the image
          // Puts the entire Movie above the previous movies.

              rating = response.Rated;
              release = response.Released;
              plot = response.Plot;
              poster = response.Poster;
                var overview = JSON.stringify(response);
          $("#favoritesId").html("<h2>Rating: " + rating +"<br>Released: " + release +"<br>Plot: "
           + plot +"<br><img src='" + poster +"'>" );
            })
        
        };
      // We're adding a click event listener to all elements with the class "movie"
      // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements
      // $(".movies").on("click") will only add listeners to elements that are on the page at that time
      // $(document).on("click", ".movie", alertMovieName);
      $(document).on("click", ".movie", function(){
        console.log(this)
        movie = $(this).data( "name" );
       
        displayMovieInfo()
      });
      // Calling the renderButtons function to display the intial buttons
      renderButtons()
