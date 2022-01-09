$(document).ready(function(){
    $('#upload-file').change(function(){
        $('#file-input').val(this.files[0].name);
    });

    $('#batch-create-btn').click(function(){
        $('#progress-text').show();
        $('#progress-text').html('Getting ready...');
        $('.progress').show();
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        readFileToJSON().then(function(data){
            (function loop(i) {
                if (i >= data.numberOfCards) {
                    $('#progress-bar').css('width', '0%');
                    $('.progress').hide();
                    $('#progress-text').hide();
                    return;
                }
                $('#progress-text').html('Processing ' + data.cards[i].Name);
                $('#progress-bar').css('width', ((i + 1) * 100) / data.numberOfCards + "%");
                delay(1000).then(() => {
                    $('#set-number').val(data.cards[i]["Set No."]);
                    $('#ctype option:selected').val(data.cards[i]["Card type"]);
                    $('#card-name').val(data.cards[i].Name);
                    $('#legend')[0].checked = data.cards[i].Legend;
                    $('#st-type option:selected').val(data.cards[i]["S/T type"]);
                    $('#monster-type').val(data.cards[i]["Monster type"]);
                    $('#monster-attribute option:selected').val(data.cards[i]["Attribute"]);
                    $('#level').val(data.cards[i].Level);
                    $('#atk').val(data.cards[i].ATK);
                    $('#def').val(data.cards[i].DEF);
                    $('#maximum').prop('checked', data.cards[i].Maximum);
                    $('#maximum-atk').val(data.cards[i]["Maximum ATK"]);
                    $('#rarity option:selected').val(data.cards[i].Rarity)
                    $('#image-url').val(data.cards[i]["Image URL"]);
                    $('#creator').val(data.cards[i].Creator);
                    $('.trumbowyg-editor').html(data.cards[i]["Card text"]);
                    $('.trumbowyg-editor').keyup();
                    $('#card-name').change();
                    $('#st-type').change();
                    $('#image-url').change();
                    $('#legend').change();
                    saveCard(data.cards[i]["Set No."]);
                    loop(i+1);
                });
            })(0);
        });
    });

    async function readFileToJSON(){
        jsonObj = [];
        var files = $('#upload-file')[0].files, f = files[0];
        const data = await f.arrayBuffer();
        const workbook = XLSX.read(data);
        var first_sheet_name = workbook.SheetNames[0];
        var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
        var row = 2;
        var address_of_cell;
        var worksheet = workbook.Sheets[first_sheet_name];
        var desired_cell;
        let n = 0;
        while (worksheet['A' + (n + 2)] != undefined && worksheet['A' + (n + 1)].v != ''){
            n++;
        }
        jsonObj["numberOfCards"] = n;
        var array = [];
        while (worksheet['A' + row] != undefined){
            item = {};
            for (let i = 0; i < 16; i++){
                address_of_cell = columns[i] + row;
                desired_cell = worksheet[address_of_cell];
                desired_value = desired_cell.v;
                var columnName = worksheet[columns[i] + '1'].v;
                item[columnName] = desired_value;
            }
            array.push(item);
            row++;
        }
        jsonObj["cards"] = array;
        return jsonObj;
    }

    function saveCard(name){
        let div = $('#display-card')[0];
        $('#display-card').ready(function(){
            html2canvas(div, {allowTaint:true, useCORS:true}).then(
            function (canvas) {
                $('#canvas').html(canvas);
                saveAs(canvas.toDataURL(), name + '.png');
            })
        });
    }

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