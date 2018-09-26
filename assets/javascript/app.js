// https://api.giphy.com/v1/gifs/search?api_key=DGO8o3GLH8FdLjs2Orr9XM48VgDnHxf9&limit=5&q=lemur
const apiKey = 'DGO8o3GLH8FdLjs2Orr9XM48VgDnHxf9';
const searchResultLimit = 2;

// jquery DOM objects
$addTopicButton = $('#add-topic-button');
$searchBar = $('#add-topic-searchbar');
$contentArea = $('#gif-grid');
$gifItem = $('.gif');

$('document').ready(function() {
    // listen for an enter keypress and treat it like a button click for adding a gif topic
    $searchBar.keypress(function(event) {
        if(event.which == 13) {
            $addTopicButton.click();
        }
    })

    // When a topic search term is added, handle the Giphy API call
    $addTopicButton.on('click', function() {
        var searchTerm = $searchBar.val().trim();
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&limit=' + searchResultLimit + '&q=' + searchTerm;

        // clear the user's search term after entering
        $searchBar.val('');
        if ( $contentArea.is(':empty') )
            $searchBar.attr('placeholder', 'Add a topic');
        else
            $searchBar.attr('placeholder', 'Add another topic');
    
        $.ajax({
        url: queryUrl,
        method: "GET"
        }).then(function(response) {
            var responseObj = response.data;

            // Step through responseObj, create img tags for each gif, and present them in $contentArea
            for ( var key in responseObj ) {
                var stillUrl = responseObj[key].images.fixed_height_small_still.url;
                var responseImage = $('<img>');
                // responseImage.attr('id', key);
                responseImage.addClass(searchTerm);
                responseImage.addClass('gif');
                responseImage.attr('data-state', 'still');
                responseImage.attr('data-still', responseObj[key].images.fixed_height_small_still.url);
                responseImage.attr('data-animate', responseObj[key].images.fixed_height_small.url);
                responseImage.attr('src', stillUrl);
                // Add attributes for still and animated

                $contentArea.prepend(responseImage);
            } // End for(key in response.data)
            
            // TODO: Add a new topic button
            
        }); // End AJAX call

        // When a gif is clicked, toggle between animated and still
        $($contentArea).on('click', '.gif', function() {
            if ( $(this).attr('data-state') === 'still' ) {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
            else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        }) // End .on(click...)

    }) // End $addTopicButton.on(click...)



});