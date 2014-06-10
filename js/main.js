// Make an instance of two and place it on the page.
var elem = document.getElementById('bork');
var params = { width: document.body.clientWidth, height: document.body.clientHeight-10 };
var two = new Two(params).appendTo(elem);

var flames = two.interpret(document.getElementById('flames'));
var face = two.interpret(document.getElementById('face'));

var angle = 0;

// Do some translation voodoo to get the rotation point right
var f = face.getBoundingClientRect();
face.translation.set( -(f.left + f.width/2), -(f.top + f.height/2)+2 );
flames.translation.set( -(f.left + f.width/2), -(f.top + f.height/2)+5 );

var fire = two.makeGroup(flames);
var skulleh = two.makeGroup(fire, face);

skulleh.center();
skulleh.translation.set(two.width / 2, two.height / 2);

two.bind('update', function(frameCount) {
  
	if(angle > Math.PI*2)
	{
		angle = 0;
	}
	fire.rotation         = (Math.sin(angle)*0.3)+0.35;
	face.translation.y    -= Math.sin(angle)*0.1;
	skulleh.translation.y -= Math.sin(angle)*5;
	skulleh.translation.x -= Math.sin(angle);

  angle += 0.09;

}).play();