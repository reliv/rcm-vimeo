<?php

/**
 * ZF2 Plugin Config file
 *
 * This file contains all the configuration for the Module as defined by ZF2.
 * See the docs for ZF2 for more information.
 *
 * PHP version 5.3
 *
 * LICENSE: No License yet
 *
 * @category  Reliv
 * @author    Westin Shafer <wshafer@relivinc.com>
 * @copyright 2012 Reliv International
 * @license   License.txt New BSD License
 * @version   GIT: <git_id>
 */

return [
    'asset_manager' => [
        'resolver_configs' => [
            'aliases' => [
                'modules/rcm-vimeo/' => __DIR__ . '/../public/',
            ],
        ],
    ],
    'rcmPlugin' => [
        'RcmVimeo' => [
            'type' => 'Common',
            'display' => 'Vimeo embed html',
            'tooltip' => 'An editable area that allows you to add Vimeo embed, text, images, lists, links and more.',
            'icon' => '/modules/rcm-vimeo/icon.png',
            'canCache'=> true
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
