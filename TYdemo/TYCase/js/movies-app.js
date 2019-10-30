$(function(){
	function setContentSize() {
		$('.swiper-content').css({
			height: $(window).height()-$('.swiper-nav').height()
		})
	}
	setContentSize()
	$(window).resize(function(){
		setContentSize()
	})

	//Swiper Content
	var contentSwiper = $('.swiper-content').swiper({
		onSlideChangeStart: function(){
			updateNavPosition()
		}
	})


    //Gallery
    for(var i=0;i<contentSwiper.slides.length;++i)
    {
        var swiperGallery =$('.page'+i).swiper({
            mode: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            freeModeFluid: true,
            scrollContainer: true,
            mousewheelControl: true,
            scrollbar: {
                container:$('.page'+i+' .swiper-scrollbar')[0]
            }
        })
        //swiperGallery.reInit()
    }



	//Nav
	var navSwiper = $('.swiper-nav').swiper({
		visibilityFullFit: true,
		slidesPerView:'auto',
		//Thumbnails Clicks
		onSlideClick: function(){
            var num= navSwiper.clickedSlideIndex
			contentSwiper.swipeTo(num)
		}
	})

	//Update Nav Position
	function updateNavPosition(){
		$('.swiper-nav .active-nav').removeClass('active-nav')
		var activeNav = $('.swiper-nav .swiper-slide').eq(contentSwiper.activeIndex).addClass('active-nav')
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index()>navSwiper.activeIndex) {
				var thumbsPerNav = Math.floor(navSwiper.width/activeNav.width())-1
				navSwiper.swipeTo(activeNav.index()-thumbsPerNav)
			}
			else {
				navSwiper.swipeTo(activeNav.index())
			}

		}
	}
})
