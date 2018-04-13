<?php
/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */


/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */


/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */


/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */


function captogovadmin_safework_form_alter( &$form, &$form_state, $form_id ){
	if($form_id == "page_node_form" && $form['type']['#value'] == "page") {
		$form['scheduler_settings']['unpublish_on']['#title'] = "Set review date";
		$form['scheduler_settings']['unpublish_on']['#description'] = "Leave blank for no review schedule";
	}
	if($form_id == "event_node_form" && $form['type']['#value'] == "event") {
		$form['actions']['submit']['#value'] = t('Submit');
	}
}

// Load plugin scripts and css only on homepage
function captogovadmin_safework_preprocess_page(&$vars) {
	// dpm($vars);

	// add path to theme to javascript variable
	drupal_add_js('jQuery.extend(Drupal.settings, { "pathToTheme": "' . path_to_theme() . '" });', 'inline');
}

function captogovadmin_safework_preprocess_node(&$vars) {
	//
}

function captogovadmin_safework_wysiwyg_editor_settings_alter(&$settings, $context) {
  if ($context['profile']->editor == 'ckeditor') {
    $settings['customConfig'] = base_path() . drupal_get_path('theme', 'captogovadmin_safework') . '/js/js-scripts.js';
  }
}
