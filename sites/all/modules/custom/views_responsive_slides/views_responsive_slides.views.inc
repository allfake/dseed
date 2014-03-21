<?php

/**
 * Implements hook_views_plugins().
 */
function views_responsive_slides_views_plugins() {
  return array(
    'style' => array(
      'responsive_slides' => array(
        'title' => t('Responsive Slides'),
        'help' => t('Display the results as a responsive slides.'),
        'handler' => 'views_responsive_slides_style_plugin',
        'uses options' => TRUE,
        'uses row plugin' => TRUE,
        'type' => 'normal',
        'path' => drupal_get_path('module', 'views_responsive_slides'),
        'theme' => 'views_responsive_slides',
        'theme path' => drupal_get_path('module', 'views_responsive_slides') . '/theme',
        'theme file' => 'views_responsive_slides.theme.inc',
      ),
    ),
  );
}
