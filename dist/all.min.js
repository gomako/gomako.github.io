// Make an instance of two and place it on the page.
var elem = document.getElementById('bork');
var params = { width: document.body.clientWidth, height: document.body.clientHeight };
var two = new Two(params).appendTo(elem);

var skulleh = two.interpret(document.getElementById('skullySkull'));
skulleh.center();
skulleh.translation.set(two.width / 2, two.height / 2);
two.update();