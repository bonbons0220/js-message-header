// TEST THIS ON ANY PAGE. OPEN THE CONSOLE WITH F12. 
// USE JQUERIFY (google it) TO ADD JQUERY TO THE PAGE.
// THEN TYPE THE FOLLOWING:
// $.getScript("http://www.sciserver.org/messages/messagedr1to7.js"></script>');

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
script.onreadystatechange = docLoaded;
script.onload = docLoaded;

var head = document.getElementsByTagName('head')[0];
head.appendChild(script);

function docLoaded(){
	// LOAD STYLESHEET
	//$('head').append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">');
	
	$('head').append('<link rel="stylesheet" type="text/css" href="//www.sciserver.org/messages/messagedr1to7.css">');
	
	// LOAD MESSAGE.TXT
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			$('body').prepend( this.responseText ); 
			
			// FIND AND SHOW THE DATA RELEASE #
			//var drmsg = $('a[href*="Welcome"]' , 'td.midbodyText')[0].text;
			var drmsg = $("td.midbodyText:contains('Welcome')")[0].text;
			if ( /[0-9]+/.exec(drmsg) ) {
				$( 'span#drnumber' ).text( /[0-9]+/.exec(drmsg) );
			}else {
				$( 'span#drnumber' ).text( "1" );
			}
			
			// MOVE ANY ABSOLUTE POSITIONED ELEMENTS DOWN THE HEIGHT AND TOP + BOTTOM MARGINS
			var y = $($('div#header-message')[0]).outerHeight();
			var el = $('*').filter(function(){
			   return ( $(this).css('position') === 'absolute' ) || ( $(this).css('POSITION') === 'absolute' );
			});
			$(el).each (function () {
				$(this).css( {top: parseInt( $(this).css('top') ) + y + 'px' } );
			});
		}
	};
	xhttp.open("GET", "//www.sciserver.org/messages/messagedr1to7.txt", true);
	xhttp.send();
}