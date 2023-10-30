$(document).ready(function(){

	$('#card-text').trumbowyg();
	$('#card-text-2').trumbowyg();
	$('#card-text-3').trumbowyg();

    var monsterOnly = $('.monster-only');
    var stOnly = $('.st-only');
    var effOnly = $('.effect-monster-only');
    var normOnly = $('.normal-monster-only');
    var allInputs = $('.input');
    var legend = $('.card-legend');
    var cardAttribute = $('.card-attribute')
    var maximumOnly = $('.maximum-only');
    $('.progress').hide();
    $('#progress-text').hide();
    $('#card-text').change();
    $('#card-text-2').change();
    $('#card-text-3').change();
    $('.maximum-only').show();
    $('#card-maximum').show();

    let cardTypeSelected = $('#ctype option:selected').val();
    if (cardTypeSelected == 'Normal'){
        $('.lore').css('font-family', 'CardLore');
        $('.lore-2').css('font-family', 'CardLore');
        $('.lore-3').css('font-family', 'CardLore');
    } else{
        $('.lore').css('font-family', 'CardEffect');
        $('.lore-2').css('font-family', 'CardEffect');
        $('.lore-3').css('font-family', 'CardEffect');
    }

    effOnly.hide();
    squeezeToFit($('.card-name-1'), $('.card-name'));
    squeezeToFit($('.card-name-1-2'), $('.card-name-2'));
    squeezeToFit($('.card-name-1-3'), $('.card-name-3'));
    resizeToFit($('.lore'), $('.card-lore'));
    resizeToFit($('.lore-2'), $('.card-lore-2'));
    resizeToFit($('.lore-3'), $('.card-lore-3'));

    $('.input').change(function(){
        let cardName = $('#card-name').val();
        //Change the card name
        if (cardName != ""){
            $('.card-name-1').html(cardName);
            squeezeToFit($('.card-name-1'), $('.card-name'));
        }
        let cardName2 = $('#card-name-2').val();
        //Change the card name
        if (cardName2 != ""){
            $('.card-name-1-2').html(cardName2);
            squeezeToFit($('.card-name-1-2'), $('.card-name-2'));
        }
        let cardName3 = $('#card-name-3').val();
        //Change the card name
        if (cardName3 != ""){
            $('.card-name-1-3').html(cardName3);
            squeezeToFit($('.card-name-1-3'), $('.card-name-3'));
        }
        let cardTypeSelected = $('#ctype option:selected').val();
        //Change the card frame
        $('.card-frame').attr('src', 'view/img/frame/' + cardTypeSelected + '.png');
        $('.card-frame-bottom').attr('src', 'view/img/frame/' + cardTypeSelected + '_Bottom.png');
        $('.card-frame-2').attr('src', 'view/img/frame/' + cardTypeSelected + '.png');
        $('.card-frame-bottom-2').attr('src', 'view/img/frame/' + cardTypeSelected + '_Bottom.png');
        $('.card-frame-3').attr('src', 'view/img/frame/' + cardTypeSelected + '.png');
        $('.card-frame-bottom-3').attr('src', 'view/img/frame/' + cardTypeSelected + '_Bottom.png');
        //Change the attribute
        cardAttribute.attr('src', 'view/img/attribute/' + $('#monster-attribute option:selected').val() + '.png');
        //Change the monster type
        $('.card-type-1').html($('#monster-type').val());
        $('.card-type-1-2').html($('#monster-type-2').val());
        $('.card-type-1-3').html($('#monster-type-3').val());
        //Change the monster level
        let level = $('#level').val() > 12 ? 12 : ($('#level').val() < 1 ? 1 : $('#level').val());
        $('.card-level').attr('src', 'view/img/stat/Level-' + level + '.png');
        //Change the atk/def
        if (cardTypeSelected != "Spell" && cardTypeSelected != "Trap"){
            $('.card-atk').html($('#atk').val() < 0 ? 0 : $('#atk').val());
            $('.card-def').html($('#def').val() < 0 ? 0 : $('#def').val());
            $('.card-atk-rush').html($('#atk').val() < 0 ? 0 : $('#atk').val());
            $('.card-def-rush').html($('#def').val() < 0 ? 0 : $('#def').val());
            $('.card-max-atk').html($('#maximum-atk').val() < 0 ? 0 : $('#maximum-atk').val());
            $('.card-max-atk-rush').html($('#maximum-atk').val() < 0 ? 0 : $('#maximum-atk').val());
        }
        //Change rarities
        let rarity = $('#rarity option:selected').val();
        if (rarity == "common"){
            $('.card-name-1').removeClass('rarity-rush');
            $('.card-name-1-2').removeClass('rarity-rush');
            $('.card-name-1-3').removeClass('rarity-rush');
            $('.card-atk').removeClass('rarity-rush');
            $('.card-atk-2').removeClass('rarity-rush');
            $('.card-atk-3').removeClass('rarity-rush');
            $('.card-def').removeClass('rarity-rush');
            $('.card-def-2').removeClass('rarity-rush');
            $('.card-def-3').removeClass('rarity-rush');
            $('.card-max-atk').removeClass('rarity-rush');
        } else{
            if (!$('.card-name-1').hasClass('rarity-rush')){
                $('.card-name-1').addClass('rarity-rush');
            }
            if (!$('.card-name-1-2').hasClass('rarity-rush')){
                $('.card-name-1-2').addClass('rarity-rush');
            }
            if (!$('.card-name-1-3').hasClass('rarity-rush')){
                $('.card-name-1-3').addClass('rarity-rush');
            }
            if (!$('.card-atk').hasClass('rarity-rush')){
                $('.card-atk').addClass('rarity-rush');
            }
            if (!$('.card-atk-2').hasClass('rarity-rush')){
                $('.card-atk-2').addClass('rarity-rush');
            }
            if (!$('.card-atk-3').hasClass('rarity-rush')){
                $('.card-atk-3').addClass('rarity-rush');
            }
            if (!$('.card-def').hasClass('rarity-rush')){
                $('.card-def').addClass('rarity-rush');
            }
            if (!$('.card-def-2').hasClass('rarity-rush')){
                $('.card-def-2').addClass('rarity-rush');
            }
            if (!$('.card-def-3').hasClass('rarity-rush')){
                $('.card-def-3').addClass('rarity-rush');
            }
            if (!$('.card-max-atk').hasClass('rarity-rush')){
                $('.card-max-atk').addClass('rarity-rush');
            }
        }

        //Change card creator
        $('.card-creator').html($('#creator').val());
        $('.card-creator-2').html($('#creator-2').val());
        $('.card-creator-3').html($('#creator-3').val());

        //Change card set number
        $('.card-set-number').html($('#set-number').val());
        $('.card-set-number-2').html($('#set-number-2').val());
        $('.card-set-number-3').html($('#set-number-3').val());

        $('.card-type-1').removeClass('p40');
        $('.card-type-1').removeClass('p50');
        $('.card-type-1-2').removeClass('p40');
        $('.card-type-1-2').removeClass('p50');
        $('.card-type-1-3').removeClass('p40');
        $('.card-type-1-3').removeClass('p50');

        if (cardTypeSelected == 'Normal'){
            $('.lore').css('font-family', 'CardLore');
            $('.lore-2').css('font-family', 'CardLore');
            $('.lore-3').css('font-family', 'CardLore');
        } else{
            $('.lore').css('font-family', 'CardEffect');
            $('.lore-2').css('font-family', 'CardEffect');
            $('.lore-3').css('font-family', 'CardEffect');
        }
    });
    //Change card image
    $('#image-url').change(function(){
        $(".card-image").attr("src", $("#image-url").val());
        $(".card-image-2").attr("src", $("#image-url").val());
        $(".card-image-3").attr("src", $("#image-url").val());
    });
    $('.trumbowyg-editor').keyup(function(){
        //Change card text
        $('.lore').html($('#card-text').val());
        $('.lore-2').html($('#card-text-2').val());
        $('.lore-3').html($('#card-text-3').val());
        resizeToFit($('.lore'), $('.card-lore'));
        resizeToFit($('.lore-2'), $('.card-lore-2'));
        resizeToFit($('.lore-3'), $('.card-lore-3'));
    });
    $('.trumbowyg-editor').focusout(function(){
        //Change card text
        $('.lore').html($('#card-text').val());
        $('.lore-2').html($('#card-text-2').val());
        $('.lore-3').html($('#card-text-3').val());
        resizeToFit($('.lore'), $('.card-lore'));
        resizeToFit($('.lore-2'), $('.card-lore-2'));
        resizeToFit($('.lore-3'), $('.card-lore-3'));
    });
    //Show or hide the overlay image input
    $('#overlay').change(function(){
        if ($('#overlay').is(":checked")){
            $(".overlay-only").show();
        } else{
            $(".overlay-only").hide();
        }
    });
    //Show or hide the LEGEND icon
    $('#legend').change(function(){
        if ($('#legend').is(":checked")){
            legend.show();
        } else{
            legend.hide();
        }
    });
    $('#upload-img').on('change', function () {
    	var form = new FormData();
    	form.append("image", $('#upload-img').prop('files')[0])
    	var settings = {
    	  "url": "https://api.imgbb.com/1/upload?key=aa6363fd0b78e5b38d451e3e648e97d6",
    	  "method": "POST",
    	  "timeout": 0,
    	  "processData": false,
    	  "mimeType": "multipart/form-data",
    	  "contentType": false,
    	  "data": form
    	};

    	$.ajax(settings).done(function (response) {
      	var jx = JSON.parse(response);
      	$("#image-url").val(jx.data.url);
    	$(".card-image").attr("src", $("#image-url").val());
      });
    });
    $("#upload-btn").click(function(){
    	$("#upload-img").click();
    });
    $('#upload-overlay-img').on('change', function () {
    	var form = new FormData();
    	form.append("image", $('#upload-overlay-img').prop('files')[0])
    	var settings = {
    	  "url": "https://api.imgbb.com/1/upload?key=aa6363fd0b78e5b38d451e3e648e97d6",
    	  "method": "POST",
    	  "timeout": 0,
    	  "processData": false,
    	  "mimeType": "multipart/form-data",
    	  "contentType": false,
    	  "data": form
    	};

    	$.ajax(settings).done(function (response) {
      	var jx = JSON.parse(response);
      	$("#image-overlay-url").val(jx.data.url);
    	$(".card-image-overlay").attr("src", $("#image-overlay-url").val());
    	$(".card-image-overlay-1").attr("src", $("#image-overlay-url").val());
    	$(".card-image-overlay-2").attr("src", $("#image-overlay-url").val());
      });
    });
    $("#upload-overlay-btn").click(function(){
    	$("#upload-overlay-img").click();
    });
    $("#upload-file-btn").click(function(){
    	$("#upload-file").click();
    });
    $('#random-generate').click(function(){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 4; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result += "-";
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        $('#set-number').val(result);
        //Change card set number
        $('.card-set-number').html(result);
    });
    $('#random-generate-2').click(function(){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 4; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result += "-";
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        $('#set-number-2').val(result);
        //Change card set number
        $('.card-set-number-2').html(result);
    });
    $('#random-generate-3').click(function(){
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 4; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result += "-";
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        $('#set-number-3').val(result);
        //Change card set number
        $('.card-set-number-3').html(result);
    });
    $('#save').click(function(){
        let div = $('#display-card')[0];
        let div2 = $('#display-card-2')[0];
        let div3 = $('#display-card-3')[0];
        html2canvas(div, {allowTaint:true, useCORS:true}).then(
        function (canvas) {
            $('#canvas').html(canvas);
            saveAs(canvas.toDataURL(), $('#set-number').val() + '.png');
        });

        html2canvas(div2, {allowTaint:true, useCORS:true}).then(
        function (canvas) {
            $('#canvas').html(canvas);
            saveAs(canvas.toDataURL(), $('#set-number-2').val() + '.png');
        });

        html2canvas(div3, {allowTaint:true, useCORS:true}).then(
        function (canvas) {
            $('#canvas').html(canvas);
            saveAs(canvas.toDataURL(), $('#set-number-3').val() + '.png');
        });
    });

    function saveAs(uri, filename){
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    }

    function squeezeToFit(text, div){
        var larger = text.width() > div.width();
        if (larger){
            scale = div.width() / text.width();
        } else{
            scale = 1;
        }
        text.css('transform', 'scale(' + scale + ', 1)');
        text.css('transform-origin', 'top left');
    }

    function resizeToFit(text, div){
        var larger = text.height() > div.height();
        if (larger){
            textFit(div);
            text.css('font-size', 'auto');
        } else{
            textFit(div);
            text.css('font-size', '100%');
        }
    }

});
