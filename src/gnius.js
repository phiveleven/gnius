/*!
 * gNius JavaScript Library b20100804163990401
 * http://phiveleven.com/gnius
 *
 * Copyright (c) 2009 phiveleven
 * Dual licensed under the MIT and GPL licenses.
 * http://phiveleven.com/gnius/License
 *
 */
var gNius = (function($){

  $.fn.extend({
    interpolate: function(scope, callback){
      var collection = $();
      // TODO use $.map
      this.each(function(i, node){
        var nodes = gNius.interpolate(node, scope || window);
        if (nodes.length > 1) $(node).replaceWith(nodes);
        jQuery.merge(collection, nodes);
      });
      if (!callback) return collection;
      // TODO: revise callback contexts
      if ('function' == typeof callback)
        return this.each(callback);
      if ('object' == typeof callback)
        return $.each(callback, function(k, v){
          this.each(v);
        });
    }
  });

  var gNius = {
    // template + data
    interpolate: function(template, scope){

      // handle string template: wrap as node
      if (typeof template == 'string') template = $('<div>').html(template);

      // handle DOM node
      if (template.tagName) template = $(template);

      // handle scope
      var ref;
      if (ref = template.attr('data')) {
       scope = gNius.dereference.call(scope, ref);
      }

      // handle data array: distribute data by cloning template
      if (scope instanceof Array) {
        template.removeAttr('data');
        var collection = $();
        for (var i=0, l=scope.length; i<l; i++){
          scope[i]._i = i;
          var node = gNius.interpolate(template.clone(true), scope[i])
          .insertBefore(template);
          jQuery.merge(collection, node);
        }
        template.remove();
        return collection;
      }

      // isolate subtemplates from current interpolation scope
      var subtemplates = [];
      template.find('[data]:not([data-gNtpl])')
        .filter(function(i){
          // filter recursive subtemplates
          return !$(this).parents('[data]').size();
        }).html(function(i, html){
          $(this).attr('data-gNtpl', subtemplates.push(html) - 1);
          return '';
        });

      // handle interpolation itself
      template.html(function(i, html){
        return html.replace(/\$([a-zA-Z_\$][a-zA-Z_\$\d\.]*)/g, function($0, name) {
          return gNius.dereference.call(scope, name) || '';
        });
      }).removeAttr('data');

      // handle isolated subtemplates
      template.find('[data-gNtpl]').each(function(i, node){
        node = $(node);
        node.html(subtemplates[node.attr('data-gNtpl')]);
        node.removeAttr('data-gNtpl');
        ref = node.attr('data');
        node.removeAttr('data');
        // handle not explicitly relative as global
        if (!ref.match(/^\//)) scope = window;
        gNius.interpolate(node, gNius.dereference.call(scope, ref));
      });

      return template;
    },

    /**
     * Evaluates a string against a scope. Generates the whole object tree if
     * necessary.
     *
     * @param {String} reference An identifier for an object
     *
     * @this an object relative to which the scope chain will be evaluated.
     */
    dereference : function(reference) {

      // handle array reference
      if (reference instanceof Array){
        var node = this;
        for (var i = 0, node; node; i++){
          if (typeof reference[i] != 'string') break;
          node = gNius.dereference.call(node, reference[i]);
        }
        return node;
      }

      reference = reference.replace(/^\//,'');
      if (this[reference]) return this[reference];

      // handle REST-like reference
      if (reference.match('/')) {
        return gNius.tree.call(this, reference);
      }

      // handle javascript references
      var re_namedProperty = /\[(["|']).+?\1\]/,
          re_arrayIndex = /\[[\d+]\]/,
          re_identifier = /[a-zA-Z_$][a-zA-Z_$\d]*/,
          re_splitter = new RegExp([
            re_namedProperty.source,
            re_arrayIndex.source,
            re_identifier.source ].join("|"), 'g'),
          items = reference.match(re_splitter),
          item = items[0],
          key = item.replace(/^\[['|"]?(.+?)['|"]?\]$/, '$1');
      if (items.length == 1) return this[key];
      if (typeof this[key] == 'undefined')
        this[key] = (new RegExp(re_arrayIndex)).test(item) ? [] : {};
      return gNius.dereference.call(this[key],
                                    reference.replace(item, ''));
    },

    /**
     * Build an object tree from a REST-like string reference
     */
    tree: function (href){
      href = href.replace(/^\//, '').replace(/\/$/, '');
      if (href.match('/')) {
        var args = href.split('/').concat([].slice.call(arguments, 1));
        var root = gNius.tree.apply(this, args);
        return gNius.dereference.call(root, args);
      }

      if (arguments.length == 1)
        this[href] = gNius.dereference.call(this, href);
      else {
        var leaf =
          typeof arguments[1] == 'function' ?
              arguments[1].call(this, href) :
              gNius.tree.apply(this[href] || {}, [].slice.call(arguments, 1));
         if (leaf instanceof Array)
           this[href] = leaf;
         else this[href] = $.extend(true, this[href] || {}, leaf);
      }


      return this;
    }
  };

  return gNius;

})(jQuery);
