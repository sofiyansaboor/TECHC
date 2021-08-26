(function ($, elementor) {
  "use strict";

  var WdesWidgets = {
    init: function () {
      var elements = {
        "wdes_testimonials.default": WdesWidgets.elementTestimonials,
        "wdes_table.default": WdesWidgets.elementTable,
        "wdes_world_map.default": WdesWidgets.elementWorldMap,
      };

      $.each(elements, function (element, callback) {
        elementor.hooks.addAction(
          "frontend/element_ready/" + element,
          callback
        );
      });
    },

    elementTestimonials: function ($scope) {
      var target = $scope.find(".wdes-testimonials-instance"),
        settings = target.data("settings"),
        navSpeed = settings.autoplaySpeed,
        tableItems,
        mobileItems,
        desktopItems,
        owlOptions;

      if (settings.items.mobile) {
        mobileItems = settings.items.mobile;
      } else {
        mobileItems = 1;
      }

      if (settings.items.tablet) {
        tableItems = settings.items.tablet;
      } else {
        tableItems = 1 === settings.items.desktop ? 1 : 2;
      }

      if (settings.items.desktop) {
        desktopItems = settings.items.desktop;
      }

      settings.items = settings.items.desktop;

      var defaultOptions = {
        navSpeed: navSpeed,
        dotsSpeed: navSpeed,
        responsive: {
          0: {
            items: mobileItems,
          },
          768: {
            items: tableItems,
          },
          1025: {
            items: desktopItems,
          },
        },
      };

      owlOptions = $.extend({}, defaultOptions, settings);

      target.owlCarousel(owlOptions);
    },
    elementTable: function ($scope) {
      var $target = $scope.find(".wdes-table"),
        options = {
          cssHeader: "wdes-table-header-sort",
          cssAsc: "wdes-table-header-sort-up",
          cssDesc: "wdes-table-header-sort-down",
        };
      if (!$target.length) {
        return;
      }

      if ($scope.find(".wdes-table-search").length === 1) {
        options["widgets"] = ["zebra", "filter"];
        options["widgetOptions"] = { filter_columnFilters: false };
      }

      if ($target.hasClass("wdes-table-sorting")) {
        var $table = $target.tablesorter(options);
        $.tablesorter.filter.bindSearch(
          $table,
          $scope.find(".wdes-table-search")
        );
      }
    },

    elementWorldMap: function ($scope) {
      var setting = $scope.find("#wdes-world-map").data("settings"),
        data = $scope.find("#wdes-world-map").data("countries"),
        lats = data.map(function (zone) {
          return zone.latitude;
        }),
        long = data.map(function (zone) {
          return zone.longitude;
        }),
        targetSVG =
          "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z",
        planeSVG =
          "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
        addTarget = data.map((zone) => {
          zone.svgPath = targetSVG;
          return zone;
        }),
        planShadowStyle = {
          svgPath: planeSVG,
          positionOnLine: 0,
          color: setting.movingObject.shadowColor,
          alpha: 0.1,
          animateAlongLine: true,
          lineId: "line2",
          flipDirection: true,
          loop: true,
          scale: 0.03,
          positionScale: 1.3,
        },
        planStyle = {
          svgPath: planeSVG,
          positionOnLine: 0,
          color: setting.movingObject.color,
          animateAlongLine: true,
          lineId: "line1",
          flipDirection: true,
          loop: true,
          scale: 0.03,
          positionScale: 1.8,
        };
      addTarget.push(planShadowStyle, planStyle);

      AmCharts.makeChart("chartdiv", {
        type: "map",
        theme: "light",

        projection: "winkel3",
        dataProvider: {
          map: "worldLow",

          lines: [
            // Active Lines
            {
              id: "line1",
              arc: -0.85,
              alpha: 0.3,
              latitudes: lats,
              longitudes: long,
            },
            // Lines Shadow
            {
              id: "line2",
              alpha: 0,
              color: "#000000",
              latitudes: lats,
              longitudes: long,
            },
          ],
          // Locations
          images: addTarget,
        },

        // Maps Background
        areasSettings: {
          unlistedAreasColor: setting.areasSettings.unlistedAreasColor,
        },

        // Location Style
        imagesSettings: {
          color: setting.imagesSettings.color, // Spot Color
          rollOverColor: setting.imagesSettings.rollOverColor, // Spot Hover Color
          selectedColor: "#ffffff", // Box Color
          pauseDuration: 0.2,
          animationDuration: 4,
          adjustAnimationSpeed: true,
        },

        // Lines
        linesSettings: {
          color: setting.line.linesSettings,
          alpha: 0.4,
        },

        export: {
          enabled: true,
        },
      });
    },
  };

  $(window).on("elementor/frontend/init", WdesWidgets.init);
})(jQuery, window.elementorFrontend);
