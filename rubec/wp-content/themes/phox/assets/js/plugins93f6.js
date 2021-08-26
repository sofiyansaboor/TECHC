/**********************

Author:  WHMCSdes
Template: Phox - WMHCS & HTML Web Hosting Theme
Version: 1.0
Author URI: whmcsdes.com

***************************/

/*global jQuery, var, $ */

(function ($) {
  "use strict";

  // Layout width
  $(".wide-layout").on("click", function () {
    $(".layout-width").css({
      width: "100%",
      margin: "0",
    });
  });

  $(".boxed-layout").on("click", function () {
    $(".layout-width").css({
      width: "1200px",
      margin: "50px auto",
    });
  });

  // Tooltip operator
  if (typeof window.bootstrap === "object") {
    $('[data-toggle="tooltip"]').tooltip();
  }

  // SmoothScroll
  $(
    "a#m-details,a#m-details2,a#m-details3,a.g-q,a.d-reg,a.r-res,.code-nav ul li a"
  )
    .not('[href="#"]')
    .not('[href="#0"]')
    .on("click", function (event) {
      if (
        location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            }
          );
        }
      }
    });

  var wHeight = window.innerHeight;
  //search bar middle alignment
  $("#wdes-fullscreen-searchform").css("top", wHeight / 2);
  //reform search bar
  jQuery(window).resize(function () {
    $("#wdes-fullscreen-searchform").css("top", wHeight / 2);
  });
  // Search
  $("#search-button").on("click", function () {
    $("div.wdes-fullscreen-search-overlay").addClass(
      "wdes-fullscreen-search-overlay-show"
    );
  });
  $("a.wdes-fullscreen-close").on("click", function () {
    $("div.wdes-fullscreen-search-overlay").removeClass(
      "wdes-fullscreen-search-overlay-show"
    );
  });

  /* ---------------------------------------------------------------------------
   * Domain
   * --------------------------------------------------------------------------- */

  var DomainCheck = {
    submit: function (e) {
      e.preventDefault();
      var obj = e.data,
        el = obj.wap.find("#wdes-domain-results"),
        domainDefault = "whmcsdes.com",
        basename = obj.input.val() !== "" ? obj.input.val() : domainDefault,
        extension = DomainCheck.dotExt(obj.input.val());

      obj.security = obj.form.find("input[name=security]").val();
      obj.el = el;
      var domainData = {},
        domainResultTable = $(
          '<div id="wdes_result_item" class="wdes-result-domain-box" role="alert"> </div>'
        ),
        domainResult = $(
          '<div class="inner-block-result-item">' +
            '<div class="spinner wdes-loading-results">' +
            '<i class="fas fa-circle-notch fa-spin fa-lg fa-fw"></i>' +
            '<span class="sr-only">...</span>' +
            "</div>" +
            "</div>"
        );

      $.extend(domainData, obj);
      domainData.domain = basename.replace(/<[^>]*>?/gm, "");
      domainData.el = domainResult;

      domainResult.data("domain", domainData.domain);

      if (obj.el.find("#wdes_result_item").length == 0) {
        obj.el.append(domainResultTable);
        obj.el.find("#wdes_result_item").append(domainResult);
      } else {
        obj.el.find("#wdes_result_item").remove();
        obj.el.append(domainResultTable);
        obj.el.find("#wdes_result_item").append(domainResult);
      }
      obj.el
        .find("#wdes_result_item")
        .append(
          '<span class="results-wdes-dom">' + domainData.domain + "</span>"
        );

      DomainCheck.checkAjax(domainData);
    },

    name: function (domain) {
      return domain.replace(/^.*\/|\.[^.]*$/g, "");
    },

    dotExt: function (ext) {
      var fExt,
        tExt = ext.split(".", 3);

      if (tExt[1] === undefined) {
        fExt = "com";
      } else if (tExt[0] === "www") {
        fExt = tExt[2];
      } else {
        fExt = tExt[1];
      }

      return fExt;
    },

    checkAjax: function (obj) {
      var data = {
        domain: obj.domain,
        action: "wdes_ajax_search_domain",
        security: obj.security,
        settings: obj.form.data("setting"),
      };

      $.ajax({
        url: wdes_ajax_url,
        type: "POST",
        dataType: "json",
        data: data,
        success: function (data) {
          obj.el.find(".spinner").remove();
          console.log(obj.form.find("wdes_result_item .results-wdes-dom"));
          obj.form.find(".results-wdes-dom").html(data.message);
          obj.el.append(data.results_html);
          //whois
          jQuery("#wdesDomainWhoisBtn").on("click", function () {
            let data = {
              domain: obj.domain,
              action: "wdes_domain_whois",
              security: obj.form.find("input[name=security-whois]").val(),
            };
            $.ajax({
              url: wdes_ajax_url,
              type: "POST",
              dataType: "json",
              data: data,
              success: function (data) {
                obj.form.find("#wdesDomainWhois .modal-body pre").remove();
                obj.form
                  .find("#wdesDomainWhois .modal-body")
                  .append("<pre>" + data.whois + "</pre>");
                obj.form.find("#wdesDomainWhois").modal("show");
              },
            });
          });
        },
        error: function (xhr, ajaxOptions, thrownError) {
          console.log(xhr);
          console.log(thrownError);
        },
      });
    },
  };

  $("#wdes-domain-search").is(function () {
    var id = $(this),
      submitEl = id.find("#wdes-search"),
      inputEl = id.find("#wdes-domain"),
      formEl = id.find("#wdes-domain-form"),
      data;
    data = {
      submit: submitEl,
      input: inputEl,
      form: formEl,
      div: id,
      wap: id,
    };

    submitEl.attr("disabled", true);
    inputEl.keyup(function () {
      if ($(this).val().length != 0) submitEl.attr("disabled", false);
      else submitEl.attr("disabled", true);
    });

    submitEl.on("click", data, DomainCheck.submit);
  });

  // Loading Screen
  const loadingClass = $(".wdes-loading"),
      removeFLow = $("html,body").css("overflow", "auto");

  if (loadingClass.length === 1) {
    $(window).on("load", function () {
      loadingClass.fadeOut(); 
      removeFLow;
    });
  }

  /* ---------------------------------------------------------------------------
   * Chat Platforms
   * --------------------------------------------------------------------------- */

  //InterCom code snippet
  function intercomSnippet(intercomUser) {
    var w = window;
    var ic = w.Intercom;
    w.intercomSettings = intercomUser;

    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w.intercomSettings);
    } else {
      var d = document;
      var i = function () {
        i.c(arguments);
      };
      i.q = [];
      i.c = function (args) {
        i.q.push(args);
      };
      w.Intercom = i;
      var l = function () {
        var s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src =
          "https://widget.intercom.io/widget/" + w.intercomSettings.app_id;
        var x = d.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      };
      if (w.attachEvent) {
        w.attachEvent("onload", l);
      } else {
        w.addEventListener("load", l, false);
      }
    }
  }

  //Tawk code snippet
  function tawkSnippet(tawkUser) {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/" + tawkUser.api_id + "/default";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  }

  //Fire the interCom
  if (typeof intercomUser !== "undefined" && intercomUser.length != 0) {
    intercomSnippet(intercomUser);
  }

  //Fire the Twak
  if (typeof tawkUser !== "undefined" && tawkUser.length != 0) {
    var Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date();
    tawkSnippet(tawkUser);
  }

  // BackToTop Button
  if ($("#wdes-back-to-top").length > 0) {
    const backToTopBtn = $("#wdes-back-to-top");
    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        backToTopBtn.addClass("show");
      } else {
        backToTopBtn.removeClass("show");
      }
    });
    backToTopBtn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  }
})(jQuery);
