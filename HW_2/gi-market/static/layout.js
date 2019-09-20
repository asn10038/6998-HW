
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
    $('#go-to-seller-button').click(function() {
        window.location.href = '/gi-sellers/' + $('#seller-name-input').val();
    });
}

/** Main */
$(document).ready(function() { layout_init(); });
