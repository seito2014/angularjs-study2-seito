(function() {
	var $document = $(document);

	$('a.js_scroll').click(function(event) {
		console.log($(this).attr('href'));
		if(!$(this).hasClass('nolink')){
			var id = $(this).attr('href'),
				offset = 10,
				target = $(id).offset().top - offset;
			m_stop_on();
			$('html, body').animate({scrollTop:target}, 500 , m_stop_off);
			event.preventDefault();
			return false;
		}
	});

	function m_stop_on(){
		$document.on('DOMMouseScroll', preventDefault);
	    $document.on('mousewheel', preventDefault);
	}

	function m_stop_off(){
		$document.off('DOMMouseScroll', preventDefault);
	    $document.off('mousewheel', preventDefault);
	}

	function preventDefault(e){
		event.preventDefault();
	}
})();