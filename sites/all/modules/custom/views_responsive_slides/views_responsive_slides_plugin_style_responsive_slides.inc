<?php

class views_responsive_slides_plugin_style_responsive_slides extends views_plugin_style_list {

  // Set default options
  function option_definition() {
    $options = parent::option_definition();
    return $options;
  }

  function options_form(&$form, &$form_state) {
    $form['xxx'] = array(
      '#type' => 'textfield',
      '#title' => t('Settings'),
    );
  }

}
