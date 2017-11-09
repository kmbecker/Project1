// // Initialize Firebase
var url ="https://movieproject-fc07e.firebaseio.com";
var dataRef = new Firebase(url);
var getKey;
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
              $("#actorDiv").empty()
         
              var col = "col-xs-3 col-sm-3 col-md-3 col-lg-3"
              actors = response.Actors;
              actorArr = actors.split(",");
              for (var i = actorArr.length - 1; i >= 0; i--) {

              $("#actorDiv").append("<div class = 'container-fluid actimg " + col +"' id = "  +
               "'" + actorArr[i] + "'>" + actorArr[i]+ "</div>");
              };
              
              
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

          // Pull trailer playlist from YouTube

          $("#trailerDiv").html("<iframe width='560' height='315' src='https://youtube.com/embed?listType=search&list=" + movie + "+trailer' frameborder='0' allowfullscreen></iframe>");

         


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
                  var gifDiv = $("<div class='item col-sm-2'>");

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
            var fav = childSnapShot.val().favoritesFIRE;
            // console.log(fav);
            console.log(childSnapShot.key())
          $("#favoritesDiv").append("<div class = 'clearDiv' id = '" + childSnapShot.key() +"'><button data-name = '" +
           fav + "' class = 'favMovie btn btn-info'>" +
           fav + "</button><br><span data-name = '" + fav + "' class = 'clear'>X</span></div")
               
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
        //clear favorite
        $('body').on('click', '.clear', function() {
          // event.preventDefault();
          //         keyHolder = dataRef.push({
          //         favoritesFIRE: movie,
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

          function clearFav() {
            var favName = $(this).attr("data-name");
            console.log(favName)
          }


});//end of document ready     
