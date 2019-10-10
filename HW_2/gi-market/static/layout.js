
/* Logic pertaining to the layout page */

/** Globals */

/** Functions  */
function searchGis(searchString) {
    console.log("searching for " + searchString);
    window.location.href = '/search/' + searchString;
}

function layout_init() {
    console.log('init handlers registered');
    $('#home-search').click(function() {
        console.log('home-search=clicked');
        searchString = $('#search-box').val()
        searchGis(searchString);
    });

    $('#home-search').keypress(function(e){
        if(e.which == 13) {
            $('#home-search').click();
        }
    });
    $('#search-box').keypress(function(e){
        if(e.which == 13) {
            $('#home-search').click();
        }
    });

    $('#go-to-seller-button').click(function() {
        window.location.href = '/gi-sellers/' + $('#seller-name-input').val();
    });
    $('#seller-name-input').keypress(function(e) {
        if(e.which == 13)
            $('#go-to-seller-button').click();
    });
}

/** Main */
$(document).ready(function() { layout_init(); });
