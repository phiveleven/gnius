[gnius](http://phiveleven.com/gnius/) 
==

gnius is a jQuery plugin for client-side HTML templating.
* it can iterate and clone for arrays
* it can recurse
* it can defer
* it has no documentation but you are smart
* [open an issue](https://github.com/phiveleven/gnius/issues/new)

What you need to run gnius
--------------------------

You will need [jQuery](http://jquery.com):

`<script src="http://code.jquery.com/jquery-latest.min.js"></script>`

[fork gnius](https://github.com/phiveleven/gnius/fork_select):

`<script src="gnius.js"></script>`

The basics
----------
Your application data:

    <script>
    var articles = [
     { title: "Template library takes everyone by surprise", icon: "something.png", summary: "Lorem ipsum..." },
     { title: "Internet will be bright", icon: "something.png", summary: "Lorem ipsum..." },
     { title: "Important announcement from developers", icon: "something.png", summary: "Lorem ipsum..." },
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



