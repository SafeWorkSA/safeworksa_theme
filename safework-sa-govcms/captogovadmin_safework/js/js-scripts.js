/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.templates_files = [ Drupal.settings.basePath + Drupal.settings.pathToTheme + '/js/js-custom-templates.js' ];
	config.templates_replaceContent = false;
};
