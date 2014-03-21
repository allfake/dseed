(function($) {

  Drupal.behaviors.viewsResponsiveSlides = {
    attach: function(context, settings) {
      var slides = settings.viewsResponsiveSlides;
      var processedClass = 'views-responsive-slides-processed';
      $.each(slides, function(id, options) {
        var selector = '#' + id + ':not(.' + processedClass + ')';
        $(selector)
          .addClass(processedClass)
          .responsiveSlides(options);
      });
    }
  };

})(jQuery);
