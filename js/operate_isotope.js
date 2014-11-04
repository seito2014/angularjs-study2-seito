(function(){
// グリッドレイアウト　isotope
	// 関数
	var $container = $('#js_modal_trigger_area');
	var isotopeItem = '.b_member_list--item';

	function isotope(){
		$container.isotope({
			itemSelector : isotopeItem,
			animationOptions: {
				duration: SPEED_NORMAL,
				easing: 'linear',
				queue: false
			},
			masonry : {
			  columnWidth : 246
			},
			cellsByRow: {
				columnWidth: 246,
				rowHeight: 334
			},
			onLayout:function(){
                $container.addClass('is_loaded');
			}
		});
	}

	// オプション
	$(window).on('load',function(){
		isotope();
	});

// ソートメニュー
	var $isotopeTrigger = $('#js_isotope_trigger').find('a');
	var filteringTag = '',
		oldActive = $isotopeTrigger.eq(0);

	$isotopeTrigger.on('click', function(e) {

		e.preventDefault();

		var $this = $(this);

		// フィルタリングさせる要素を決定
		filteringTag = $this.attr('href');

		// 前のカレント取る
		if(!$this.hasClass('is_active')){
			oldActive.removeClass('is_active');
		}

		// 同じタグがクリックされた場合
		if($this.hasClass('is_active')){
			$this.removeClass('is_active');

			// 以前のカレントを'すべて'に
			$isotopeTrigger.eq(0).addClass('is_active');
			oldActive = $isotopeTrigger.eq(0);
			
			// チェックを外す
			filteringTag = '';

		// 普通に別のタグがクリックされた場合
		} else {
			$this.addClass('is_active');

			// 以前のカレントを上書き
			oldActive = $this;
		}

		// フィルター作動
		$container.isotope({ filter: filteringTag });

		// lazyload起動
		var timeout = setTimeout(function() {
	        $window.trigger('scroll');
	    }, SPEED_NORMAL);

	});
})();