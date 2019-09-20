/* contains all the scripts needed for the sellers page */
/* File contains all the logic for the gi market basic app */

/** Globals */

/** Functions  */
function getGiRowHTML(gi) {
    res = '<div class="row giRow"> ' 
                +'<div class="col-md-2">'
                + "<img class='tinyImage' src='" + gi["image_url"] + "'></img>"
                + '</div>'
                + '<div class="col-md-8"> '
                   +   '<ul class="list-group">'
                   +   '<li class="list-group-item"> <span class="infoLabel"> Seller: </span> <strong>' +  gi["seller"] + '</strong></li>'
                   +   '<li class="list-group-item"> <span class="infoLabel"> Name: </span>' +  gi["name"] + '</li>'
                   +   '<li class="list-group-item"> <span class="infoLabel"> Description: </span>' +  gi["description"] + '</li>'
                   +   '<li class="list-group-item"> <span class="infoLabel"> Price: </span> <strong> $' +  gi["price"] + '</strong></li>'
                   + '</ul>'
               + '</div>'
               + '<div class="col-md-2">'
                    + '<div class="action-buttons btn-group-vertical">'
                        + '<button type="button" class="btn btn-danger delete-button" data-id="' + gi["id"] +'">Delete</button>' 
                        + '<button type="button" class="btn btn-primary edit-button" data-toggle="modal" data-target="#editModal" data-id="' + gi["id"] + '">Edit</button>' 
                    + '</div>'
                + '</div>'
           + '</div>'
           + '<hr>'

    return res;
}
           
function addCreateButton() {
    $('#nav-ul').append('"<li class="nav-item"> <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#createModal"> Create </button> </li>');
}


function fillUpdateForm(id) {
    entry = {}

    for( gi in gi_list) {
        if(gi_list[gi]["id"] === id) {
            entry = gi_list[gi];
            break;
        }
    }

    if( entry === {} ) alert ("WARNING NOT FOUND");
    seller = entry["seller"] 
    name = entry["name"]
    description = entry["description"]
    price = entry["price"]
    image_url = entry["image_url"]

    $('#update-id').text(id);
    
    $('#update-seller').val(seller);
    $('#update-name').val(name);
    $('#update-description').val(description);
    $('#update-price').val(price);
    $('#update-image-url').val(image_url);
    
}

function updateGi(id) {
    name = $('#update-name').val();
    description = $('#update-description').val();
    price = $('#update-price').val();
    imageURL = $('#update-image-url').val();
	$.ajax({
	        type: "POST",
	        url: "/update_gi",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"seller": seller,
                                   "name": name,
                                   "description": description,
                                   "price": price,
                                   "image_url": imageURL,
                                   "id": id}),
		    success: function(data, text){
                gi_list = data["gi_list"];
                displayGis(gi_list);
                alert(" gi updated");

                $('#update-seller').val("");
                $('#update-name').val("");
                $('#update-description').val("");
                $('#update-price').val("");
                $('#update-id').val("");
                $('#update-image-url').val("");

                $('#editModal').modal('hide');
		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)
                alert("Error during update");

		    }
	    });	

}


function newGi() {
    name = $('#enter-name').val();
    description = $('#enter-description').val();
    price = $('#enter-price').val();
    imageURL = $('#enter-image-url').val();

	$.ajax({
	        type: "POST",
	        url: "/create_gi",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"seller": seller,
                                   "name": name,
                                   "description": description,
                                   "price": price,
                                   "image_url": imageURL}),
		    success: function(data, text){
                gi_list = data["gi_list"];
                displayGis(gi_list);
                console.log(gi_list);
                alert("Added gi");
                $('#enter-seller').val("");
                $('#enter-name').val("");
                $('#enter-description').val("");
                $('#enter-price').val("");
                $('#enter-image-url').val("");
		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)
                alert("Error during creation");

		    }
	    });	
}

function deleteGi(id) {
	$.ajax({
	        type: "POST",
	        url: "/delete_gi",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"id": id, "seller": seller} ),
		    success: function(data, text){
                gi_list = data["gi_list"];
                displayGis(gi_list);
                console.log(gi_list);
		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)

		    }
	    });	
}


function displayGis(giList) {
    console.log(giList)
    $("#gi-list").empty();
    for(gi in giList) {
        row = getGiRowHTML(giList[gi]);
        $("#gi-list").append(row);
    }
    // register handlers
    $('.delete-button').click(function(){
       id = $(this).data("id");
       deleteGi(id);
    });
    $('.edit-button').click(function() {
        id = $(this).data("id");
        fillUpdateForm(id);

    });
    $('.buy-button').click(function() {
        alert("GI PURCHASED!");
    });
}

function installStationaryHandlers() {
    
    $('#search-button').click(function() {
        searchString = $('#search-box').val();
        searchGis(searchString);
    });
    $('#submit-gi').click(function() {
        newGi();
    });
    $('#update-gi').click(function() {
        id = parseInt($("#update-id").text(), 10);
        updateGi(id);
    });
}

function init() {
    displayGis(gi_list);
    installStationaryHandlers();
    addCreateButton();
    $('#sales-nav-item').addClass('active');
    
} 

/** Main */
$(document).ready(function() { init(); });
