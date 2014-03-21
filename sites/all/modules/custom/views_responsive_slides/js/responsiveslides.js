/*! ResponsiveSlides.js v1.53
 * http://responsiveslides.com
 * http://viljamis.com
 *
 * Copyright (c) 2011-2012 @viljamis
 * Available under the MIT license
 */

/*jslint browser: true, sloppy: true, vars: true, plusplus: true, indent: 2 */

(function ($, window, i) {
  $.fn.responsiveSlides = function (options) {

    // Default settings
    var settings = $.extend({
      "auto": true,             // Boolean: Animate automatically, true or false
      "speed": 500,             // Integer: Speed of the transition, in milliseconds
      "timeout": 4000,          // Integer: Time between slide transitions, in milliseconds
      "pager": false,           // Boolean: Show pager, true or false
      "nav": false,             // Boolean: Show navigation, true or false
      "random": false,          // Boolean: Randomize the order of the slides, true or false
      "pause": false,           // Boolean: Pause on hover, true or false
      "playControl": false,     // Boolean: Display play, pause, next, previous buttons
      "pauseControls": true,    // Boolean: Pause when hovering controls, true or false
      "prevText": "Previous",   // String: Text for the "previous" button
      "nextText": "Next",       // String: Text for the "next" button
      "playText": "Play",       // String: Text for the "play" button
      "pauseText": "Pause",     // String: Text for the "pause" button
      "indicator": false,       // Boolean: Display indicator where slide is, true or false
      "indicatorTemplate": "Slide !num of !total", // String: Template to display indicator
      "maxwidth": "",           // Integer: Max-width of the slideshow, in pixels
      "navContainer": "",       // Selector: Where auto generated controls should be appended to, default is after the <ul>
      "manualControls": "",     // Selector: Declare custom pager navigation
      "namespace": "rslides",   // String: change the default namespace used
      before: function () {
     

      },   // Function: Before callback
      after: function () {
        
      }     // Function: After callback
    }, options);

    return this.each(function () {

      // Index for namespacing
      i++;

      var $this = $(this),

        // Local variables
        vendor,
        selectTab,
        startCycle,
        restartCycle,
        rotate,
        $tabs,
        $indicator,

        // Helpers
        index = 0,
        $slide = $this.children(),
        length = $slide.size(),
        fadeTime = parseFloat(settings.speed),
        waitTime = parseFloat(settings.timeout),
        maxw = parseFloat(settings.maxwidth),

        // Namespacing
        namespace = settings.namespace,
        namespaceIdx = namespace + i,

        // Classes
        navClass = namespace + "_nav " + namespaceIdx + "_nav",
        ctrlClass = namespace + "_ctrl " + namespaceIdx + "_ctrl",
        activeClass = namespace + "_here",
        visibleClass = namespaceIdx + "_on",
        slideClassPrefix = namespaceIdx + "_s",

        // Pager
        $pager = $("<ul class='" + namespace + "_tabs " + namespaceIdx + "_tabs' />"),

        // Styles for visible and hidden slides
        visible = {"float": "left", "position": "relative", "opacity": 1, "zIndex": 2},
        hidden = {"float": "none", "position": "absolute", "opacity": 0, "zIndex": 1},

        // Detect transition support
        supportsTransitions = (function () {
          var docBody = document.body || document.documentElement;
          var styles = docBody.style;
          var prop = "transition";
          if (typeof styles[prop] === "string") {
            return true;
          }
          // Tests for vendor specific prop
          vendor = ["Moz", "Webkit", "Khtml", "O", "ms"];
          prop = prop.charAt(0).toUpperCase() + prop.substr(1);
          var i;
          for (i = 0; i < vendor.length; i++) {
            if (typeof styles[vendor[i] + prop] === "string") {
              return true;
            }
          }
          return false;
        })(),

        indicatorTemplate = function(idx) {
          var template = settings.indicatorTemplate;
          template = template.replace('!num', idx + 1);
          template = template.replace('!total', length);
          return template;
        },

        // Fading animation
        slideTo = function (idx) {
          settings.before();

          if (settings.indicator) {
            var _idx = idx;
            if (_idx == -1)
              _idx = length - 1;
            $indicator.html(indicatorTemplate(_idx));
          }

          // If CSS3 transitions are supported
          if (supportsTransitions) {
            $slide
              .removeClass(visibleClass)
              .css(hidden)
              .eq(idx)
              .addClass(visibleClass)
              .css(visible);
            index = idx;
            setTimeout(function () {
              settings.after();
            }, fadeTime);
          // If not, use jQuery fallback
          } else {
            $slide
              .stop()
              .fadeTo(fadeTime, 0)
              .eq(idx)
              .fadeIn(fadeTime, function () {
                $slide
                  .removeClass(visibleClass)
                  .css(hidden)
                  .css("opacity", 1);
                $(this)
                  .addClass(visibleClass)
                  .css(visible);
                settings.after();
                index = idx;
              });
          }
        };

      // Random order
      if (settings.random) {
        $slide.sort(function () {
          return (Math.round(Math.random()) - 0.5);
        });
        $this
          .empty()
          .append($slide);
      }

      // Add ID's to each slide
      $slide.each(function (i) {
        this.id = slideClassPrefix + i;
      });

      // Add max-width and classes
      $this.addClass(namespace + " " + namespaceIdx);
      if (options && options.maxwidth) {
        $this.css("max-width", maxw);
      }

      // Hide all slides, then show first one
      $slide
        //.hide() WAI issue
        .css(hidden)
        .eq(0)
        .addClass(visibleClass)
        .css(visible)
        .show();

      // CSS transitions
      if (supportsTransitions) {
        $slide
          .show()
          .css({
            // -ms prefix isn't needed as IE10 uses prefix free version
            "-webkit-transition": "opacity " + fadeTime + "ms ease-in-out",
            "-moz-transition": "opacity " + fadeTime + "ms ease-in-out",
            "-o-transition": "opacity " + fadeTime + "ms ease-in-out",
            "transition": "opacity " + fadeTime + "ms ease-in-out"
          });
      }

      // Only run if there's more than one slide
      if ($slide.size() > 1) {

        // Make sure the timeout is at least 100ms longer than the fade
        if (waitTime < fadeTime + 100) {
          return;
        }

        // Pager
        if (settings.pager && !settings.manualControls) {
          var tabMarkup = [];
          $slide.each(function (i) {
            var n = i + 1;
            tabMarkup +=
              "<li>" +
              "<a href='#' class='" + slideClassPrefix + n + "'>" + n + "</a>" +
              "</li>";
          });
          $pager.append(tabMarkup);

          // Inject pager
          if (options.navContainer) {
            $(settings.navContainer).append($pager);
          } else {
            $this.after($pager);
          }
        }

        // Manual pager controls
        if (settings.manualControls) {
          $pager = $(settings.manualControls);
          $pager.addClass(namespace + "_tabs " + namespaceIdx + "_tabs");
        }

        // Add pager slide class prefixes
        if (settings.pager || settings.manualControls) {
          $pager.find('li').each(function (i) {
            $(this).addClass(slideClassPrefix + (i + 1));
          });
        }

        // If we have a pager, we need to set up the selectTab function
        if (settings.pager || settings.manualControls) {
          $tabs = $pager.find('a');

          // Select pager item
          selectTab = function (idx) {
            $tabs
              .closest("li")
              .removeClass(activeClass)
              .eq(idx)
              .addClass(activeClass);
          };
        }

        startCycle = function () {
          rotate = setInterval(function () {

            // Clear the event queue
            $slide.stop(true, true);

            var idx = index + 1 < length ? index + 1 : 0;

            // Remove active state and set new if pager is set
            if (settings.pager || settings.manualControls) {
              selectTab(idx);
            }

            slideTo(idx);
          }, waitTime);
        };

        // Auto cycle
        if (settings.auto) {

          // Init cycle
          startCycle();
        }

        // Restarting cycle
        restartCycle = function () {
          if (settings.auto) {
            // Stop
            clearInterval(rotate);
            // Restart
            startCycle();
          }
        };

        // Pause on hover
        if (settings.pause) {
          $this.hover(function () {
            clearInterval(rotate);
          }, function () {
            var $play_btn = $('.' + namespaceIdx + '_ctrl').siblings('.play');
            var $pause_btn = $('.' + namespaceIdx + '_ctrl').siblings('.pause');
            var slide_play = $pause_btn.is(':visible');
            if (slide_play) {
              restartCycle();
            }
          });
        }

        // Pager click event handler
        if (settings.pager || settings.manualControls) {
          $tabs.bind("click", function (e) {
            e.preventDefault();

            if (!settings.pauseControls) {
              restartCycle();
            }

            // Get index of clicked tab
            var idx = $tabs.index(this);

            // Break if element is already active or currently animated
            if (index === idx || $("." + visibleClass).queue('fx').length) {
              return;
            }

            // Remove active state from old tab and set new one
            selectTab(idx);

            // Do the animation
            slideTo(idx);
          })
            .eq(0)
            .closest("li")
            .addClass(activeClass);

          // Pause when hovering pager
          if (settings.pauseControls) {
            $tabs.hover(function () {
              clearInterval(rotate);
            }, function () {
              restartCycle();
            });
          }
        }

        if (settings.indicator) {
          $indicator = $('<div class="indicator"></div>');

          // Inject navigation
          if (options.navContainer) {
            $(settings.navContainer).append($indicator);
          } else {
            $this.after($indicator);
          }
          
          $indicator.html(indicatorTemplate(0));
        }

        // Play control.
        if (settings.playControl) {
          var ctrlMarkup =
            '<div class="play-control">' +
            '<a href="#" class="' + ctrlClass + ' prev">' + settings.prevText + '</a>' +
            '<a href="#" class="' + ctrlClass + ' play">' + settings.playText + '</a>' +
            '<a href="#" class="' + ctrlClass + ' pause">' + settings.pauseText + '</a>' +
            '<a href="#" class="' + ctrlClass + ' next">' + settings.nextText + '</a>' +
            '</div>';

          // Inject navigation
          if (options.navContainer) {
            $(settings.navContainer).append(ctrlMarkup);
          } else {
            $this.after(ctrlMarkup);
          }

          var $trigger = $('.' + namespaceIdx + '_ctrl');
          var $play = $trigger.siblings('.play');
          var $pause = $trigger.siblings('.pause');
          var $next = $trigger.siblings('.next');
          var $prev = $trigger.siblings('.prev');

          // Toggle play, pause buttons.
          if (settings.auto) {
            $play.hide();
          }
          else {
            $pause.hide();
          }
          
          $trigger.bind('click', function(e) {
            e.preventDefault();

            var $button = $(this);
            var $visibleClass = $("." + visibleClass);

            // Prevent clicking if currently animated
            if ($visibleClass.queue('fx').length) {
              return;
            }

            // Play
            if ($button.hasClass('play')) {
              // Stop
              clearInterval(rotate);
              // Restart
              startCycle();
              $button.hide();
              $pause.show();
            }
            // Pause
            else if ($button.hasClass('pause')) {
              clearInterval(rotate);
              $button.hide();
              $play.show();
            }
            // Next, Previous
            else {
              // Stop
              clearInterval(rotate);
              $pause.hide();
              $play.show();

              var idx = $slide.index($visibleClass),
                prevIdx = idx - 1,
                nextIdx = idx + 1 < length ? index + 1 : 0;

              // Go to slide
              slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);

              if (settings.pager || settings.manualControls) {
                selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
              }
            }

          });
        }

        // Navigation
        if (settings.nav) {
          var navMarkup =
            "<a href='#' class='" + navClass + " prev'>" + settings.prevText + "</a>" +
            "<a href='#' class='" + navClass + " next'>" + settings.nextText + "</a>";

          // Inject navigation
          if (options.navContainer) {
            $(settings.navContainer).append(navMarkup);
          } else {
            $this.after(navMarkup);
          }

          var $trigger = $("." + namespaceIdx + "_nav"),
            $prev = $trigger.filter(".prev");

          // Click event handler
          $trigger.bind("click", function (e) {
            e.preventDefault();

            var $visibleClass = $("." + visibleClass);

            // Prevent clicking if currently animated
            if ($visibleClass.queue('fx').length) {
              return;
            }

            //  Adds active class during slide animation
            //  $(this)
            //    .addClass(namespace + "_active")
            //    .delay(fadeTime)
            //    .queue(function (next) {
            //      $(this).removeClass(namespace + "_active");
            //      next();
            //  });

            // Determine where to slide
            var idx = $slide.index($visibleClass),
              prevIdx = idx - 1,
              nextIdx = idx + 1 < length ? index + 1 : 0;

            // Go to slide
            slideTo($(this)[0] === $prev[0] ? prevIdx : nextIdx);
            if (settings.pager || settings.manualControls) {
              selectTab($(this)[0] === $prev[0] ? prevIdx : nextIdx);
            }

            if (!settings.pauseControls) {
              restartCycle();
            }
          });

          // Pause when hovering navigation
          if (settings.pauseControls) {
            $trigger.hover(function () {
              clearInterval(rotate);
            }, function () {
              restartCycle();
            });
          }
        }

      }

      // Max-width fallback
      if (typeof document.body.style.maxWidth === "undefined" && options.maxwidth) {
        var widthSupport = function () {
          $this.css("width", "100%");
          if ($this.width() > maxw) {
            $this.css("width", maxw);
          }
        };

        // Init fallback
        widthSupport();
        $(window).bind("resize", function () {
          widthSupport();
        });
      }

    });

  };
})(jQuery, this, 0);
