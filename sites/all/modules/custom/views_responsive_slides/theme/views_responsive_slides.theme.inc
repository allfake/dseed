<?php

/**
 * Theme views_responsive_slides().
 */
function template_preprocess_views_responsive_slides(&$variables) {
  $view = $variables['view'];
  $result = $view->result;
  $slides = array();
  $options = array_merge($view->style_options, $view->style_plugin->options);
  unset($options['uses_fields'], $options['grouping']);
  $text_options = array('prevText', 'nextText', 'playText', 'pauseText', 'indicatorTemplate');
  foreach ($text_options as $option) {
    $options[$option] = t($options[$option], array(), array('context' => 'responsive_slides'));
  }
  $slides = $variables['rows'];

  $variables['slides'] = $slides;
  $variables['slide_id'] = 'rslides-'. $view->name .'-'. $view->current_display;

  $module_path = drupal_get_path('module', 'views_responsive_slides');
  drupal_add_css($module_path .'/js/responsiveslides.css');
  drupal_add_js($module_path .'/js/responsiveslides.js');
  drupal_add_js($module_path .'/js/views_responsive_slides.js');
  drupal_add_js(array(
    'viewsResponsiveSlides' => array(
      $variables['slide_id'] => $options,
    ),
  ), 'setting');
}
