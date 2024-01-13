// Common AutoComplete Jquery

$.ui.autocomplete.prototype._renderMenu = function (ul, items) {
    var self = this, thead;

    if (this.options.showHeader) {
        table = $('<div class="ui-widget-header" style="width:100%"></div>');
        // Column headers
        $.each(this.options.columns, function (index, item) {
            table.append('<span style="float:left;width:' + item.minWidth + ';">' + item.name + '</span>');
        });
        table.append('<div style="clear: both;"></div>');
        ul.append(table);
    }
    // List items
    $.each(items, function (index, item) {
        self._renderItem(ul, item);
    });
};


//$.ui.autocomplete.prototype._create = function () {
//    this._super();
//    this.widget().menu("option", "items", "> :not(.ui-widget-header)");

//};

$.ui.autocomplete.prototype._renderItem = function (ul, item) {
    var t = '',
          result = '';
    $.each(this.options.columns, function (index, column) {

        var itemValue = item[column.valueField ? column.valueField : index];

        if (itemValue == '' || itemValue == null || itemValue == 'null' || itemValue == 'undefinided')
            itemValue = "&nbsp;";
        t += '<span style="float:left;width:' + column.minWidth + '; display:block; word-wrap:break-word;">' + itemValue + '</span>'
    });

    if (item.label == 'No results found.') {
        var itemValue1 = 'No results found.';
        //t = '<span style="float:left;width:200px; display:block; word-wrap:break-word; text-align:center;">' + itemValue1 + '</span>'
        t = '<span style="width:150px;  margin: 0 auto; display:block">' + itemValue1 + '</span>'
    }

    result = $('<li></li>')
          .data('ui-autocomplete-item', item)
          .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
          .appendTo(ul);
    return result;


};

function AutoCompleteTextBox(dataObj, urlObj, txtObj, columns) {
    $(txtObj).autocomplete({
        showHeader: true,
        async: true,
        columns: columns,
        source: function (request, response) {
            $.ajax({
                type: "POST",
                url: urlObj, //"InspectionInfo.aspx/GetEmployeesList",
                cache: false,
                async: true,
                data: '{' + dataObj + ', txtdata:"' + request.term + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    /*
                   console.log(data.d);
                   var JSONObject = JSON.parse(data.d);
                   console.log(JSONObject);

                   var arrlist = [];
                   jQuery.each(JSONObject, function (i, val) {
                     var arr = Object.keys(val).map(function (k) { return val[k] });
                     arrlist.push(arr);
                   });

                   console.log("****************************");
                   console.log(arrlist);
                   //   return JSONObject;
                   response(JSONObject);
                 */

                    var sdata = JSON.parse(data.d);
                    //  if (sdata.length > 0) {
                    if (sdata != '') {
                        console.log(data.d);
                        var JSONObject = JSON.parse(data.d);
                        console.log(JSONObject);

                        var arrlist = [];
                        jQuery.each(JSONObject, function (i, val) {
                            var arr = Object.keys(val).map(function (k) { return val[k] });
                            arrlist.push(arr);
                        });

                        console.log("****************************");
                        console.log(arrlist);
                        //   return JSONObject;
                        response(JSONObject);
                    } else {
                        //  response([{ label: 'No results found.', val: -1 }]);
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
            autocompletecallback(ui.item, this.value); //Return values to page
            console.log(this.value);
            return false;
        },
        change: function (event, ui) {
            autocompletecallback(ui.item, this.value); //Return values to page
            return false;
        }
    });
}