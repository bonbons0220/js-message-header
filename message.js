/*
	Adds a top SciServer Banner to the top of a page.
	Banner content depends on context as determined from the 
	document url. 
*/

/*
   Test this on any page. Open the console with F12
   then do one of the following:
   
   Copy and past the following to the console:
   
script = document.createElement('script');
script.type = 'text/javascript';
script.src = "http://www.sciserver.org/messages/message.js";
head = document.getElementsByTagName('head')[0];
head.appendChild(script);

   or
   
   RUN jQuerify (google it) AND ENTER IN THE CONSOLE:
   
$.getScript("http://www.sciserver.org/messages/message.js") 
   
*/
debug=false;
if (debug) console.log('drurl ' + drurl);

// Load jQuery. Makes everything easier...
var script = document.createElement('script');
var head = document.getElementsByTagName('head')[0];
script.type = 'text/javascript';
script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
script.onreadystatechange = jqLoaded;
script.onload = jqLoaded;
head.appendChild(script);
	
function jqLoaded(){
	
	// Get Data Release #
	drurl=0;
	if ( /\/dr[0-9]+\//i.test( document.URL ) ) drurl = /\/dr([0-9]+)\//i.exec( document.URL )[1];
	
	if (drurl>=1 && drurl<=7) {
		message = 'messagedr1to7';
	} else if (drurl>=8 && drurl <=11 ) {
		message = 'messagedr8to11';
	} else {
		message = 'message';
	}
		
	// does this have a body,
	if ( $('body').length ) {
	
		// stylesheet
		$('head').append('<link rel="stylesheet" type="text/css" href="//www.sciserver.org/messages/message.css">');
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				$('body').prepend( this.responseText );
				postprocess(drurl);
			}
		}
		xhttp.open("GET", "//www.sciserver.org/messages/" + message + ".txt", true);
		xhttp.send();
	
	// or framesets,
	} else if ( $('frameset').length ) {
		
		msgframe=window.document.createElement('frame');
		msgframe.name='msgframe';
		msgframe.id='msgframe';
		msgframe.src='//www.sciserver.org/messages/' + message + '.html';
		
		fset0=$('frameset')[0];
		fset1=fset0.cloneNode(true);
		$(fset0).children().each( function() { fset0.removeChild(this) } );
		
		fset0.insertBefore(fset1,fset0.firstChild);
		fset0.insertBefore(msgframe,fset0.firstChild);
		fset0.rows="50,*";
		fset0.cols="*";
		
		postprocess( drurl);
	
	// or something else.
	} else {
		return;
	}
	
	return;
}
function postprocess(){
	// SWAP LOGIN/LOGOUT IF NEEDED
	if ( /token=/i.test( document.URL ) ) $('#header-login-link').prop('href' , $('#header-login-link').prop('href') + document.URL)
	
	// FIND AND SHOW THE DATA RELEASE #
	if (drurl) $( 'span#drnumber' ).text( 'This is SDSS Data Release ' + drurl + '.' );
				
	// MOVE ANY ABSOLUTE POSITIONED ELEMENTS DOWN THE HEIGHT AND TOP + BOTTOM MARGINS
	var y = $($('div#header-message')[0]).outerHeight();
	var el = $('*').filter(function(){
	   return ( $(this).css('position') === 'absolute' ) || ( $(this).css('POSITION') === 'absolute' )|| ( $(this).css('position') === 'ABSOLUTE' )|| ( $(this).css('POSITION') === 'ABSOLUTE' );
	});
	$(el).each (function () {
		$(this).css( {top: parseInt( $(this).css('top') ) + y + 'px' } );
	});
}
 function keystone_login() {
	 window.location.href = "http://portal.sciserver.org/login-portal/Account/Login?callbackUrl=http://skyserver.sdss.org%2fdr13%2fen%2fhome.aspx";
 }
