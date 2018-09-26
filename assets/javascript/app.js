// https://api.giphy.com/v1/gifs/search?api_key=DGO8o3GLH8FdLjs2Orr9XM48VgDnHxf9&limit=5&q=lemur
const apiKey = 'DGO8o3GLH8FdLjs2Orr9XM48VgDnHxf9';
const searchResultLimit = 5;

// jquery DOM objects
$addTopicButton = $('#add-topic-button');
$searchBar = $('#add-topic-searchbar');
$contentArea = $('#gif-grid')

$('document').ready(function() {
    // listen for an enter keypress and treat it like a button click for adding a gif topic
    $searchBar.keypress(function(event) {
        if(event.which == 13) {
            $addTopicButton.click();
        }
    })
    // When a gif still is clicked, swap the still url with the animated url
    $('.gif').on('click', function() {
        console.log('User clicked ' + $(this).val('class'));
    })

    // When a topic search term is added, handle the Giphy API call
    $addTopicButton.on('click', function() {
        
        var searchTerm = $searchBar.val().trim();
        var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&limit=' + searchResultLimit + '&q=' + searchTerm;
        // clear the user's search term after entering
        $searchBar.val('');
        $searchBar.attr('placeholder', 'Add another topic');
    
        $.ajax({
        url: queryUrl,
        method: "GET"
        }).then(function(response) {
            var responseObject = response.data;
    
            var responseKeys = Object.keys(responseObject);

            // Step through responseObject, create img tags for each image, and present them in $contentArea
            for ( var key in response.data ) {
                console.log(response.data[key].images.fixed_height_small_still.url);
                var stillUrl = response.data[key].images.fixed_height_small_still.url;
                var responseImage = $('<img>');
                responseImage.attr('src', stillUrl);
                responseImage.attr('id', key);
                responseImage.attr('class', searchTerm);
                // Append the 'gif' to the class attribute instead of replacing it
                responseImage.attr('class', function() { return $(this).attr('class') + ' gif'});

                $contentArea.prepend(responseImage);
            }

            console.log('responseItems: ' + responseKeys);
    
            // 
    
            //var responseImage = $("<img>");
    
            //responseImage.attr("src", imageUrl);
            //console.log('responseImage is: ' + responseImage);
    
            //$contentArea.prepend(responseImage);
    
        });
})

});