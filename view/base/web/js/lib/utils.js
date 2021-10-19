/******************************************************
 * @package Magento 2 Ui
 * @author https://magefox.com
 * @copyright (C) 2021 - Magefox.Com
 * @license MIT
 *******************************************************/

define([
    'jquery'
], function ($) {
    'use strict';

    return {
        /**
         * Checks if provided value is a dom element.
         *
         * @param {*} node - Value to be checked.
         * @returns {Boolean}
         */
        isDomElement: function (node) {
            return typeof node === 'object' && node.tagName && node.nodeType;
        }
    }
});
