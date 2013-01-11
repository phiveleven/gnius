[gnius](http://phiveleven.com/gnius/) 
==

gnius is a jQuery plugin for client-side HTML templating.
* it can iterate and clone for arrays
* it can recurse
* it can defer
* it has no documentation but you are smart
* 

What you need to run gnius
--------------------------

You will need [jQuery](http://jquery.com):

`<script src="http://code.jquery.com/jquery-latest.min.js"></script>`

[get gnius](https://github.com/phiveleven/gnius/fork_select):

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



