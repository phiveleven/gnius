[gnius](http://phiveleven.com/gnius/) 
  - smarter than your honor roll child.
================================

gnius is a jQuery plugin for client-side HTML templating.

What you need to run gnius
--------------------------

You will need [jQuery](http://jquery.com) version 1.4.2 or higher.
`<script src="http://code.jquery.com/jquery-1.4.3.min.js"></script>`

Add gnius.
`<script src="gnius.js"></script>`

The basics
----------
Your application data:
<script>
var articles = [
 { title: "Internet is an infinite loop", icon: "something.png", summary: "Lorem ipsum..." },
 { title: "Your mom is an infinite loop", icon: "something.png", summary: "Lorem ipsum..." },
 { title: "Your face is an infinite loop", icon: "something.png", summary: "Lorem ipsum..." },
];
</script>

Markup:
<article>
  <h2>$title</h2>
  <img src="$icon" />
  <p>$summary</p>
</article>

Magic:
<script>
$('article').interpolate(articles);
</script>



