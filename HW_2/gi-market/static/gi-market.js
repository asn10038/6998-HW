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
                   +   '<li class="list-group-item"> <span class="infoLabel"> Price: </span> <strong> $' +  gi["price"] + '</strong> </li>'
                   + '</ul>'
               + '</div>'
               + '<div class="col-md-2">'
                    //+ '<button type="button" class="btn btn-danger delete-button" data-id="' + gi["id"] +'">Delete</button>' 
                    //+ '<button type="button" class="btn btn-primary edit-button" data-id="' + gi["id"] + '">Edit</button>' 
                    + '<button type="button" class="btn btn-info buyButton" data-toggle="modal" data-target="#buyModal" data-id="' + gi["id"] + '">Buy</button>' 
                + '</div>'
           + '</div>'
           + '<hr>'

    return res;
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
    seller = $('#update-seller').val();
    name = $('#update-name').val();
    description = $('#update-description').val();
    price = $('#update-price').val();
    imageURL = $('#update-image-url').val();
	$.ajax({
	        type: "POST",
	        url: "update_gi",                
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
                console.log(gi_list);
                alert(" gi updated");

                $('#update-seller').val("");
                $('#update-name').val("");
                $('#update-description').val("");
                $('#update-price').val("");
                $('#update-id').val("");
                $('#update-image-url').val("");
		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)

		    }
	    });	

}

function newGi() {
    seller = $('#enter-seller').val();
    name = $('#enter-name').val();
    description = $('#enter-description').val();
    price = $('#enter-price').val();
    imageURL = $('#enter-image-url').val();

	$.ajax({
	        type: "POST",
	        url: "create_gi",                
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

		    }
	    });	
}



function displayGis(giList) {
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
    //installStationaryHandlers();
    $('#market-nav-item').addClass('active')
    
} 

/** Main */
$(document).ready(function() { init(); });
