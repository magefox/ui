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
        data: function () {
            return {
                'title1': 'Test title 2'
            };
        },
        created() {
            console.log('Child component');
        },
        computed: {
            'titleComputed': function () {
                return this.title + ' computed';
            }
        }
    });
});
