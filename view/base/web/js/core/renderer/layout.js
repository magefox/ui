/******************************************************
 * @package Magento 2 Ui
 * @author https://magefox.com
 * @copyright (C) 2021 - Magefox.Com
 * @license MIT
 *******************************************************/

define([
    'jquery',
    'muiUtils',
    'underscore'
], function ($, muiUtils, _) {
    'use strict';

    var layout = {},
        wrapper = undefined;

    /**
     * Load node component file via requirejs.
     *
     * @param {Object} node
     */
    function loadSource(node) {
        var loaded = $.Deferred(),
            source = node.component,
            template = node.template
        ;

        if (template === undefined) {
            require([source], function (constr) {
                loaded.resolve(node, constr);
            });
        } else {
            require([source, 'text!' + template + '.html'], function (constr, template) {
                loaded.resolve(node, constr, template);
            });
        }

        return loaded.promise();
    }

    function initComponent(node, Constr, template) {
        var elems = [],
            regex = new RegExp('(^|\\s)scope(|\\s):(|\\s)(\'|")' + node.target + '(\'|")');

        delete node.component;
        delete node.target;
        delete node.template;

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
                template: template,
                data: function () {
                    return node;
                }
            });
            var component = new Component();
        });
    }

    function run(nodes, container) {
        if (muiUtils.isDomElement(container)) {
            wrapper = container;
        }

        _.each(nodes || [], function (node, target) {
            if (!node.component) {
                return this;
            }

            node.target = target;

            loadSource(node)
                .done(initComponent);
        });

        return this;
    }

    return run;
});
