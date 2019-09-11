
var salesperson = "Dwight K. Schrute"



$(document).ready(function(){
	// LOG SALES	
	$( "#enter_client" ).autocomplete({
      source: clients
    });
    
	$("#submit_sale").click(function(){
		submitSale()
	})

	$("#enter_reams").keypress(function(e){		
	    if(e.which == 13) {
	        submitSale()
	    }	
	})
	
	display_sales_list(sales)	

	
})



var display_sales_list = function(sales){
	$("#sales").empty()

	if(sales.length == 0){
		var row = $("<div class='row'>")
		var col_client = $("<div class='col-md-4'>")
		$(col_client).append("No Sales")		
		$("#sales").append(row)
	}else {
		sales.reverse()

		$.each(sales, function(i, sale){
			
			var row = $("<div class='row bottom_row_padding'>")
			var col_salesperson = $("<div class='col-md-2'>")
			$(col_salesperson).append(sale["salesperson"])
			$(row).append(col_salesperson)


			var col_client = $("<div class='col-md-4'>")
			$(col_client).append(sale["client"])
			$(row).append(col_client)

			var col_reams = $("<div class='col-md-2'>")
			$(col_reams).append(sale["reams"])
			$(row).append(col_reams)

			var col_salesperson = $("<div class='col-md-3'>")

			var id = sale["id"]
			var delete_button = $("<button class='btn btn-warning' data-id='"+id+"'>X</button>")
			
			$(delete_button).click(function(){
				//delete this item (by id) from the server.
				// get new data and display it all.
				var this_id = $(this).data("id")				
				delete_sale(this_id)

			})
			
			$(col_salesperson).append(delete_button)
			$(row).append(col_salesperson)

			$("#sales").append(row)
		})

	}
}

var delete_sale = function(id){
	$.ajax({
	        type: "POST",
	        url: "delete_sale",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify({"id": id}),
		    success: function(data, text){
		        var sales = data["sales"]
				display_sales_list(sales)

				

		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)

		    }
	    });	
}

var save_sale = function(new_sale){
	$.ajax({
	        type: "POST",
	        url: "save_sale",                
	        dataType : "json",
	        contentType: "application/json; charset=utf-8",
	        data : JSON.stringify(new_sale),
		    success: function(data, text){
		    	//update the sales DB and re-display it
		        var sales = data["sales"]
				display_sales_list(sales)

				//update the clients			
				clients = data["clients"]				
				$( "#enter_client" ).autocomplete({
			      source: clients
			    });


				// reset the text so users can type there				
				$("#enter_client").val("")
				$("#enter_reams").val("")
				$("#enter_client").focus()



		    },
		    error: function(request, status, error){
		    	console.log("Error");
		        console.log(request)
		        console.log(status)
		        console.log(error)

		    }
	    });	
}

var submitSale = function(){
	var client = $("#enter_client").val()
	var reams = $.trim( $("#enter_reams").val() )
	console.log(client+" "+reams)

	if($.trim(client) == ""){
		alert("Hey! The client can't be empty!")
		$("#enter_client").val("")
		$("#enter_client").focus()
	}else if (reams == ""){
		alert("Hey! The # reams can't be empty!")
		$("#enter_reams").val("")
		$("#enter_reams").focus() 
	}else if (!$.isNumeric(reams)){ 
		alert("Hey! The # reams had to be a number!")
		$("#enter_reams").focus()
	}else{
		
		var new_sale = {
			"salesperson": salesperson,
			"client": client,
			"reams": reams
		}

	    save_sale(new_sale)


	}
}


