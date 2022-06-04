$(document).ready(function(){

	$('#card-text').trumbowyg();

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

    let cardTypeSelected = $('#ctype option:selected').val();
    if (cardTypeSelected == 'Normal'){
        $('.lore').css('font-family', 'CardLore');
    } else{
        $('.lore').css('font-family', 'CardEffect');
    }

    $('.card-st-type').hide();
    maximumOnly.hide();
    stOnly.hide();
    effOnly.hide();
    squeezeToFit($('.card-name-1'), $('.card-name'));
    resizeToFit($('.lore'), $('.card-lore'));

    $('.input').change(function(){
        let cardName = $('#card-name').val();
        //Change the card name
        if (cardName != ""){
            $('.card-name-1').html(cardName);
            squeezeToFit($('.card-name-1'), $('.card-name'));
        }
        //Show monster card or spell/trap card info input depending on player selection
        let cardTypeSelected = $('#ctype option:selected').val();
        if (cardTypeSelected == "Normal" || cardTypeSelected == "Effect" || cardTypeSelected == "Fusion"){
            stOnly.hide();
            monsterOnly.show();
        } else{
            stOnly.show();
            monsterOnly.hide();
        }
        //Change the card frame
        $('.card-frame').attr('src', 'view/img/frame/' + cardTypeSelected + '.png');
        //Change the attribute
        if (cardTypeSelected == "Spell"){
            cardAttribute.attr('src', 'view/img/attribute/SPELL.png');
        } else if (cardTypeSelected == "Trap"){
            cardAttribute.attr('src', 'view/img/attribute/TRAP.png');
        } else{
            cardAttribute.attr('src', 'view/img/attribute/' + $('#monster-attribute option:selected').val() + '.png');
        }
        //Change the monster type
        let monsterType = $('#monster-type').val();
        if (cardTypeSelected == "Spell"){
            $('.card-type-1').html("Spell Card");
        } else if (cardTypeSelected == "Trap"){
            $('.card-type-1').html("Trap Card");
        } else{
            $('.card-type-1').html(monsterType);
        }
        //Change the monster level
        let level = $('#level').val() > 12 ? 12 : ($('#level').val() < 1 ? 1 : $('#level').val());
        $('.card-level').attr('src', 'view/img/stat/Level-' + level + '.png');
        //Change the atk/def
        if (cardTypeSelected != "Spell" && cardTypeSelected != "Trap"){
            $('.card-atk').html($('#atk').val() < 0 ? 0 : $('#atk').val());
            $('.card-def').html($('#def').val() < 0 ? 0 : $('#def').val());
            $('.card-atk-rush').html($('#atk').val() < 0 ? 0 : $('#atk').val());
            $('.card-def-rush').html($('#def').val() < 0 ? 0 : $('#def').val());
            if ($('#maximum').is(':checked')){
                $('.card-max-atk').html($('#maximum-atk').val() < 0 ? 0 : $('#maximum-atk').val());
                $('.card-max-atk-rush').html($('#maximum-atk').val() < 0 ? 0 : $('#maximum-atk').val());
            }
        }
        //Enable Maximum ATK input
        if (cardTypeSelected != "Spell" && cardTypeSelected != "Trap" && $('#maximum').is(":checked")){
            $('#maximum-atk').removeAttr('disabled');
            $('.maximum-only').show();
        } else{
            $('#maximum-atk').attr('disabled', 'disabled');
            $('.maximum-only').hide();
        }
        //Change rarities
        let rarity = $('#rarity option:selected').val();
        if (rarity == "common"){
            $('.card-name-1').removeClass('rarity-rush');
            $('.card-atk').removeClass('rarity-rush');
            $('.card-def').removeClass('rarity-rush');
            $('.card-max-atk').removeClass('rarity-rush');
        } else{
            if (!$('.card-name-1').hasClass('rarity-rush')){
                $('.card-name-1').addClass('rarity-rush');
            }
            if (!$('.card-atk').hasClass('rarity-rush')){
                $('.card-atk').addClass('rarity-rush');
            }
            if (!$('.card-def').hasClass('rarity-rush')){
                $('.card-def').addClass('rarity-rush');
            }
            if (!$('.card-max-atk').hasClass('rarity-rush')){
                $('.card-max-atk').addClass('rarity-rush');
            }
        }

        //Change card creator
        $('.card-creator').html($('#creator').val());

        //Change card set number
        $('.card-set-number').html($('#set-number').val());

        if (cardTypeSelected == 'Spell' || cardTypeSelected == 'Trap'){
            if ($('#st-type option:selected').val() != 'Normal') {
                if (cardTypeSelected == 'Spell'){
                    $('.card-type-1').addClass('p40');
                } else{
                    $('.card-type-1').addClass('p50');
                }
                $('.card-st-type').show();
                $('.card-st-type').attr('src', 'view/img/type/' + $('#st-type option:selected').val() + '.png');
            } else{
                $('.card-st-type').hide();
                $('.card-type-1').removeClass('p40');
                $('.card-type-1').removeClass('p50');
            }
        } else{
            $('.card-st-type').hide();
            $('.card-type-1').removeClass('p40');
            $('.card-type-1').removeClass('p50');
        }
        if (cardTypeSelected == 'Normal'){
            $('.lore').css('font-family', 'CardLore');
        } else{
            $('.lore').css('font-family', 'CardEffect');
        }
    });
    //Change card image
    $('#image-url').change(function(){
        $(".card-image").attr("src", $("#image-url").val());
    });
    $('.trumbowyg-editor').keyup(function(){
        //Change card text
        $('.lore').html($('.trumbowyg-editor').html());
        resizeToFit($('.lore'), $('.card-lore'));
    });
    $('.trumbowyg-editor').focusout(function(){
        //Change card text
        $('.lore').html($('.trumbowyg-editor').html());
        resizeToFit($('.lore'), $('.card-lore'));
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
    	  "url": "https://api.imgbb.com/1/upload?key=e44acc4c48ba88413eda3a867905113c",
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
    $('#save').click(function(){
        let div = $('#display-card')[0];
        html2canvas(div, {allowTaint:true, useCORS:true}).then(
        function (canvas) {
            $('#canvas').html(canvas);
            saveAs(canvas.toDataURL(), $('#set-number').val() + '.png');
        })
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
