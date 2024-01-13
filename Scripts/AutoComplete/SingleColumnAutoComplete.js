// Lead AutoComplete Jquery
//For Single Column display for Autocomplete Textbox Feature.(Ex: Leadmanager or Companyname)
//function AutoCompleteTextBoxlead(dataObj, urlObj, txtObj, columns) {
function AutoCompleteTextBoxSingleColumnDisplay(dataObj, urlObj, txtObj, columns, SetValuesForCallBackFunction) {
    $(txtObj).autocomplete({
        showHeader: true,
        async: true,
        columns: columns,

        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: urlObj,
                cache: false,
                async: true,
                data: '{' + dataObj + ', txtdata:"' + request.term + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var sdata = JSON.parse(data.d);
                    if (sdata != '') {
                        var JSONObject = JSON.parse(data.d);
                        var arrlist = [];
                        jQuery.each(JSONObject, function (i, val) {
                            var arr = Object.keys(val).map(function (k) { return val[k] });
                            arrlist.push(arr);
                        });
                        response(JSONObject);
                    } else {
                        response([{ label: 'No results found.' }]);
                    }
                },
                error: function (xhr, errorType, exception) {
                    console.log(xhr);
                    console.log("************************************");
                    console.log(errorType);
                    console.log("************************************");
                    console.log(xhr.message);
                    console.log(exception);
                },
                failure: function (response) {
                    alert(response.d);
                }
            });
        },
        autoFocus: true,
        minLength: 1,
        focus: function (event, ui) {
            return false;
        },
        select: function (event, ui) {
            SetValuesForCallBackFunction(ui.item, this.value); //Return values to page            
            console.log(this.value);
            return false;
        },
        change: function (event, ui) {
            SetValuesForCallBackFunction(ui.item, this.value); //Return values to page            
            return false;
        }
    })
    .autocomplete("widget").addClass("autocomplete_SingleColumnDisplay");
}