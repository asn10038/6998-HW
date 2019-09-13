/* File contains all the logic for the gi market basic app */

/** Globals */

/** Functions  */
function getGiRowHTML(gi) {
    res = '<div class="row giRow"> ' 
                +'<div class="col-md-2">'
                + "<img class='tinyImage' src='" + gi["image_url"] + "'></img>"
                + '</div>'
                + '<div class="col-md-8"> '
                   +   '<ul>'
                   +   '<li>' +  gi["seller"] + '</li>'
                   +   '<li>' +  gi["name"] + '</li>'
                   +   '<li>' +  gi["description"] + '</li>'
                   +   '<li> $' +  gi["price"] + '</li>'
                   + '</ul>'
               + '</div>'
               + '<div class="col-md-2">'
                    + '<button type="button" class="btn btn-danger delete-button" data-id="' + gi["id"] +'">Delete</button>' 
                    + '<button type="button" class="btn btn-primary edit-button" data-id="' + gi["id"] + '">Edit</button>' 
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
		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)

		    }
	    });	
}

function deleteGi(id) {
	$.ajax({
	        type: "POST",
	        url: "delete_gi",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"id": id}),
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

function searchGis(searchString) {
	$.ajax({
	        type: "POST",
	        url: "search_gi",
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"query": searchString}),
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
    $("#gi-list").empty();
    for(gi in giList) {
        row = getGiRowHTML(giList[gi]);
        $("#gi-list").append(row);
    }
}

function init() {
    $(document).ready(function() {
        displayGis(gi_list);
        
        // register handlers
        $('.delete-button').click(function(){
           id = $(this).data("id");
           deleteGi(id);
        });
        $('#search-button').click(function() {
            searchString = $('#search-box').val();
            searchGis(searchString);
        });
        $('#submit-gi').click(function() {
            newGi();
        });
        $('.edit-button').click(function() {
            id = $(this).data("id");
            fillUpdateForm(id);

            /*id = $(this).data("id");
            $("#update-id").val(id);
            updateGi(id);*/
        });
        $('#update-gi').click(function() {
            id = parseInt($("#update-id").text(), 10);
            updateGi(id);
        });
    });
} 

/** Main */
init();
