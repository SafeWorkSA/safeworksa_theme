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
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_maintenance_page(&$variables, $hook) {
  // When a variable is manipulated or added in preprocess_html or
  // preprocess_page, that same work is probably needed for the maintenance page
  // as well, so we can just re-use those functions to do that work here.
  GOVCMS_STARTERKIT_preprocess_html($variables, $hook);
  GOVCMS_STARTERKIT_preprocess_page($variables, $hook);
}
// */

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_html(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  // $variables['classes_array'] =
  //  array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function captogov_safework_preprocess_page(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_node(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');

  // Optionally, run node-type-specific preprocess functions, like
  // GOVCMS_STARTERKIT_preprocess_node_page() or
  // GOVCMS_STARTERKIT_preprocess_node_story().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_comment(&$variables, $hook) {
  $variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the region templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("region" in this case.)
 */
/* -- Delete this line if you want to use this function
function GOVCMS_STARTERKIT_preprocess_region(&$variables, $hook) {
  // Don't use Zen's region--sidebar.tpl.php template for sidebars.
  //if (strpos($variables['region'], 'sidebar_') === 0) {
  //  $variables['theme_hook_suggestions'] =
  // array_diff($variables['theme_hook_suggestions'], array('region__sidebar'));
  //}
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */

function captogov_safework_preprocess_block(&$variables, $hook) {
   // Add cleafix to all blocks
  $variables['classes_array'][] = 'clearfix';
  if($variables['block_html_id']=="block-facetapi-m0l5azttpkq0e1pwu9r002xpm0wet7wo"){
    $variables['elements']['#block']->subject = "Filter by content type";
  }
}

function captogov_safework_preprocess_node(&$vars, $hook) {
  //If landing page load the teasers of child pages
  if ($vars['type'] == 'landing_page') {
   // Pass current node ID to function that gets the children pages in the menu structure
    $children = captogov_safework_childtree($vars['nid']);
    if(gettype($children) == "string"){
      $vars['children_pages'] = $children;
    }
  }

  if ($vars['type'] == 'news_article') {
    drupal_add_js(drupal_get_path('theme', 'captogov_safework') . '/js/social_share_init.js');
  }
  
  // Get the summary as a discrete field.
  $nodeVar = $vars['node'];
  $getItems = field_get_items('node', $nodeVar, 'body');
  $body = array_pop($getItems);
  if(strlen($body['safe_summary']) > 0) {
    $vars['node_summary'] = 
      '<div class="field field-name-body-summary-field field-type-ds field-label-hidden">
        <div class="field-items">
          <div class="field-item even">
            '.$body['safe_summary'].'
          </div>
        </div>
      </div>';
  }
}

// Change search form placeholder
function captogov_safework_form_alter( &$form, &$form_state, $form_id )
{
    if ($form_id == 'search_api_page_search_form_search') {
        $form['keys_2']['#attributes']['placeholder'] = t( 'Search our website' );
    }
    if($form_id == "event_node_form" && $form['type']['#value'] == "event") {
      $form['actions']['submit']['#value'] = t('Submit');
    }
}

// Function to get node ID of children of menu item
function captogov_safework_childtree($nid,$menu='main-menu') {
	// get the whole main menu
	$tree = menu_tree_all_data($menu);
	// Set current node path using node ID
	if(isset($nid)){
		$path = 'node/'.$nid;
	}

  $children = captogov_safework_get_menu_children($tree, $path);

  if(isset($children) && gettype($children) == "array") {
    //Might need to add something here to check that the items are nodes and ignore ones that aren't
    foreach($children as $child){
      $nid = str_replace("node/", "", drupal_get_normal_path($child['link']['link_path']));
      $child_nodes = node_view(node_load($nid), 'compact');
      $rendered_teasers .= render($child_nodes);
    }
  }
  return $rendered_teasers;
}

function captogov_safework_get_menu_children($tree, $path) {
  $mlidValue = null;
  foreach($tree as $item) {

    if ($item['link']['link_path'] == $path) {
      // Find menu link ID of the current page
      return $item['below'];
    } 

    if(!empty($item['below'])) {
      $ret = captogov_safework_get_menu_children($item['below'], $path);

      if($ret != false) {
        return $ret;
      }
    }
  }

  return false;
}

/**
 * This function return all children for the mlid define into the mlid parameter
 *
 * @param $mlid
 *  Give Array with the mlid that you want to define the children.
 *    E.G : $mlid = array( 1373 => 1373 );
 * @param $tree
 *  Give menu_tree_all_data('MyMenu');
 * @param $data
 *  Parameter use to add mlid for child, give empty array.

function captogov_safework_menu_get_child(& $mlid, $tree, & $data) {
  foreach ($tree as $child) {
    if ((in_array($child['link']['plid'], $mlid) || in_array($child['link']['mlid'], $mlid))) {
      $mlid = $mlid + array(
          "" . $child['link']['plid'] => $child['link']['plid'],
          "" . $child['link']['mlid'] => $child['link']['mlid']
        );
      $data = $data + array(
          "" . $child['link']['plid'] => $child['link']['plid'],
          "" . $child['link']['mlid'] => $child['link']['mlid']
        );
      unset($mlid[0]);
      unset($data[0]);
      if (!empty($child['below'])) {
        MYMODULE_menu_get_child($mlid, $child['below'], $data);
      }
    }
  }
}
 */
// And if you need to integrate it:

// $tree = menu_tree_all_data('MY_MENU_NAME');
// $data = array();
// $mlid = array('1374' => 1374); //1374 is an example of mlid
// MYMODULE_menu_get_child($mlid, $tree, $data);
// if (is_array($data) && !empty($data)) {
//    foreach ($data as $mlid) {
//      //do what you want with child
//      dsm($mlid);
//    }
// }



//loop through array and look for mlid, if not found go another level deeper!
function check_menu_array($menu, $mlid){
  if(isset($menu)){
    $first_check = $menu;
  }
  if(isset($next_check)){
    $check_menu = $next_check;
  } else{
    $check_menu = $first_check;
  }
  foreach($check_menu as $child){
    if($child['link']['mlid'] == $mlid){
      $result = $child['below'];
    } else {
      $next_check = $child['below'];
    }
  }
  if(isset($result)){
  	return $result;
	}
}


// //loop through array and look for mlid, if not found go another level deeper!
// function check_menu_array($menu, $mlid){
//   global $result;
//   foreach($menu as $child){
//   dpm($child['below']);
//     if($child['link']['mlid'] == $mlid){
//       $result = $child['below'];
//       // dpm($result);
//       // break;
//     } else {
//       // $result = check_menu_array($child['below'], $mlid);
//       foreach($child['below'] as $second_child){
//         if($second_child['link']['mlid'] == $mlid){
//           $result = $second_child['below'];
//         }
//       }
//     }
//   }
//   return $result;
// }

// Load plugin scripts and css only on homepage
function captogov_safework_preprocess_page(&$vars) {
  //adding twitter plugin and init js
  if(drupal_is_front_page()) {
    // drupal_add_js(drupal_get_path('theme', 'captogov_safework') . '/plugins/twitter-post-fetcher/js/twitterFetcher_min.js');
    //Load newer jQuery version for slick slider
    // drupal_add_js(drupal_get_path('theme', 'captogov_safework') . '/js/jquery-3.1.1.min.js');
    // //Load slick slider with new jQuery version
    // drupal_add_js(drupal_get_path('theme', 'captogov_safework') . '/plugins/slick/slick.min.js');
    // drupal_add_css(drupal_get_path('theme', 'captogov_safework') . '/plugins/slick/slick.css');
    //Set jQuery to noconflict mode and assign to new var, see https://www.drupal.org/docs/7/api/javascript-api/multiple-different-versions-of-jquery-co-existing
    // drupal_add_js(drupal_get_path('theme', 'captogov_safework') . '/js/jquery-noconflict.js');
    //run homepage scripts
    drupal_add_js(drupal_get_path('theme', 'captogov_safework') . '/js/homepage_init.js');
  }

}
// //Customize search results page
// function captogov_safework_preprocess_search_result(&$vars) {

// }
