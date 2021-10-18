/******************************************************
 * @package Magento 2 Ui
 * @author https://magefox.com
 * @copyright (C) 2021 - Magefox.Com
 * @license MIT
 *******************************************************/

define([
    'muiComponent'
], function (Component) {
    'use strict';

    return Component.extend({
        created() {
            console.log('Child component');
        }
    });
});
