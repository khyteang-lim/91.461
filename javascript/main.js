var firstTable = true;
/*This is based of the following source but the code was modified to fit with the problem
http://stackoverflow.com/questions/26004342/javascript-multiplication-table*/
$(document).ready(function() {
    $.validator.addMethod('greaterThan', function(value, element, param) {
        return this.optional(element) || (parseInt(value) < param);
    }, jQuery.validator.format("Please input an integer less than 1000"));
    $.validator.addMethod("lessThan", function(value, element, param) {
        return this.optional(element) || parseInt(value) > param;
    }, jQuery.validator.format("Please input an integer greater than -1000"));
    var tabs = $("#tabs").tabs();
    var sliderMinTop = $("#sliderMinTop").slider({
        min: -99,
        max: 99,
        value: 1,
        change: function() {
            document.getElementById('numberOne').value = $('#sliderMinTop').slider("value");
        }
    });
    var slideMaxTop = $("#sliderMaxTop").slider({
        min: -99,
        max: 99,
        value: 10,
        change: function() {
            document.getElementById('numberTwo').value = $('#sliderMaxTop').slider("value");
        }
    });
    var sliderMinLeft = $("#sliderMinLeft").slider({
        min: -99,
        max: 99,
        value: 1,
        change: function() {
            document.getElementById('numberThree').value = $('#sliderMinLeft').slider("value");
        }
    });
    var sliderMaxLeft = $("#sliderMaxLeft").slider({
        min: -99,
        max: 99,
        value: 10,
        change: function() {
            document.getElementById('numberFour').value = $('#sliderMaxLeft').slider("value");
        }
    });
    genTable();
    if (firstTable) {
        $('#tabs').tabs({
            active: 0
        });
        firstTable = false;
    }
    $('#userInput').validate({
        //error rules
        rules: {
            numberOne: {
                required: true,
                digits: true,
                greaterThan: 100,
                lessThan: -100
            },
            numberTwo: {
                required: true,
                digits: true,
                greaterThan: 100,
                lessThan: -100
            },
            numberThree: {
                required: true,
                digits: true,
                greaterThan: 100,
                lessThan: -100
            },
            numberFour: {
                required: true,
                digits: true,
                greaterThan: 100,
                lessThan: -100
            }
        },
        //error messages for when there are errors
        messages: {
            numberOne: {
                required: " Please input a value for Top Min",
                digits: " Please input an integer"
            },
            numberTwo: {
                required: " Please input a value for Top Max",
                digits: " Please input an integer"
            },
            numberThree: {
                required: " Please input a value for Left Min",
                digits: " Please input an integer"
            },
            numberFour: {
                required: " Please input a value for Left Max",
                digits: " Please input an integer"
            }
        }
    });
    $('form').on('submit', function(e) {
        e.preventDefault();
        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });
        var cue = $('#userInput').validate({
            //error rules
            rules: {
                numberOne: {
                    required: true,
                    digits: true
                },
                numberTwo: {
                    required: true,
                    digits: true
                },
                numberThree: {
                    required: true,
                    digits: true
                },
                numberFour: {
                    required: true,
                    digits: true
                }
            },
            //error messages for when there are errors
            messages: {
                numberOne: {
                    required: " Please input a value for Top Min",
                    digits: " Please input an integer for Top Min",
                    greater: " Please input an integer less than 99999"
                },
                numberTwo: {
                    required: " Please input a value for Top Max",
                    digits: " Please input an integer for Top Max"
                },
                numberThree: {
                    required: " Please input a value for Left Min",
                    digits: " Please input an integer for Left Min"
                },
                numberFour: {
                    required: " Please input a value for Left Max",
                    digits: " Please input an integer for Left Max"
                }
            }
        });
        cue = cue.currentForm;
        /*This code will check to see if an error exist, if so,
focus on where the error is located to the user.
Update the status                                     */
        if (cue[0].className != 'error' && cue[1].className != 'error' && cue[2].className != 'error' && cue[3].className != 'error') {
            genTable();
        } else {
            if (cue[0].className == 'error') {
                document.getElementById("numberOne").focus();
            }
            if (cue[1].className == 'error') {
                document.getElementById("numberTwo").focus();
            }
            if (cue[2].className == 'error') {
                document.getElementById("numberThree").focus();
            }
            if (cue[3].className == 'error') {
                document.getElementById("numberFour").focus();
            }
            $("#status").html("Invalid Input(s)");
        }
    });

	tabs.delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      $("#ch-" + panelId.replace(/\D/g, '')).remove();
      $("#lb-" + panelId.replace(/\D/g, '')).remove();
            
      console.log(panelId);
      tabs.tabs( "refresh" );
    });

    $('#delete').click(function () {
        /* Store id of checked checkbox to an array then loop through.
           If check box is checked, delete checkbox, label, table and tab.
            /* This code will delete the first tab and tabs
            $('#tabs > ul > li').remove();
            $('#tabs > #tab-1').remove();
            $("input[type='checkbox']:checked").remove();
            $("label").remove();
            ***********************************************/
        var selected = [];
        $('input:checkbox:checked').each(function () {
            selected.push($(this).attr('id'));
        });
        /* Set active tab to unchecked checkbox.
        Not exactly sure why this doesn't work.
        $('#tabs').tabs("refresh");
        $("#tabs").tabs("option", "active", $('input:checkbox').attr('checked',false).val());
        ***********************************************************************************/
        // Remove all checked checkbox that matched elements in array selected.
        for (var m = 0; m < selected.length; m++) {
            $("#ch-" + selected[m].replace(/\D/g, '')).remove();
            $("#lb-" + selected[m].replace(/\D/g, '')).remove();
            $('#ui-id-' + selected[m].replace(/\D/g, '')).remove();
            $("#tabs-" + selected[m].replace(/\D/g, '')).remove();
            $("li[aria-controls='tabs-" + selected[m].replace(/\D/g, '') +"']").remove();            
            $('#tabs').tabs("option", "active", $("input:checkbox:not(:checked)"));
        }
        $('#tabs').tabs("refresh");
    });

    $("#deleteAll").click( function() {
    	$('input:checkbox').each(function(){
    		$("#ch-" + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $("#lb-" + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $('#ui-id-' + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $("#tabs-" + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $("li[aria-controls='tabs-" + ($(this).attr('id')).replace(/\D/g, '') +"']").remove();            
            $('#tabs').tabs("option", "active", $("input:checkbox:not(:checked)"));
    	});
    });

});
/*This function is based of the following source but the function was modified to fit with the problem
http://stackoverflow.com/questions/26004342/javascript-multiplication-table*/
function genTable() {
    var topMin = parseInt($('input[name=numberOne]').val());
    var topMax = parseInt($('input[name=numberTwo]').val());
    var leftMin = parseInt($('input[name=numberThree]').val());
    var leftMax = parseInt($('input[name=numberFour]').val());
    var col;
    var Switch = 0;
    /*check to see that topMin and topMax are in correct order*/
    if (topMax < topMin) {
        var temp = topMin;
        topMin = topMax;
        topMax = temp;
        Switch = 1;
        document.getElementById('numberOne').value = topMin;
        document.getElementById('numberTwo').value = topMax;
    }
    /*check to see that leftMin and leftMax are in correct order*/
    if (leftMax < leftMin) {
        var temp = leftMin;
        leftMin = leftMax;
        leftMax = temp;
        document.getElementById('numberThree').value = leftMin;
        document.getElementById('numberFour').value = leftMax;
        if (Switch == 1) {
            Switch = 3;
        } else {
            Switch = 2;
        }
    }
    /*check to see that topMin, topMax, leftMin, and leftMax have type 'number'*/
    if (typeof topMin === 'number' && typeof topMax === 'number' && typeof leftMin === 'number' && typeof leftMax === 'number') {
        var num_tabs = $("div#tabs ul li").length + 1;
        $("div#tabs ul").append(
            "<li><a href='#tabs-" + num_tabs + "'>" + "Top [" + topMin + " : " + topMax + "] | Left [" + leftMin + " : " + leftMax + "]" + "</a><span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
        );
        $("div#tabs").append("<div id= tabs-" + num_tabs + "><div id='table-" + num_tabs + "'></div>");
        //$("div#tabs #tabs-" + num_tabs).append("<div id='table-" + num_tabs + "'></div>");
        var table = "<table-" + num_tabs + ">";
        table = '<tr>' + '<td class="topHeading">x</td>';
        /*place top row*/
        for (var x = topMin; x <= topMax; x++) {
            table += '<td class="topHeading">' + x + '</td>';
        }
        col = leftMin;
        /*start inserting table*/
        for (var i = leftMin; i <= leftMax; i++) {
            table += '<tr>';
            /*insert left column*/
            table += '<td class="leftHeading">' + col + '</td>';
            for (var j = topMin; j <= topMax; j++) {
                if (i == j) {
                    table += '<td class="blue">' + i * j + '</td>';
                } else {
                    table += '<td>' + i * j + '</td>';
                }
            }
            table += '</tr>';
            col++;
        }
        table += '</table>';
        $('#table-' + num_tabs).html(table);
        $("div#tabs").tabs("refresh");
        if (Switch == 1) {
            $("#status").html("Top Min value and Top Max value Switched");
            Switch = 0;
        } else if (Switch == 2) {
            $("#status").html("Left Min value and Left Max value Switched");
            Switch = 0;
        } else if (Switch == 3) {
            $("#status").html("Top Min value and Top Max value Switched | Left Min value and Left Max value Switched");
            Switch = 0;
        } else {
            $("#status").html("Valid Inputs");
        }
        $("#sliderMinTop").slider({
            value: topMin
        });
        $("#sliderMaxTop").slider({
            value: topMax
        });
        $("#sliderMinLeft").slider({
            value: leftMin
        });
        $("#sliderMaxLeft").slider({
            value: leftMax
        });
        $('#tabs').tabs({
            active: num_tabs - 1
        });
        $('#tabs-' + num_tabs).css("overflow", "auto");
        createCheckBox(num_tabs, topMin, topMax, leftMin, leftMax);
    }
}

function createCheckBox(index_tabs, topMin, topMax, leftMin, leftMax) {
        var div = document.createElement("div");
        var checkbox = document.createElement("input");
        // Set multiples key value pair for setAttribute.
        //checkbox.setAttribute("type", "checkbox");
        //checkbox.setAttribute("name", "ch-" + index_tabs);
        //checkbox.setAttribute("id", "ch-" + index_tabs);
		        
        checkbox.type = "checkbox";
        checkbox.name = "ch-" + index_tabs;
        checkbox.id = "ch-" + index_tabs;
        var label = document.createElement("label");
        // label.setAttribute("for", "tab-" + index_tabs);
        label.htmlFor = "ch-" + index_tabs;
        label.id = "lb-" + index_tabs;
        label.appendChild(document.createTextNode("Top [" + topMin + " : " + topMax + "] | Left [" + leftMin + " : " + leftMax + "]"));
        // Append checkbox to checkbox div.
   		div.appendChild(checkbox);
   		div.appendChild(label);
        document.getElementById('check').appendChild(div);
        //document.getElementById('check').appendChild(label);
}

