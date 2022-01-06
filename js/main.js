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
    maximumOnly.hide();
    stOnly.hide();
    effOnly.hide();
    $('.input').change(function(){
        let cardName = $('#card-name').val();
        //Change the card name
        if (cardName != ""){
            $('.card-name').html(cardName);
        }
        //Show monster card or spell/trap card info input depending on player selection
        let cardTypeSelected = $('#ctype option:selected').val();
        if (cardTypeSelected == "normal" || cardTypeSelected == "effect" || cardTypeSelected == "fusion"){
            stOnly.hide();
            monsterOnly.show();
        } else{
            stOnly.show();
            monsterOnly.hide();
        }
        //Change the card frame
        $('.card-frame').attr('src', 'view/img/frame/' + cardTypeSelected + '.png');
        //Change the attribute
        if (cardTypeSelected == "spell"){
            cardAttribute.attr('src', 'view/img/attribute/SPELL.png');
        } else if (cardTypeSelected == "trap"){
            cardAttribute.attr('src', 'view/img/attribute/TRAP.png');
        } else{
            cardAttribute.attr('src', 'view/img/attribute/' + $('#monster-attribute option:selected').val() + '.png');
        }
        //Change the monster type
        let monsterType = $('#monster-type').val();
        if (cardTypeSelected == "spell"){
            $('.card-type').html("Spell Card");
        } else if (cardTypeSelected == "trap"){
            $('.card-type').html("Trap Card");
        } else{
            $('.card-type').html(monsterType);
        }
        if (cardTypeSelected == "normal"){
            $('.normal-monster-only').show();
            $('.effect-monster-only').hide();
        } else{
            $('.normal-monster-only').hide();
            $('.effect-monster-only').show();
        }
        //Change the monster level
        $('.card-level').attr('src', 'view/img/stat/Level-' + $('#level').val() + '.png');
        //Change the atk/def
        if (cardTypeSelected != "spell" && cardTypeSelected != "trap"){
            $('.card-atk').html($('#atk').val());
            $('.card-def').html($('#def').val());
            $('.card-atk-rush').html($('#atk').val());
            $('.card-def-rush').html($('#def').val());
        }
        //Enable Maximum ATK input
        if (cardTypeSelected != "spell" && cardTypeSelected != "trap" && $('#maximum').is(":checked")){
            $('#maximum-atk').removeAttr('disabled');
            $('.maximum-only').show();
        } else{
            $('#maximum-atk').attr('disabled', 'disabled');
            $('.maximum-only').hide();
        }
        //Change monster stats
        if (cardTypeSelected != "spell" && cardTypeSelected != "trap"){
            $('.card-atk').html($('#atk').val());
            $('.card-def').html($('#def').val());
            if ($('#maximum').is(':checked')){
                $('.card-max-atk').html($('#maximum-atk').val());
                $('.card-max-atk-rush').html($('#maximum-atk').val());
            }
        }
        //Change rarities
        let rarity = $('#rarity option:selected').val();
        if (rarity == "common"){
            $('.card-name').removeClass('rarity-rush');
            $('.card-atk').removeClass('rarity-rush');
            $('.card-def').removeClass('rarity-rush');
        } else{
            if (!$('.card-name').hasClass('rarity-rush')){
                $('.card-name').addClass('rarity-rush');
            }
            if (!$('.card-atk').hasClass('rarity-rush')){
                $('.card-atk').addClass('rarity-rush');
            }
            if (!$('.card-def').hasClass('rarity-rush')){
                $('.card-def').addClass('rarity-rush');
            }
        }
        //Change card text
        $('.card-lore').html($('.trumbowyg-editor').html());

        //Change card creator
        $('.card-creator').html($('#creator').val());

        //Change card set number
        $('.card-set-number').html($('#set-number').val());
    });
    //Change card image
    $('#image-url').change(function(){
        $(".card-image").attr("src", $("#image-url").val());
    });
    $('.trumbowyg-editor').keyup(function(){
        //Change card text
        $('.card-lore').html($('.trumbowyg-editor').html());
    });
    $('.trumbowyg-editor').focusout(function(){
        //Change card text
        $('.card-lore').html($('.trumbowyg-editor').html());
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
            saveAs(canvas.toDataURL(), $('#set-number').val() + '-' + $('#card-name').val() + '.png');
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
});