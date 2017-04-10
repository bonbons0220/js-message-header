/* 
 INSERTS A HEADER AT THE TOP OF THE PAGE 
 WITH A LINK TO THE LATEST DATA RELEASE
 AS DETERMINED FROM THE URL.
 TO TEST THIS ON ANY PAGE OPEN THE CONSOLE BY
 PRESSING  F12 THEN ENTER THE FOLLOWING:
 
script = document.createElement('script');
script.type = 'text/javascript';
script.src = "http://www.sciserver.org/messages/messagedr1to7.js";
head = document.getElementsByTagName('head')[0];
head.appendChild(script);

   OR
   
RUN jQuerify (google it) AND ENTER IN THE CONSOLE:

$.getScript("http://www.sciserver.org/messages/messagedr1to7.js") 

*/
var script = document.createElement('script');
var head = document.getElementsByTagName('head')[0];
script.type = 'text/javascript';
script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
script.onreadystatechange = docLoaded;
script.onload = docLoaded;
head.appendChild(script);

function docLoaded(){
	// LOAD STYLESHEET
	$('head').append('<link rel="stylesheet" type="text/css" href="//www.sciserver.org/messages/message.css">');
	
	// LOAD MESSAGE.TXT
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			// INJEXT THE HTML IF THE BODY EXISTS 
			// (N.B. THERE IS NO 'BODY' TAG IN THE EXPLORE, CHART, OR QUICKLOOK)
			if ( $('body').length ) {
			
				$('body').prepend( this.responseText ); 
			
				// FIND AND SHOW THE DATA RELEASE #
				var drurl = /\/dr([0-9]+)\//i.exec( document.URL )[1];
				$( 'span#drnumber' ).text( drurl );
							
				// MOVE ANY ABSOLUTE POSITIONED ELEMENTS DOWN THE HEIGHT AND TOP + BOTTOM MARGINS
				var y = $($('div#header-message')[0]).outerHeight();
				var el = $('*').filter(function(){
				   return ( $(this).css('position') === 'absolute' ) || ( $(this).css('POSITION') === 'absolute' );
				});
				$(el).each (function () {
					$(this).css( {top: parseInt( $(this).css('top') ) + y + 'px' } );
				});
				
			} else if ( $('frameset').length ) {
				newframeset='<frameset><frame src=""//www.sciserver.org/messages/messagedr1to7.html""></frame></frameset>'
				$($('frameset *:first-child')[0]).before(newframeset);				
			}
		}
	};
	xhttp.open("GET", "//www.sciserver.org/messages/messagedr1to7.txt", true);
	xhttp.send();
}