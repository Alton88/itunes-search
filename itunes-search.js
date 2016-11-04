
function performSearch() {
	var searchWord = $('#search-keyword').val().replace(/\s+/g, "");
				
    var params = {
        term: encodeURIComponent(searchWord),				
        country: 'US',
        media: 'music',
        entity: 'musicTrack',
        limit: 10,
        callback: 'displayResults'            
    };
				
    var params = createUrlString(params);
    var url = 'http://itunes.apple.com/search?' + params;
    var html = '<script src="' + url + '"><\/script>';
		
    $('head').append(html);
}			

function createUrlString(obj) {
    var urlString = '';
	for (var key in obj) {
		urlString += encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]) + '&';
    }
				
    if (urlString.length > 0) {
        urlString = urlString.substr(0, urlString.length - 1);
    }

    return (urlString);	        		               
}            
				
function displayResults(arg) {
    var results = arg.results;
    var html = '';            
    for (var i = 0; i < results.length; i++) {            
        var item = results[i];
		
        var obj = {
            source: 0,
			albumCover: item.artworkUrl100 , 
            trackName: item.trackName,
            artistName: item.artistName,
            collectionName: item.collectionName,
            genre: item.primaryGenreName
        };
		
        results[i] = obj;
					
		html += '<table>'
		html += '<tr>'
		html +=	'<td><img align="center" src="{0}" alt="No Image Available">'.replace("{0}", obj.albumCover);
		html +=	'<td>Artist: {0}<br/>'.replace("{0}", obj.artistName);				
		html +=	'Track: {0}<br/>'.replace("{0}", obj.trackName);
		html += 'Album: {0}<br/>'.replace("{0}", obj.collectionName);
		html += 'Genre: {0}<br/></td>'.replace("{0}", obj.genre);				
		html += '<td align="right">Preview: '
		html += '<audio controls id="player" preload="none" style="width: 30%;">'
		html += '<source src="{0}" type="audio/mp4" /></td>'.replace("{0}", item.previewUrl);
		html += '</tr>'
		html += '<hr/>'
		html += '</table>'	
	}
				
		html +='<nav aria-label="..." align="center">'
		html +='<ul class="pagination">'
		html +='<li class="page-item disabled">'
		html +='<span class="page-link" aria-label="Previous">'
		html +='<span aria-hidden="true">&laquo;</span>'
		html +='<span class="sr-only">Previous</span>'
		html +='</span>'
		html +='</li>'
		html +='<li class="page-item active"><span class="page-link">1 <span class="sr-only">(current)</span></span></li>'
		html +='<li class=""><span class="page-link">2 <span class="sr-only"></span></span></li>'
		html +='</ul>'
		html +='</nav>'/**/

        $('#itunes-results').html(html);

}