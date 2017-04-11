//Run this function when the doc is done loading
window.onload = function (){

	// Process this page?
	if ( ! /\/dr[0-9]+\//i.test( document.URL ) ) return;
	
	// Load jQuery
	var script = document.createElement('script');
	var head = document.getElementsByTagName('head')[0];
	script.type = 'text/javascript';
	script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
	script.onreadystatechange = jqLoaded;
	script.onload = jqLoaded;
	head.appendChild(script);
	
	return;
}
function jqLoaded(){
	
	// Get Data Release #
	var drurl = /\/dr([0-9]+)\//i.exec( document.URL )[1];
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
				postprocess();
			}
		}
		xhttp.open("GET", "//www.sciserver.org/messages/" + message + ".txt", true);
		xhttp.send();
	
	// or framesets,
	} else if ( $('frameset').length ) {
		
		src='//www.sciserver.org/messages/' + message + '.html';
		
		myframe=window.document.createElement('frame');
		myframe.id='myframe';
		myframe.src=src;
		
		mylink = document.createElement('link');
		mylink.href='//www.sciserver.org/messages/message.css';
		mylink.rel='stylesheet';
		mylink.type='text/css';

		myframe.appendChild(mylink);
		myframeset=$('frameset')[0];
		
		myframeset.rows="50,"+myframeset.rows;
		myframeset.insertBefore(myframe,myframeset.firstChild);
		
		postprocess();
	
	// or something else.
	} else {
		return;
	}
	
	return;
}
function postprocess(){
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
}
function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}
function htmlDecode(value){
  return $('<div/>').html(value).text();
}
/*
Is this a datarelease page?
	get the dr #
	are we dealing with a frameset?
		prepend the message[DRNN].html as a frameset within the first frameset
			[this includes jquery and css]
	are we dealing with a body?
		load jquery
		load css
		add the message[DRNN].txt
*/