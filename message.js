var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
script.onreadystatechange = handler;
script.onload = handler;

var head = document.getElementsByTagName('head')[0];
head.appendChild(script);

function handler(){
	console.log('jquery added :)');
	$('div #firstdiv').innerHTML = "hello";
}