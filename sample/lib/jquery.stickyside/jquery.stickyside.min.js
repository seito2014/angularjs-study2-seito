/*!
 * Sticky Side v0.0.0
 */

(function(window){

	var stickySide = function(option) {

		var OPTION = {
			staticSide : null,
			mainColumn : null,
			siteWidth : 0,
			bottomStyleNum: 0,
			bottomStickyNum : 0,
			pcOnly: true
		};

		option = $.extend({},OPTION,option);

		var SITE_WIDTH = option.siteWidth, //サイト全体の幅
			BOTTOM_STYLE_NUM = option.bottomStyleNum, //sticy要素に純粋な高さ以外に、シャドウなどのスタイルが当たっている場合、その分の値
			STICY_BOTTOM_NUM = option.bottomStickyNum,
			JUDGE_TIME = 200; //fix時の"bottom"の値

		var $stickySide = $(this),
			$staticSide = (staticSide = null) ? $('#asdefesf') : $(option.staticName),　//サイドバーの一部だけどついてきては欲しくない要素
			$mainColumn = $(option.mainColumn); //メインカラム要素

		var	winWidth = $(window).width(),
			winHeight = $(window).height(),
			mainHeight = $mainColumn.height(),
			staticSideHeight = ($staticSide.length > 0) ? $staticSide.outerHeight(true) : 0 ;

		var stickyTimer = false;

		// 値変化するけどひとまず定義
		var ua,
			winScrollTop,
			winScrollBottom,
			mainOffset,
			mainBottom,
			stickyOffSet,
			stickyHeight,
			stickyBottom,
			bottomNum;

		// PCかどうか判定
		function isPc() {
			ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf('ipad') != -1 || ua.indexOf('iphone') != -1 || ua.indexOf('ipod') != -1 || ua.indexOf('android') != -1) {
				return false;
			}
			return true;
		}

		// 関数(スクロールによって変化する値)
		function init(){
			winScrollTop = $(window).scrollTop();
			winScrollBottom = winScrollTop + winHeight;
			mainOffset = $mainColumn.offset().top;
			mainBottom = mainOffset + mainHeight;
			stickyOffSet = $stickySide.offset().top;
			stickyHeight = $stickySide.outerHeight();
			stickyBottom = stickyOffSet + stickyHeight;
		}

		// stickySide本体
		function stickySideFunction(){

			if ($stickySide.hasClass('-author')) {
				// console.log(winScrollTop+ '::'+stickyOffSet +':::'+ winScrollTop);
				if (stickyOffSet < winScrollTop && !$stickySide.hasClass('fixed')) {
					setTimeout(function(){
						// $stickySide.addClass('fixed');
					}, 200);
					$stickySide.addClass('fixed');
				} else if (700 > winScrollTop && $stickySide.hasClass('fixed')){
					// $stickySide.removeClass('fixed');
				}
			} else {
				// 画面内にサイドバーが見切れている場合、何もしない
				if((mainOffset + stickyHeight + staticSideHeight + STICY_BOTTOM_NUM) > winScrollBottom || winScrollTop === 0) {
					if($stickySide.hasClass("fixed")) {
						$stickySide.removeClass('fixed');
						$stickySide.animate('bottom','');
					}
				} else if(winScrollBottom - STICY_BOTTOM_NUM >= stickyBottom){
					// スクロールさせたらついてくる
					$stickySide.addClass('fixed');
				}
			}
			//authorはウエツキなので
			if ($stickySide.hasClass('-author')) {
				$stickySide.css('top','');
				// メインコンテンツ下までいったら、そこでピタッと止める
				if(winScrollBottom - STICY_BOTTOM_NUM - (stickyHeight/3)+40 >= mainBottom){
					bottomNum = winHeight - (mainBottom - winScrollTop);
					$stickySide.css({
						'bottom':bottomNum,
						'position': 'fixed',
						right: 'auto'
					});
					$stickySide.removeClass('fixed');
				}
				else {
					$stickySide.css({
						'bottom': '',
						'position': '',
						right: 'auto'
					});
					if ($('.button.button_to_sp').length > 0) {
						ofseeet = 700;
					} else {
						ofseeet = 616;
					}
					if (ofseeet < winScrollTop) {
						$stickySide.addClass('fixed');
					} else {
						$stickySide.removeClass('fixed');
					}

				}
			} else {
				// メインコンテンツ下までいったら、そこでピタッと止める
				if(winScrollBottom - STICY_BOTTOM_NUM >= mainBottom){
					bottomNum = winHeight - (mainBottom - winScrollTop);
					$stickySide.css('bottom',bottomNum);
				} else{
					$stickySide.css('bottom','');
				}
			}
		}

		// 作動させるかどうかの判定
		function stickySideRun(){

			init();

			// メインがwindowより小さい場合、またはサイドバーがメインカラムより小さい場合動かさない
			if((mainOffset + mainHeight) < winHeight || mainHeight <= $stickySide.height()) {
				$stickySide.removeClass('fixed');
				return;
			}
			// ウィンドウサイズがサイトの全体幅より小さかったら、何もしない
			if(winWidth <= SITE_WIDTH){
				$stickySide.removeClass('fixed');
				return;
			}

			stickySideFunction();
		}

		// stickySide発動タイミング
		function stickySideTiming(){
			$(window).on('scroll',stickySideRun);
			$(window).on('load',stickySideRun);
			$(window).on('resize',function() {
		        if (stickyTimer !== false) {
		            clearTimeout(stickyTimer);
		        }
		        stickyTimer = setTimeout(function() {
		        	winWidth = $(window).width();
					winHeight = $(window).height();
					stickySideRun();
		        }, JUDGE_TIME);
		    });
		}

		// 起動
		if(option.pcOnly === true){
			if(isPc()){
				stickySideTiming();
			}
		} else{
			stickySideTiming();
		}
	};

	if ( typeof define === "function" && define.amd ) {
		define( "jquery.stickySide", ['jquery'], function($) {
			$.fn.stickySide = stickySide;
		});
	} else if($) {
		$.fn.stickySide = stickySide;
	}

})(window);