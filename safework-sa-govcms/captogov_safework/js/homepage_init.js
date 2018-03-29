(function ($) {
  $(document).ready(function(){

  // 	function homepageTwitterFeed(){
	//   	//Homepage single tweet feed
	//   	var configProfile = {
	// 	  "profile": {"screenName": 'SA_AGD'},
	// 	  "domId": 'single-tweet-feed',
	// 	  "maxTweets": 1,
	// 	  "enableLinks": true,
	// 	  "showUser": true,
	// 	  "showTime": true,
	// 	  "showImages": true,
	// 	  "lang": 'en'
	// 	};
	// 	twitterFetcher.fetch(configProfile);
	// }
	//Add button back to twitter
	// function addButton(){
	// 	$(window).load(function(){
	// 		var $href = $("#single-tweet-feed").find(".user a").attr("href");
	// 		$('#single-tweet-feed ul').append('<a href="'+$href+'" class="twitter-link button">View more on twitter</a>');
	// 		$('#single-tweet-feed').find("a").attr("target","_blank");
	// 	});
	// }
	// homepageTwitterFeed();
	// addButton();

	//homepage Key Resources slick slider
	jQuery3('.view-projects .view-content').slick({
		mobileFirst: true,
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 1,
		arrows: true,
		infinite: true,
		variableWidth: true,
		responsive: [
			// {
			// 	breakpoint: 1,
			// 	settings: {
			// 		slidesToShow: 1
			// 	}
			// },
			{
				breakpoint: 665,
				settings: {
					centerMode: false,
					slidesToShow: 3
				}
			},
			// {
			// 	breakpoint: 815,
			// 	settings: {
			// 		slidesToShow: 3
			// 	}
			// },
			// {
			// 	breakpoint: 1000,
			// 	settings: "unslick"
			// }
		]
	});
  jQuery3('.view-id-latest_news .view-content').slick({
		mobileFirst: true,
		centerMode: true,
		centerPadding: '60px',
		slidesToShow: 1,
		arrows: true,
		infinite: true,
		variableWidth: true,
		responsive: [
			// {
			// 	breakpoint: 1,
			// 	settings: {
			// 		slidesToShow: 1
			// 	}
			// },
			{
				breakpoint: 665,
				settings: {
					centerMode: false,
					slidesToShow: 3
				}
			},
			// {
			// 	breakpoint: 815,
			// 	settings: {
			// 		slidesToShow: 3
			// 	}
			// },
			// {
			// 	breakpoint: 1000,
			// 	settings: "unslick"
			// }
		]
	});
	//slick slider slick/unslick workaround, see: https://github.com/kenwheeler/slick/issues/1730#issuecomment-161691797
	jQuery3(window).resize(function() {
	  jQuery3('.view-projects .view-content').slick('resize');
    jQuery3('.view-id-latest_news .view-content').slick('resize');
	});

	jQuery3(window).on('orientationchange', function() {
	  jQuery3('.view-projects .view-content').slick('resize');
    jQuery3('.view-id-latest_news .view-content').slick('resize');
	});

 });
}(jQuery));
