/*
	This script adds a top SciServer Banner to the top of the page.
	Content depends on the context as determined from the "/dr##/" in the 
	document url. 
*/

// PARSE URL FOR DR# TO DETERMINE WHICH MESSAGE TO SHOW. 
// DON''T SHOW MESSAGE ON TOOLS PAGES - THEY USE FRAMESETS.
if ( !( /\/explore\//i.test( document.URL ) || 
		/\/chart\//i.test( document.URL ) || 
		/\/quicklook\//i.test( document.URL ) ) && 
	 ( /dr([0-9]+)/i.test( document.URL ) ) ) {
	 
	var drurl = /\/dr([0-9]+)\//i.exec( document.URL )[1];
	var script = document.createElement('script');
	var head = document.getElementsByTagName('head')[0];
	script.type = 'text/javascript';
	
	switch(drurl) {
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
			script.src = "http://www.sciserver.org/messages/messagedr1to7.js";
			head.appendChild(script);
			break;
		default:
	}
}