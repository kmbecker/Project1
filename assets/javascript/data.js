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

//  ---------------- Initialize Cole Firebase ---------------!!!!!

var urlCole ="https://cole-d1c96.firebaseio.com";
var dataRefCole = new Firebase(urlCole);

//  ---------------- Initialize Guest Firebase ---------------!!!!!

var urlGuest ="https://guest-e3750.firebaseio.com";
var dataRefGuest = new Firebase(urlGuest);



  function users(){
    // var userName = $("#user").val();
    // console.log(userName)

    var s = document.getElementById('item1');
    var item1 = s.options[s.selectedIndex].value;
    if (item1 == 1) {
      dataRef = dataRefCole;
    }
    else if (item1 == 2) {
      dataRef = dataRefKyle;
    }
    else if (item1 == 3) {
      dataRef = new Firebase(url);
    }
    else {
      dataRef = dataRefGuest;
    }
};//end users


     //  ---------------- Render Suggestion Buttons ---------------!!!!!

      function renderSugButtons() {

           $("#suglocDiv").empty();
              dataRef2.on("child_added", function(childSnapShot){
              var sug = childSnapShot.val().favoritesFIRE;
              $("#suglocDiv").append("<div class = 'clearDiv' id = '" + childSnapShot.key() +"'><button data-name = '" +
              sug + "' class = 'sugMovie btn btn-info'>" +
              sug + "</button><br><div data-name = '" + sug + "' class = 'sugclear'>x</div</div")
                 
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
             fav + "</button><br><div data-name = '" + fav + "' class = 'clear'>x</div</div")
               
           });//end of child added
      };//end of render

     // Render buttons inital call
      renderButtons();




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