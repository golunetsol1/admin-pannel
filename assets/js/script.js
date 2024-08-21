/*! -----------------------------------------------------------------------------------

    Template Name: Riho Admin
    Template URI: https://admin.pixelstrap.net/riho/template/
    Description: This is Admin theme
    Author: Pixelstrap
    Author URI: https://themeforest.net/user/pixelstrap

-----------------------------------------------------------------------------------

        01. password show hide
        02. Background Image js
        03. sidebar filter
        04. Language js
        05. Translate js

 --------------------------------------------------------------------------------- */
 (function ($) {
  "use strict";

  // Close menu on click outside
  $(document).on("click", function (e) {
    if (!$(".outside").is(e.target) && $(".outside").has(e.target).length === 0) {
      $(".menu-to-be-close").removeClass("d-block").hide();
    }
  });

  // Close product details box
  $(".prooduct-details-box .close").on("click", function () {
    $(this).closest(".prooduct-details-box").addClass("d-none");
  });

  // Sidebar hover effects
  if ($(".page-wrapper").hasClass("horizontal-wrapper")) {
    $(".sidebar-list").hover(
      function () { $(this).addClass("hoverd"); },
      function () { $(this).removeClass("hoverd"); }
    );

    $(window).on("scroll", function () {
      if ($(this).scrollTop() < 600) {
        $(".sidebar-list").removeClass("hoverd");
      }
    });
  }

  // Password show/hide functionality
  $(".show-hide").show();
  $(".show-hide span").addClass("show");

  $(".show-hide span").on("click", function () {
    const $passwordInput = $('input[name="login[password]"]');
    if ($(this).hasClass("show")) {
      $passwordInput.attr("type", "text");
      $(this).removeClass("show");
    } else {
      $passwordInput.attr("type", "password");
      $(this).addClass("show");
    }
  });

  $('form button[type="submit"]').on("click", function () {
    $(".show-hide span").addClass("show");
    $('input[name="login[password]"]').attr("type", "password");
  });

  // Background image handling
  $(".bg-center").parent().addClass("b-center");
  $(".bg-img-cover").parent().addClass("bg-size");
  $(".bg-img-cover").each(function () {
    const src = $(this).attr("src");
    $(this).parent().css({
      "background-image": `url(${src})`,
      "background-size": "cover",
      "background-position": "center",
      display: "block"
    }).end().hide();
  });

  // Header and menu toggle actions
  $(".mega-menu-container").hide();

  $(".header-search").on("click", function () {
    $(".search-full").addClass("open");
  });

  $(".close-search").on("click", function () {
    $(".search-full").removeClass("open");
    $("body").removeClass("offcanvas");
  });

  $(".mobile-toggle").on("click", function () {
    $(".nav-menus").toggleClass("open");
  });

  $(".mobile-toggle-left").on("click", function () {
    $(".left-header").toggleClass("open");
  });

  $(".bookmark-search").on("click", function () {
    $(".form-control-search").toggleClass("open");
  });

  $(".filter-toggle").on("click", function () {
    $(".product-sidebar").toggleClass("open");
  });

  $(".toggle-data").on("click", function () {
    $(".product-wrapper").toggleClass("sidebaron");
  });

  $(".form-control-search input").on("keyup", function () {
    $(".page-wrapper").toggleClass("offcanvas-bookmark", $(this).val().length > 0);
  });

  $(".search-full input").on("keyup", function () {
    $("body").toggleClass("offcanvas", $(this).val().length > 0);
  });

  // Escape key functionality
  $(document).on("keydown", function (e) {
    if (e.keyCode === 27) {
      $(".search-full input, .form-control-search input").val("");
      $(".page-wrapper").removeClass("offcanvas-bookmark");
      $(".search-full, .search-form .form-control-search").removeClass("open");
      $("body").removeClass("offcanvas");
    }
  });

  // Dark/light mode toggle
  $(".mode").on("click", function () {
    const isDarkMode = $("body").hasClass("dark-only");
    $("body").toggleClass("dark-only", !isDarkMode).toggleClass("light", isDarkMode);
    $(this).toggleClass("active", !isDarkMode);
    localStorage.setItem("mode", isDarkMode ? "light" : "dark-only");
  });

  $(".mode").addClass(localStorage.getItem("mode") === "dark-only" ? "active" : "");

  // Sidebar filter
  $(".md-sidebar .md-sidebar-toggle").on("click", function () {
    $(".md-sidebar .md-sidebar-aside").toggleClass("open");
  });

  // Loader fade out
  $(".loader-wrapper").fadeOut("slow", function () {
    $(this).remove();
  });

  // Scroll to top button
  $(window).on("scroll", function () {
    $(".tap-top").toggle($(this).scrollTop() > 600);
  });

  $(".tap-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  // Ripple effect
  $(".js-ripple").on("click.ui.ripple", function (e) {
    const $this = $(this);
    const $offset = $this.parent().offset();
    const $circle = $this.find(".c-ripple__circle");
    const x = e.pageX - $offset.left;
    const y = e.pageY - $offset.top;
    $circle.css({ top: `${y}px`, left: `${x}px` });
    $this.addClass("is-active");
  }).on("animationend webkitAnimationEnd oanimationend MSAnimationEnd", function () {
    $(this).removeClass("is-active");
  });

  // Chat menu toggle
  $(".chat-menu-icons .toogle-bar").on("click", function () {
    $(".chat-menu").toggleClass("show");
  });

  // Language translation
  $(document).ready(function () {
    const primaryColor = localStorage.getItem("primary");
    const secondaryColor = localStorage.getItem("secondary");
    
    if (primaryColor) {
      $("#ColorPicker1").val(primaryColor);
    }
    if (secondaryColor) {
      $("#ColorPicker2").val(secondaryColor);
    }

    $(document).on("click", function () {
      $(".translate_wrapper, .more_lang").removeClass("active");
    });

    $(".translate_wrapper .current_lang").on("click", function (e) {
      e.stopPropagation();
      $(this).parent().toggleClass("active");
      setTimeout(function () {
        $(".more_lang").toggleClass("active");
      }, 5);
    });

    $(".more_lang .lang").on("click", function () {
      const lang = $(this).data("value");
      const iconClass = $(this).find("i").attr("class");
      
      $(this).addClass("selected").siblings().removeClass("selected");
      $(".more_lang").removeClass("active");
      translate(lang);
      $(".current_lang .lang-txt").text(lang);
      $(".current_lang i").attr("class", iconClass);
    });

    // Initial translation
    translate("en");
  });

  function translate(tnum) {
    trans.forEach(function (item, index) {
      $(`.lan-${index + 1}`).text(item[tnum]);
    });
  }

  const trans = [
    { en: "General", pt: "Geral", es: "Generalo", fr: "Générale", de: "Generel", cn: "一般", ae: "الحالة العامة" },
    { en: "Dashboards, widgets & layout.", pt: "Painéis, widgets e layout.", es: "Paneloj, fenestraĵoj kaj aranĝo.", fr: "Tableaux de bord, widgets et mise en page.", de: "Dashboards, widgets en lay-out.", cn: "仪表板、小工具和布局。", ae: "لوحات المعلومات، الودجتس والتخطيط." },
    { en: "Dashboards", pt: "Painéis", es: "Paneloj", fr: "Tableaux", de: "Dashboards", cn: "仪表板", ae: "لوحات المعلومات" },
    { en: "Default", pt: "Padrão", es: "Vaikimisi", fr: "Défaut", de: "Standaard", cn: "默认", ae: "افتراضي" },
    { en: "Ecommerce", pt: "Comércio eletrônico", es: "Comercio", fr: "Commerce électronique", de: "E-commerce", cn: "电子商务", ae: "التجارة الإلكترونية" },
    { en: "Widgets", pt: "Ferramenta", es: "Vidin", fr: "Widgets", de: "Widgets", cn: "小部件", ae: "الأدوات" },
    { en: "Page layout", pt: "Layout da página", es: "Paga aranĝo", fr: "Tableaux", de: "Mise en page", cn: "页面布局", ae: "تخطيط الصفحة" },
    { en: "Applications", pt: "Formulários", es: "Aplikoj", fr: "Applications", de: "Toepassingen", cn: "应用领域", ae: "التطبيقات" },
    { en: "Ready to use Apps", pt: "Pronto para usar aplicativos", es: "Preta uzi Apps", fr: "Applications prêtes à l'emploi", de: "Klaar om apps te gebruiken", cn: "仪表板", ae: "جاهزة لاستخدام التطبيقات" }
  ];

  // Flip card effect
  $("#flip-btn").on("click", function () {
    $(".flip-card-inner").addClass("flipped");
  });

  $("#flip-back").on("click", function () {
    $(".flip-card-inner").removeClass("flipped");
  });

  // Show and hide input
  $("#searchIcon").on("click", function () {
    $("#searchInput").toggleClass("show");
  });

})(jQuery);
