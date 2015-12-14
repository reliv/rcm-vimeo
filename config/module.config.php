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
            'collections' => [
                'modules/rcm/modules.css' => [
                    'modules/rcm-vimeo/rcm-vimeo.css'
                ],
                'modules/rcm-admin/admin.js' => [
                    'modules/rcm-vimeo/rcm-vimeo-edit.js',
                ],
            ],
        ],
    ],
    'rcmPlugin' => [
        'RcmVimeo' => [
            'type' => 'Social Media',
            'display' => 'Vimeo Player',
            'tooltip' => 'An editable area that allows you to add Vimeo with some html.',
            'icon' => '/modules/rcm-vimeo/icon.png',
            'canCache'=> true,
            'defaultInstanceConfig' => include __DIR__ . '/defaultInstanceConfig.php'
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
