/******************************************************
 * @package Magento 2 Ui
 * @author https://magefox.com
 * @copyright (C) 2021 - Magefox.Com
 * @license MIT
 *******************************************************/

define([
    'jquery',
    'Vue',
    'underscore'
], function ($, Vue, _) {
    'use strict';

    var wrapper = undefined;

    /**
     * Check a node is DOM element
     *
     * @param node
     * @returns {boolean}
     */
    function isElement(node) {
        try {
            //Using W3 DOM2 (works for FF, Opera and Chrome)
            return node instanceof HTMLElement;
        }
        catch(e){
            //Browsers not supporting W3 DOM2 don't have HTMLElement and
            //an exception is thrown and we end up here. Testing some
            //properties that all elements have (works on IE7)
            return (typeof node==="object") && (node.nodeType===1) && (typeof node.style === "object") && (typeof node.ownerDocument ==="object");
        }
    }

    /**
     * Load node component file via requirejs.
     *
     * @param {Object} node
     */
    function loadSource(node) {
        var loaded = $.Deferred(),
            source = node.component;

        require([source], function (constr) {
            loaded.resolve(node, constr);
        });

        return loaded.promise();
    }

    /**
     * Load node dependencies on other instances.
     *
     * @param {Object} node
     */
    function loadDeps(node) {
        var loaded = $.Deferred();
        loaded.resolve(node);

        return loaded.promise();
    }

    function initComponent(node, Constr) {
        var elems = [],
            regex = new RegExp('(^|\\s)scope(|\\s):(|\\s)(\'|")' + node.target + '(\'|")');

        delete node.component;
        delete node.target;

        if (wrapper !== undefined) {
            elems.push(wrapper);
        } else {
            elems = $('[data-bind]').filter(function () {
                return $(this).data('bind').match(regex);
            });
        }

        _.each(elems, function (el) {
            var Component = Constr.extend({
                el: el,
                data: function () {
                    return node;
                }
            });
            var component = new Component();

            console.log(component);
        });
    }

    function run(nodes, container) {
        if (isElement(container)) {
            wrapper = container;
        }

        _.each(nodes || [], function (node, target) {
            if (!node.component) {
                return this;
            }

            node.target = target;

            loadDeps(node)
                .then(loadSource)
                .done(initComponent);
        });

        return this;
    }

    return run;
});
