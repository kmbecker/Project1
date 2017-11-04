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
      // var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
      var movie;
      var alertMovie;
      var rating;
      var release;
      var plot;
      var poster;
      // Generic function for capturing the movie name from the data-attribute
      function alertMovieName() {

        // YOUR CODE GOES HERE!!!
        alertMovie = $(this).data( "name" );
        return alertMovie;
        console.log(alertMovie)

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("movie");
          // Added a data-attribute
          a.attr("data-name", movies[i]);
          // Provided the initial button text
          a.text(movies[i]);
          // Added the button to the HTML
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#submitId").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        movie = $("#searchInput").val().trim();
        console.log(movie)
        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Function for displaying the movie info
      function displayMovieInfo(){
        
          // movie = $("#movie-input").val();
          

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
          $("#display").html("<h2>Rating: " + rating +"<br>Released: " + release +"<br>Plot: "
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
