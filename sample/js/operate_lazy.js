(function(){

    // スクロールでlazyloadを走らせる
    var lazy;

    function init() {
        lazy = $("img.js_lazy").each(function(){
             $(this).lazyload({
                effect : "fadeIn"
            });
        });
    }
    $window.on("load",init);
    $window.trigger("scroll");

})();