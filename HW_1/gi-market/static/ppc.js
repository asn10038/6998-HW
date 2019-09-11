// PARTY PLANNING COMMITTEE
/*
var names = [
"Phyllis",
"Angela",
"Dwight",
"Oscar",
"Creed",
"Pam",
"Jim",
"Stanley",
"Michael",
"Kevin",
"Kelly"
]


var list1 = []
*/


function makeListItemWrapper(text, value, list){
  return "<div class='list_text ui-widget-content "+list+"' data-value="+value+">"+text+"</div>"
}

function makeNames(names){
  $("#names").empty()

  $.each(names, function( index, value ) {
      var text = (index+1) + ": " + value 
      var text_wrapper = makeListItemWrapper(text, value, "names_list")
    $("#names").append(text_wrapper)
    //console.log(text)
    //$(".list_text").draggable()//.css("background-color", "yellow");
    $(".names_list").draggable({
      revert: function (droppableObj) {
               //if false then no socket object drop occurred.
               if (droppableObj === false) {
                   //console.log('Not Dropped');
                   return true;
               } else {
                   //console.log("dropped")
                   return false;
               }
           }

         })

  }); 
}

function makeList1(names){
  $("#list1").empty()

  $.each(names, function( index, value ) {
    var text = (index+1) + ": " + value 
    var text_wrapper = makeListItemWrapper(text, value, "list1_list")
    $("#list1").append(text_wrapper)
    

    $(".list1_list").draggable({
      
      revert: function (droppableObj) {
               //if false then no socket object drop occurred.
               if (droppableObj === false ) {
                   //console.log('Not Dropped');
                   return true;
               } else {
                   //console.log("dropped")
                   return false;
               }
           }
           

         })
  }); 
}




$(document).ready(function(){


  // instatiate both lists on page load
  makeNames(names)
  makeList1(list1)

  // make the PPC droppable

  $( "#team1_label" ).droppable({
      accept: ".names_list",
      //hoverClass: "ui-state-active",
      classes: {
        "ui-droppable-active": "highlightDRAGGING",
          "ui-droppable-hover": "highlightHOVER"
      },
        drop: function( event, ui ) {
          //console.log("dropped team 11111")
          //console.log(event)
          //console.log($(ui.draggable[0]).data("value"))
          
          var name_dropped = $(ui.draggable[0]).data("value")

          move_to_ppc(name_dropped)
          /*
          list1.push(name_dropped)
          names.splice( $.inArray(name_dropped, names), 1 );
          makeNames(names)
          makeList1(list1)
          */
          
        }
    });


    // make the non-PPC droppable
    $( "#names_label" ).droppable({
      accept: ".list1_list",
      classes: {
        "ui-droppable-active": "highlightDRAGGING",
        "ui-droppable-hover": "highlightHOVER"
      },
      drop: function( event, ui ) {

        var name_dropped = $(ui.draggable[0]).data("value")
        move_to_non_ppc(name_dropped)
        /*
        names.push(name_dropped)
        list1.splice( $.inArray(name_dropped, list1), 1 );


        makeNames(names)
        makeList1(list1)
        */
        
      }
    }); 

  
})


var move_to_ppc = function(name){
  $.ajax({
          type: "POST",
          url: "move_to_ppc",                
          dataType : "json",
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify({"name": name}),
        success: function(data, text){
            var names = data["names"]
            var list1 = data["list1"]
            
            makeNames(names)
            makeList1(list1)

        

        },
        error: function(request, status, error){
          console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)

        }
      }); 
}

var move_to_non_ppc = function(name){
  $.ajax({
          type: "POST",
          url: "move_to_non_ppc",                
          dataType : "json",
          contentType: "application/json; charset=utf-8",
          data : JSON.stringify({"name": name}),
        success: function(data, text){
            var names = data["names"]
            var list1 = data["list1"]
            
            makeNames(names)
            makeList1(list1)

        

        },
        error: function(request, status, error){
          console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)

        }
      }); 
}

