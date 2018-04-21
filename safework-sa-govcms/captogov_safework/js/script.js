/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
// (function ($, Drupal, window, document, undefined) {

// store the hash
var hashTarget = window.location.hash,
    hashTarget = hashTarget.replace('#', '');

(function ($, Drupal, window, document, undefined) {


$(document).ready(function() {
  var $body = $('body');
  var $w = $(window);

  var $fpProjects = $('.view-id-projects.view-display-id-block');
  var $fpNews = $('.view-id-latest_news.view-display-id-block_1');

  if($fpProjects.length > 0) {
    // $fpProjects.find('.views-row').matchHeight();
    var $fpProjectsTitle = $('.panel-projects').find('.pane-title');
    $fpProjectsTitle.html('<a href="/resources">'+$fpProjectsTitle.text().trim()+'</a>');
  }
  if($fpNews.length > 0) {
    $fpNews.find('.node').matchHeight();
  }


  // IMAGE TITLES
  var $imageTitles = $('.field-name-field-file-image-title-text');
  $imageTitles.each(function() {
    var $t = $(this);

    if($t.text().trim() == '') {
      $t.remove();
    }
  });


  // SEARCH BLOCK
  var $hSearch = $('header .block-search');
  var $hSearchInput = $hSearch.find('.form-text');
  var $d = jQuery3(document);
  $hSearch.find('.form-submit').click(function() {
    $d.off('click.headerSearch');

    if(!$hSearch.hasClass('show')) {
      $hSearch.addClass('show').addClass('animating');
      $hSearchInput.focus();

      // add an event listener to hide the menu
      $d.on('click.headerSearch', function(e) {
        var $target = $(e.target);

        if($target.parents('.block-search').length == 0) {
          $hSearch.find('.form-submit').click();
        }
      });

      setTimeout(function() {
        $hSearch.removeClass('animating');
      }, 300);
      return false;
    } else {
      // check if there's anything in the search input
      if($hSearchInput.val().length <= 0) {
        $hSearch.removeClass('show');
        setTimeout(function() {
          $hSearch.removeClass('animating');
        }, 300);
        return false;
      }
    }
  });

  /* ===== MEGAMENU ===== */
  $('li.sf-depth-2', $sfMenu).matchHeight();

  // DROPDOWN BACKGROUND -JUHANI
  // remove the next mouseenter and mouseleave to remove dropdown bg
  // navigation overlay fixes
  var $sfMenu = jQuery3('#superfish-1');
  var $innerModal = $('.nav-modal-inner');
  var navHideInterval, navShowInterval;

  // MAIN MENU EVENTS
  if($sfMenu.length > 0) {
    $sfMenu.on('click.mmclick', 'a', function(e) {
      var $t = $(this);
      if($t.hasClass('sf-depth-1')) {
        e.preventDefault();
      }
    });
  }

  // set email subscribe email address
  $('.js-cm-email-input').attr('placeholder', 'Email address');

  $('#superfish-1 > li.sf-depth-1').mouseenter(function() {
    var $t = $(this);
    var $ddNav = $t.children('ul');
    // var $subNavLi = $ddNav.children('li');
    var $subNavOl = $t.find('ol');

    // console.log( $subNavOl.outerHeight())

    $ddNav.show();

    // match heights
    $('#superfish-1').find('li.sf-depth-2').matchHeight({
      remove: true
    });
    
    // calculate height for the gray modal
    $innerModal.css('height', $subNavOl.outerHeight() + 120); // 120 for padding

    // add a helper class to body
    $body.addClass('nav-dropdown-open');

  }).mouseleave(function() {
    // remove helper class from body
    $body.removeClass('nav-dropdown-open');
  });

  // add colorbox to image links
  $('a[href$=".gif"], a[href$=".jpg"], a[href$=".png"], a[href$=".bmp"]').colorbox({
    maxWidth:'90%', maxHeight:'90%'
  });

  // var animatingNav
  /*

  $('li.sf-depth-1', $sfMenu).mouseenter(function() {
    clearInterval(navShowInterval);
    var $t = $(this);
    var $ddNav = $t.children('ul');
    var $subNavLi = $ddNav.children('li');
    var $subNavOl = $subNavLi.children('ol');
    if($ddNav.not(':visible')) {
      navShowInterval = setInterval(function() {

        if($ddNav.length > 0) {
          $ddNav.css('display', 'block');

          // calculate height for the gray modal
          $innerModal.css('height', $ddNav.outerHeight() + $subNavLi.outerHeight() + $subNavOl.outerHeight() + 80); // 80 for padding

          $body.addClass('nav-dropdown-open');
          clearInterval(navShowInterval);
        }
      }, 150);
    }
  }).mouseleave(function() {
    var $t = $(this);
    var $ddNav = $t.children('ul');
    clearInterval(navShowInterval);
    if($ddNav.is(':visible')) {
      navHideInterval = setInterval(function() {

        window.clearInterval(navHideInterval);
        window.clearInterval(navShowInterval);

        setTimeout(function() {
          $body.removeClass('nav-dropdown-open');
        }, 1);
      }, 600);
    } else {
      setTimeout(function() {
        $body.removeClass('nav-dropdown-open');
      }, 1);
    }

  });
  */
  /* ===== END MEGAMENU ===== */

  // match heights
  $('.view-mode-compact').matchHeight();
  $('.node-teaser:not(.node-project)').matchHeight();

  //adding class to empty a tags
  $('a').each(function() {
    if(($(this).attr('href') === undefined) && (!$(this).hasClass("toc-filter-top"))) {
      //$(this).addClass('empty-anchor');
    }
  });


  // Add some scroll events
  $w.scroll(function() {
    var scrollTop = $w.scrollTop();
    if(scrollTop > 100) {
      $body.addClass('hide-secondary-nav').removeClass('show-secondary-nav');
    } else {
      $body.removeClass('hide-secondary-nav').addClass('show-secondary-nav');
    }
  }).scroll();

  // child page view
  var $childPagesListing = $('.child-pages');
  if($childPagesListing.length > 0) {
    $childPagesListing.find('.node').each(function() {
      var $t = $(this);
      var bgImgSrc = $t.find('.group-left img').attr('src');
      $t.css('background-image', 'url('+bgImgSrc+')');
    });
  }

  // create accordions
  createAccordions();

  // Create gallery
  createGalleries();

  // Create tabs
  createTabs();

  // Related content funcitonality
  createRelatedContent();
});

function createAccordions() {

  var $accordionButtons = $('.accordion-button');
  var accordionElementsArr = [];
  var accordionX = 1;
  $accordionButtons.each(function() {
    var $t = $(this);
    var $next = $t.next();
    if($next.hasClass('accordion-panel')) {
      // replace the div.accordion-button with <summary> element
      $t = $t.replaceWithPush($('<summary class="accordion-button">' + this.innerHTML + '</summary>'));

      if($next.children('p').length == 0) {
        $next.html('<p>'+$next.html()+'</p>');
      }

      accordionElementsArr.push($t.add($next));
    }
  });

  // now that we have a list of Tabs & their contents, wrap them in <details>
  for(var a in accordionElementsArr) {
    var aLabel = 'accordion-' + accordionX;
    var isOpenTag = '';//(aLabel == hashTarget) ? 'open' : '';
    var isAriaExpanded = (aLabel == hashTarget) ? 'true' : 'false';
    accordionElementsArr[a].wrapAll('<details data-label="'+aLabel+'" aria-expanded="false" data-accordion-x="'+accordionX+'" '+isOpenTag+'></details>');

    ++accordionX;
  }

  // handle accordion open event
  $('.accordion-button').click(function(e) {
    var $t = $(this);
    var $p = $t.parent();
    // since this fires before the accordion is opened, expaneded == false means that we're opening the accordion
    var open = $p.attr('aria-expanded') == 'false' ? true : false,
        openClass;
    if(open) {
      openClass = 'open';
      $p.attr('aria-expanded', 'true');
      $p.attr('open', '');
    } else {
      openClass = '';
      $p.attr('aria-expanded', 'false');
      $p.removeAttr('open');
    }

    $p.children('.accordion-content').removeClass('open').addClass(openClass);


    if(open === true) {
      // $p.attr('id', 'temp');
      // window.location.hash = $p.attr('data-label');
      // $p.attr('id', $p.attr('data-label'));
    } else {
      if(history) {
        // history.replaceState('', document.title, window.location.pathname); // nice and clean
      } else {
        // window.location.hash = '';
      }
      e.preventDefault();
      return false;
    }
  });

}

// Create galleries
function createGalleries() {
	var $ = jQuery3;
	var $gFields = $('.field-name-field-image-gallery');
	$gFields.each(function() {
		var $gallery = $(this);

		var si = $gallery.children().royalSlider({
			addActiveClass: true,
			arrowsNav: true,
			controlNavigation: 'none',
			autoScaleSlider: true, 
			autoScaleSliderWidth: 900,     
			autoScaleSliderHeight: 600,
			loop: true,
			fadeinLoadedSlide: false,
			globalCaption: true,
			keyboardNavEnabled: true,
			globalCaptionInside: false,

			visibleNearby: {
				enabled: true,
				centerArea: 0.75,
				center: true,
				breakpoint: 650,
				breakpointCenterArea: 0.64,
				navigateByCenterClick: true
			}
		}).data('royalSlider');
	});
}

function createTabs() {
  var $ = jQuery3;
  // wrap all tab items next to each others to one container so we can
  // use that to create tabs
  $('.field-item > :not(.single-tab) + .single-tab').each(function() {
    $(this).nextUntil('.field-item > :not(.single-tab)')
           .addBack()
           .wrapAll("<div class='tabs-container' />");
  });


  // Create tab functionality
  $('.tabs-container').each(function() {
    var $t = $(this);
    var tabX = 0;
    var tabNavHTML = '';
    $t.children('.single-tab').each(function() {
      ++tabX;

      var $tab = $(this);
      var title = $tab.children('.tab-title').text().trim();
      var contentHTML = $tab.children('.tab-content').html();
      var activeClass = (tabX == 1) ? 'active' : '';

      // add identifier classes
      $tab.addClass('tab-'+tabX).addClass(activeClass);

      tabNavHTML += '<li><a class="btn-tab-nav btn-tab-nav-'+tabX+' '+activeClass+'" data-tab="'+tabX+'" href="#tab-'+tabX+'">'+title+'</a></li>';
    });
    $t.prepend('<div class="tabs-nav"><ul>'+tabNavHTML+'</ul></div>');
  });

  // add tab navigation functionality
  $('a.btn-tab-nav').click(function(e) {
    var $t = $(this);
    var $tabContainer = $t.parents('.tabs-container');
    var tabX = $t.attr('data-tab');
    $tabContainer.find('.active').removeClass('active').end()
      .find('.tab-'+tabX).addClass('active').end()
      .find('.btn-tab-nav-'+tabX).addClass('active');
    // don't add hash to url
    e.preventDefault();
  });
}

function createRelatedContent() {
  var $rContent = $('#block-views-related-content-block');
  if($rContent.length > 0) {
    var viewHeaderHTML = $rContent.find('.view-header').html();
    $rContent.children('h2').append(viewHeaderHTML);
  }
}











// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.my_custom_behavior = {
  attach: function(context, settings) {


    // var $window = $(window);
    // var $stickyShare = $('#block-block-10');
    //   var shareTop = ($stickyShare.offset().top) - 60;
    // $window.scroll(function() {
    //   if($(window).scrollTop() > shareTop){
    //     $stickyShare.addClass('sticky');
    //   }else{
    //       $stickyShare.removeClass('sticky');
    //   }
    // });

 	/*
    Accordions
  //Hide content
 	var accordionContainers = $('.accordion-container').hide();

  //add elements and roles for accessibility
  jQuery3('.accordion-button').each(function(i, obj) {
    var accordContent = $(this).text();
    $(this).replaceWith('<button class="accordion-button">'+ accordContent + '</button>');
  });
  jQuery3('.accordion-button').attr({role: "button", "aria-expanded": "false", })
    .wrap("<div class='accordion-button-wrapper' role='heading' aria-level='3'> </div>");
  jQuery3('.accordion-container').wrap("<div role='region' aria-level='3'> </div>");


  var buttoncounter = 0;
  jQuery3('.accordion-button').each(function() {
    $(this).addClass("accordion-button"+buttoncounter);
    $(this).attr("id", "accordion"+buttoncounter);
    buttoncounter++;
  });
   var containercounter = 0;
  jQuery3('.accordion-container').each(function() {

    $(this).addClass("accordion-container"+containercounter);
    $(this).attr("id", "accordioncontainer"+containercounter);
    containercounter++;
  });


  jQuery3('.accordion-button-wrapper').each(function() {
    var accordionID = $(this).next().find(".accordion-container:first").attr('id');
    $(this).find('.accordion-button:first').attr("aria-controls", accordionID);
    var accordionbuttonID = $(this).find('.accordion-button:first').attr("id");
    $(this).next().find(".accordion-container:first").attr("aria-labelledby", accordionbuttonID)
  });


  jQuery3('.accordion-button-wrapper').click(function() {
    // accordionContainers.slideUp();
    // $(this).parent().next().slideDown();
    // return false;
    var accordionClass = $(this).find('.accordion-button:first').attr('class').split(' ').pop();
    var nextContainer = $(this).next().find(".accordion-container:first");
    $(this).find('.accordion-button:first').toggleClass("open");
    if($(this).find('.accordion-button:first').attr("aria-expanded") == "false"){
      $(this).find('.accordion-button:first').attr("aria-expanded", "true")
    }else{
      $(this).find('.accordion-button:first').attr("aria-expanded", "false")
    }
    nextContainer.slideToggle();
  });
  */

  /*
    __  __    U  ___ u   ____               _     U _____ u
  U|' \/ '|u   \/"_ \/U | __")u    ___     |"|    \| ___"|/
  \| |\/| |/   | | | | \|  _ \/   |_"_|  U | | u   |  _|"
   | |  | |.-,_| |_| |  | |_) |    | |    \| |/__  | |___
   |_|  |_| \_)-\___/   |____/   U/| |\u   |_____| |_____|
  <<,-,,-.       \\    _|| \\_.-,_|___|_,-.//  \\  <<   >>
   (./  \.)     (__)  (__) (__)\_)-' '-(_/(_")("_)(__) (__)
  */

  	//hide show ADG tag on mobile menu
  	$('.mobile-menu-button').click(function() {
  		// $('.site-name').fadeOut();
  		$(this).toggleClass('open-menu');
	});


  //mmenu mobile menu, see http://mmenu.frebsite.nl
    jQuery3("#mobile-menu").mmenu({
      // options
      "slidingSubmenus": true,
      "extensions": [
             // "fullscreen"
      ]
    }, {
       // configuration
       classNames: {
          fixedElements: {
             fixed: "header"
          }
       }
    });

    var API = jQuery3("#mobile-menu").data( "mmenu" );

    jQuery3(".mobile-menu-button").click(function() {
        if( !(jQuery3(this).hasClass('open-menu'))){
          API.close();
      }
      });
    /*
    U _____ u __  __    _____  U _____ u   ____     _   _       _       _            _                  _   _       _  __   ____
    \| ___"|/ \ \/"/   |_ " _| \| ___"|/U |  _"\ u | \ |"|  U  /"\  u  |"|          |"|        ___     | \ |"|     |"|/ /  / __"| u
     |  _|"   /\  /\     | |    |  _|"   \| |_) |/<|  \| |>  \/ _ \/ U | | u      U | | u     |_"_|   <|  \| |>    | ' /  <\___ \/
     | |___  U /  \ u   /| |\   | |___    |  _ <  U| |\  |u  / ___ \  \| |/__      \| |/__     | |    U| |\  |u  U/| . \\u u___) |
     |_____|  /_/\_\   u |_|U   |_____|   |_| \_\  |_| \_|  /_/   \_\  |_____|      |_____|  U/| |\u   |_| \_|     |_|\_\  |____/>>
     <<   >>,-,>> \\_  _// \\_  <<   >>   //   \\_ ||   \\,-.\\    >>  //  \\       //  \\.-,_|___|_,-.||   \\,-.,-,>> \\,-.)(  (__)
    (__) (__)\_)  (__)(__) (__)(__) (__) (__)  (__)(_")  (_/(__)  (__)(_")("_)     (_")("_)\_)-' '-(_/ (_")  (_/  \.)   (_/(__)
    */
  //Add external class to external links
  jQuery3('a:not(.no-ext)').filter(function() {
    return this.hostname && this.hostname !== location.hostname;
  }).addClass("external");



  /*
    ____                 ____  U _____ u      _   _       _    __     __
   / __"| u      ___    |  _"\ \| ___"|/     | \ |"|  U  /"\  u\ \   /"/u
  <\___ \/      |_"_|  /| | | | |  _|"      <|  \| |>  \/ _ \/  \ \ / //
   u___) |       | |   U| |_| |\| |___      U| |\  |u  / ___ \  /\ V /_,-.
   |____/>>    U/| |\u  |____/ u|_____|      |_| \_|  /_/   \_\U  \_/-(_/
    )(  (__).-,_|___|_,-.|||_   <<   >>      ||   \\,-.\\    >>  //
   (__)      \_)-' '-(_/(__)_) (__) (__)     (_")  (_/(__)  (__)(__)
  */
  //Open current page's menu iten by default
  jQuery3("#block-menu-block-1 .menu-block-1 > ul.menu li .active > ul.menu").toggleClass("open");
  jQuery3("#block-menu-block-1 .menu-block-1 > ul.menu li.is-active").toggleClass("is-open");
  //Toggle classes on click to show children
  jQuery3("#block-menu-block-1 .menu-block-1 > ul.menu li").click(
    function($e){
      $e.stopPropagation();
      jQuery3(this).toggleClass("is-open");
      jQuery3(this).children("ul.menu:first").toggleClass("open");
    }
  );

  //Slick slider
    //Landing page slick slider
  jQuery3('.card-wrapper').slick({
    mobileFirst: true,
    accessibility: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    arrows: false,
    infinite: false,
    variableWidth: true,
    responsive: [
      // {
      //  breakpoint: 1,
      //  settings: {
      //    slidesToShow: 1
      //  }
      // },
      {
        breakpoint: 665,
        settings: {
          centerMode: false,
          slidesToShow: 2
        }
      },
      // {
      //  breakpoint: 815,
      //  settings: {
      //    slidesToShow: 3
      //  }
      // },
      {
        breakpoint: 1000,
        settings: "unslick"
      }
    ]
  });
  //slick slider slick/unslick workaround, see: https://github.com/kenwheeler/slick/issues/1730#issuecomment-161691797
  var $domHTML = jQuery3('html');
  var $w3 = jQuery3(window);
  $w3.resize(function() {
    jQuery3('.card-wrapper').slick('resize');

    // set the html width to window width to fix an issue with mmenu
    $domHTML.width($w3.width());
  }).resize();

  jQuery3(window).on('orientationchange', function() {
    jQuery3('.card-wrapper').slick('resize');
  });

  $('.card-wrapper .node').click(function() {
    var $t = $(this);
    var $a = $t.find('.field-name-title a');
    document.location = $a.attr('href');
  });

  //    //Project related news slick slider
  // jQuery3('.view-related-new-stories .view-content').slick({
  //   mobileFirst: true,
  //   centerMode: true,
  //   centerPadding: '60px',
  //   slidesToShow: 1,
  //   arrows: false,
  //   infinite: false,
  //   variableWidth: true,
  //   responsive: [
  //     // {
  //     //  breakpoint: 1,
  //     //  settings: {
  //     //    slidesToShow: 1
  //     //  }
  //     // },
  //     {
  //       breakpoint: 665,
  //       settings: {
  //         centerMode: false,
  //         slidesToShow: 2
  //       }
  //     },
  //     // {
  //     //  breakpoint: 815,
  //     //  settings: {
  //     //    slidesToShow: 3
  //     //  }
  //     // },
  //     {
  //       breakpoint: 1000,
  //       settings: "unslick"
  //     }
  //   ]
  // });


  // //slick slider slick/unslick workaround, see: https://github.com/kenwheeler/slick/issues/1730#issuecomment-161691797
  // jQuery3(window).resize(function() {
  //   jQuery3('.view-related-new-stories .view-content').slick('resize');
  // });

  // jQuery3(window).on('orientationchange', function() {
  //   jQuery3('.view-related-new-stories .view-content').slick('resize');
  // });

  //facebook share url
  var currentPage = window.location.href;
  $('.fb-share-button').attr("data-href", currentPage);

  //news articles view combined filter form input placeholder
  $viewForm = $(".form-type-textfield.form-item-combine input");
  if($viewForm.length > 0){
    $viewForm.attr("placeholder", "Enter search terms");
  }

  $('#search-block-form input[type="text"]').attr('placeholder', 'Search SafeWork SA');

  //News article share links
  var newsPage = window.location.href;
  var facebookLink = "https://www.facebook.com/sharer.php?u=" + newsPage;
  jQuery3('.facebook-link').attr("href", facebookLink );

  var twitterLink = "https://twitter.com/intent/tweet?url=" + newsPage;
  jQuery3('.twitter-link').attr("href", twitterLink );

  var linkedinLink = "https://www.linkedin.com/shareArticle?mini=true&url=" + newsPage;
  jQuery3('.linkedin-link').attr("href", linkedinLink );



  //  prevent footer links
  $('.menu-block-2 > ul > li > a').click(function(e) {
    // e.preventDefault();
    if (e.preventDefault) {
    	// e.preventDefault();
    } else {
    	// e.returnValue = false;
    }
  });
  //make tables stack on mobile
  jQuery3('#content table').stacktable();

  //Hide second menu in sidebar top/first region if both are showing
  if(jQuery3('#block-menu-block-1 .active').length > 0){
    jQuery3('#block-menu-menu-footer-menu').hide();
  }

    //Add text for accessibility
  jQuery3('.mm-next').text('See pages in this section');
  jQuery3('.mm-prev').text('See the previous sections');

  //Open/close the header search bar
  var $body = jQuery3('body');
  jQuery3('#menu-1186-1 a').click(function(e) {
    e.preventDefault();
    jQuery3('body').toggleClass("search-closed search-open");
    jQuery3('#edit-keys-2').focus();
  });

  //set target="_blank" on downloads field links
  $('.node-type-project .field-name-field-file .file a').attr('target', '_blank');

  //Make footer sidenav top level item non-clickable
  jQuery3('#block-menu-menu-footer-menu .block__content > ul.menu > li.menu__item > a').click(function(e) {
  	// e.preventDefault();
  	if (e.preventDefault) {
    	e.preventDefault();
    } else {
    	e.returnValue = false;
    }
   });

  //Make table of contents top elements height smaller
  jQuery('.toc-filter-top').parent().css({'height': '0px', 'margin' : '0px'});

  //Force files to open in new window
  jQuery3('.file a').attr('target', '_blank');


   }}

/*
  Custom jQuery functions
*/
$.fn.replaceWithPush = function(a) {
    var $a = $(a);

    this.replaceWith($a);
    return $a;
};

$.fn.tagName = function() {
  return this.prop("tagName");
};

$.fn.smartTrim = function(limit) {
    return this.each(function() {
    if(typeof limit == 'undefined') {
      limit = 120;
    }

    var $t = $(this);
    var text = $t.text().trim();

    if(text.length > limit) {
      $t.html($t.text().trim().substring(0, limit)
        .split(" ").slice(0, -1).join(" ") + " [...]");
    }
  });
}

$.fn.getRealDimensions = function (outer) {
  var $this = $(this);
  if ($this.length == 0) {
    return false;
  }
  var $clone = $this.clone()
    .show()
    .css('visibility','hidden')
    .insertAfter($this);        
  var result = {
    width:      (outer) ? $clone.outerWidth() : $clone.innerWidth(), 
    height:     (outer) ? $clone.outerHeight() : $clone.innerHeight(), 
    offsetTop:  $clone.offset().top, 
    offsetLeft: $clone.offset().left
  };
  $clone.remove();
  return result;
}

/*
  ALLOW PRINTING
*/
// Set up before/after handlers
var beforePrint = function() {
    jQuery3("details").attr('open', '');
};
var afterPrint = function() {
    jQuery3("details").removeAttr('open');
};

// Webkit
if (window.matchMedia) {
    var mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener(function(mql) {
        if (mql.matches) {
            beforePrint();
        } else {
            afterPrint();
        }
    });
}

// IE, Firefox
window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;
})(jQuery, Drupal, this, this.document);
