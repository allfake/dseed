<?php

class views_responsive_slides_style_plugin extends views_plugin_style {
  
  function option_definition() {
    $options = parent::option_definition();
    unset($options['grouping']);
    
    $options['auto'] = array('default' => TRUE);
    $options['speed'] = array('default' => 500);
    $options['timeout'] = array('default' => 4000);
    $options['pager'] = array('default' => FALSE);
    $options['nav'] = array('default' => FALSE);
    $options['random'] = array('default' => FALSE);
    $options['pause'] = array('default' => FALSE);
    $options['pauseControl'] = array('default' => TRUE);
    $options['playControl'] = array('default' => TRUE);
    $options['prevText'] = array('default' => 'Previous');
    $options['nextText'] = array('default' => 'Next');
    $options['playText'] = array('default' => 'Play');
    $options['pauseText'] = array('default' => 'Pause');
    $options['maxwidth'] = array('default' => '');
    $options['navContainer'] = array('default' => '');
    $options['manualControls'] = array('default' => '');
    $options['namespace'] = array('default' => 'rslides');
    $options['indicator'] = array('default' => TRUE);
    $options['indicatorTemplate'] = array('default' => 'Slide !num of !total');
    
    return $options;
  }

  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);
    unset($form['grouping']);

    $form['auto'] = array(
      '#type' => 'checkbox',
      '#title' => t('Auto'),
      '#default_value' => $this->options['auto'],
    );

    $form['speed'] = array(
      '#type' => 'textfield',
      '#title' => t('Speed'),
      '#default_value' => $this->options['speed'],
    );

    $form['timeout'] = array(
      '#type' => 'textfield',
      '#title' => t('Timeout'),
      '#default_value' => $this->options['timeout'],
    );

    $form['pager'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display pager'),
      '#default_value' => $this->options['pager'],
    );

    $form['random'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display random'),
      '#default_value' => $this->options['random'],
    );

    $form['pause'] = array(
      '#type' => 'checkbox',
      '#title' => t('Pause on hover'),
      '#default_value' => $this->options['pause'],
    );

    $form['pauseControls'] = array(
      '#type' => 'checkbox',
      '#title' => t('Pause when hovering controls'),
      '#default_value' => $this->options['pauseControls'],
    );

    $form['nav'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display navigation'),
      '#default_value' => $this->options['nav'],
    );

    $form['prevText'] = array(
      '#type' => 'textfield',
      '#title' => t('Text for the "previous" button'),
      '#default_value' => $this->options['prevText'],
      '#states' => array(
        'invisible' => array(
          ':input#edit-style-options-nav' => array('checked' => FALSE),
        ),
      ),
    );

    $form['nextText'] = array(
      '#type' => 'textfield',
      '#title' => t('Text for the "next" button'),
      '#default_value' => $this->options['nextText'],
      '#states' => array(
        'invisible' => array(
          ':input#edit-style-options-nav' => array('checked' => FALSE),
        ),
      ),
    );

    $form['playControl'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display play control'),
      '#default_value' => $this->options['playControl'],
    );

    $form['playText'] = array(
      '#type' => 'textfield',
      '#title' => t('Text for the "play" button'),
      '#default_value' => $this->options['playText'],
      '#states' => array(
        'invisible' => array(
          ':input#edit-style-options-playcontrol' => array('checked' => FALSE),
        ),
      ),
    );

    $form['pauseText'] = array(
      '#type' => 'textfield',
      '#title' => t('Text for the "pause" button'),
      '#default_value' => $this->options['pauseText'],
      '#states' => array(
        'invisible' => array(
          ':input#edit-style-options-playcontrol' => array('checked' => FALSE),
        ),
      ),
    );

    $form['indicator'] = array(
      '#type' => 'checkbox',
      '#title' => t('Display indicator'),
      '#default_value' => $this->options['indicator'],
    );

    $form['indicatorTemplate'] = array(
      '#type' => 'textfield',
      '#title' => t('Indicator template'),
      '#default_value' => $this->options['indicatorTemplate'],
      '#states' => array(
        'invisible' => array(
          ':input#edit-style-options-indicator' => array('checked' => FALSE),
        ),
      ),
    );

    $form['maxwidth'] = array(
      '#type' => 'textfield',
      '#title' => t('Max-width of the slideshow'),
      '#default_value' => $this->options['maxwidth'],
    );

    $form['navContainer'] = array(
      '#type' => 'textfield',
      '#title' => t('Where controls should be appended to, default is after the \'ul\''),
      '#default_value' => $this->options['navContainer'],
    );

    $form['manualControls'] = array(
      '#type' => 'textfield',
      '#title' => t('Declare custom pager navigation'),
      '#default_value' => $this->options['manualControls'],
    );

    $form['namespace'] = array(
      '#type' => 'textfield',
      '#title' => t('Namespace'),
      '#default_value' => $this->options['namespace'],
    );

  }
}
