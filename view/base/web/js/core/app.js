/******************************************************
 * @package Magento 2 Ui
 * @author https://magefox.com
 * @copyright (C) 2021 - Magefox.Com
 * @license MIT
 *******************************************************/

define([
    './renderer/layout',
], function (layout) {
    'use strict';

    return function (data, merge) {
        layout(data.components, merge);
    };
});
