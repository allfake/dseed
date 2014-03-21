/**
 * @file
 * Terms TagIt Init
 */

/**
 * Responsive Scripts
 */
(function ($) {
  Drupal.behaviors.termsTagit = {
    attach: function(context, settings) {
      // Enabling tagit for Roles
      if ($(".terms-tagit", context).length > 0) {
        $.each($(".terms-tagit"),function() {
          var terms_autocomplete_url, terms_default;

          if ($(this).attr('data-autocomplete') != null) {
            terms_autocomplete_url = $(this).attr('data-autocomplete');
          }

          if ($(this).attr('data-placeholder') != null) {
            terms_default = Drupal.t($(this).attr('data-placeholder'));
          }

          $(this).once().tagsInput({
            height: '30px',
            placeholderColor: '#aba9ab',
            autocomplete_url: function(request, response) {
              $.getJSON(terms_autocomplete_url + '?term=' + request.term, function(data){
                response(data);
              });
            },
            defaultText: terms_default
          });
        });
      }
    }
  }
})(jQuery);
