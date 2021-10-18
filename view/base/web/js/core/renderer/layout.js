/******************************************************
 * @package Magento 2 Ui
 * @author https://magefox.com
 * @copyright (C) 2021 - Magefox.Com
 * @license MIT
 *******************************************************/

define([
    'jquery',
    'muiComponent',
    'uiRegistry',
    'underscore'
], function ($, uiRegistry, _) {
    'use strict';

    var layout = {};

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

        uiRegistry.get(node.deps, function (deps) {
            console.log(node);
            loaded.resolve(node);
        });

        return loaded.promise();
    }

    function initComponent(node, Constr) {
        var data = _.clone(node);
        delete data.component;
        node.data = data;
        var component = new Constr(_.omit(node, 'children'));

        uiRegistry.set(node.name, component);
    }

    function run(nodes, merge) {
        if (_.isBoolean(merge) && !merge) {

        }

        _.each(nodes || [], layout.iterator.bind(layout));

        // if (!node.component) {
        //     return this;
        // }
        //
        // loadDeps(node)
        //     .then(loadSource)
        //     .done(initComponent);
        //
        // return this;
    }

    return run;
});
