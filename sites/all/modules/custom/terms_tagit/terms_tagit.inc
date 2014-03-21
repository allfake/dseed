<?php

/**
 * @file
 * Written by Jerry Low
 * http://www.jerrylow.com
 */

/**
 * Get Vocabulary vid.
 */
function terms_tagit_vid($name) {
  $names = taxonomy_vocabulary_get_names();
  return $names[$name]->vid;
}

/**
 * Get terms for vocabulary.
 */
function terms_tagit_terms($loaded_terms, $search) {
  $terms = array();
  global $language;

  foreach ($loaded_terms as $loaded_term) {
    if (!$loaded_term->translations->data[$language->language]) {
      continue;
    }

    if (function_exists('i18n_string_translate')) {
      $term_name = i18n_string_translate('taxonomy:term:' . $loaded_term->tid . ':name', $loaded_term->name);
    }
    else {
      $term_name = $loaded_term->name;
    }

    $term_add = NULL;

    if ($search != '') {
      if (substr(strtolower($term_name), 0, strlen($search)) == strtolower($search)) {
        $term_add = array(
          'value' => $term_name,
        );
      }
    }
    else {
      $term_add = array(
        'value' => $term_name,
      );
    }

    if ($term_add != NULL) {
      $terms[] = $term_add;
    }
  }

  return $terms;
}

/**
 * Get vocabulary name for autocomplete.
 */
function terms_tagit_vocabulary($field_name) {
  $vocabulary = '';
  $field_data = field_info_field($field_name);

  if (!empty($field_data['settings']['allowed_values'][0]['vocabulary'])) {
    $vocabulary = $field_data['settings']['allowed_values'][0]['vocabulary'];
  }
  return $vocabulary;
}

/**
 * Validate autocomplete url field.
 */
function terms_tagit_autocomplete_url_validate($element, &$form_state) {
  global $base_url;

  if ($element['#value'] != '') {
    if (!drupal_valid_path($element['#value'])) {
      form_error($element, t('The "!name" path is not a valid path.', array('!name' => $element['#title'])));
    }

    if (function_exists('curl_version')) {
      $json = terms_tagit_contents_curl($base_url . '/' . $element['#value']);
      $json_decode = json_decode($json);
      if (!$json_decode) {
        form_error($element, t('The "!name" path does not return any JSON data', array('!name' => $element['#title'])));
      }
    }
  }
}

/**
 * Curl to return autocomplete url path data.
 */
function terms_tagit_contents_curl($url) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}
