/* generate selectbox */
function generateSelectbox(data,target,defaultValue,setValue){
	
	var defaultText	= (!defaultValue) ? 'Select' :defaultValue ;
	var html	= "";
	if(defaultValue){
		html		+= "<option value=''>"+defaultText+"</option>";
	}
	jQuery.each(data, function(key, value){
		if(setValue != ""){
			if(setValue == value.id){
				var set	= 'selected="selected"';	
			}else{
				var set = '';
			}
		}
		html += "<option value='"+value.id+"' "+set+" class="+target+">"+value.text+"</option>";
	});
	//jQuery('#'+target).empty().append(html);
	jQuery('#'+target).html(html);
}

function generateDashboardDatagrid(data){
	var html = "";
	if(data){
		jQuery.each(data, function(key, value){
			html += "<tr>";
			if(value.employee_name){
				html += "<td><a href='"+site_url+"employee/view/"+value.employee_id+"'>"+value.employee_name+"</a></td>";
			}
			if(value.job_name){
				html += "<td>"+value.job_name+"</td>";
			}
			if(value.date){
				html += "<td width='20%' align='center'>"+value.date+"</td>";
			}
			if(value.status){
				html += "<td width='20%' align='center'>"+value.status+"</td>";
			}
			html += "</tr>";
		});
	}
	return html;
}

function errorBootbox(msg, url, callback){
	bootbox.dialog({
		className : 'errormodal',
        title: "<i class='fa fa-exclamation-triangle'></i> Error / Crash Report.",
        message: '<strong>Error!</strong> '+msg+'.',
        buttons: {
            close: {
                label: "Close",
                className: "btn-success btn-flat",
                callback: function() {
                	 callback('close');
                }
            },
            report: {
                label: "<i class='fa fa-bug'></i> Bugs Report ",
                className: "btn-default btn-flat pull-left",
                callback: function(xcall) {
                	//sendBugsReport(msg,url);
                	callback('report');
                }
            }
        }
   	});  	
}

function successBootbox(msg, callback){
	bootbox.dialog({
		className : 'successmodal',
        title: "<i class='fa fa-check-circle'></i> Success.",
        message: '<strong>Success..</strong> '+msg+'.',
        buttons: {
            close: {
                label: "Close",
                className: "btn-success btn-flat",
                callback: function() {
                	if (callback && typeof(callback) === "function") {
                		callback('close');
                	}
                	 //callback('close');
                }
            }
        }
   	});  	
}





function openViewer(url){
	jQuery('#document_viewer').attr('src','http://docs.google.com/viewer?url='+url+'&embedded=true');
	jQuery('#document_viewer_modal').modal({
    	keyboard: false,
    	show:true,
    	backdrop:"static"
   	});
}

function dataFormatResult(movie) {
    var markup = "<table class='movie-result'><tr>";
    if (movie.photo !== undefined) {
        markup += "<td class='movie-image'><img src='" + movie.photo+ "' style='max-width:100px; max-height:100px;'/></td>";
    }
    markup += "<td class='movie-info'><div class='movie-title'>" + movie.name + "</div>";
    if (movie.detail !== undefined) {
        markup += "<div class='movie-synopsis'>" + movie.detail + "</div>";
    }
    else if (movie.id !== undefined) {
        markup += "<div class='movie-synopsis'>" + movie.id + "</div>";
    }
    markup += "</td></tr></table>";
    return markup;
}

function dataFormatSelection(movie) {
    return movie.name;
}

function getUri(basepath,num){
	var x = document.URL;
	var y = x.replace(basepath,"");
	num -= 1;
	var segment	= y.split('/');
	if (segment[num] != undefined) {
		 return segment[num].replace(/\#/g,"");
	}
	return '';
}

/* send bugs report */
function sendBugsReport(message, url){
	jQuery.post( site_url + 'bugs/report',{message:message, url:url});
}

/* function clear form */
function clearForm(){
	jQuery('.empty').val('');
	jQuery('.null').val('0');
	jQuery('.unsetdisabled').removeAttr('disabled');
	jQuery('.setdisabled').attr('disabled','disabled');
	jQuery('.unchecked').removeAttr('checked');
	jQuery('.icheckbox_minimal').removeClass('checked');
}

/* currency format */
function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
	num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	cents = num%100;
	num = Math.floor(num/100).toString();
	if(cents<10)
	cents = "0" + cents;
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	num = num.substring(0,num.length-(4*i+3))+'.'+
	num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + '' + num);
}

/* check search textbox */
function checkKey(){
	var key	= jQuery('#key').val();
	if(key.length == 0){
		act_search();
	}
}

function disable_AllField(){
	jQuery('.form-control').attr('disabled',true);
	jQuery('#edit').removeClass('hidden');
	jQuery('#cancel, #update').addClass('hidden');
}

function enable_AllField(){
	jQuery('.form-control').attr('disabled',false);
	if(jQuery('.input-group.date input').val() == '00/00/0000')
	{
		jQuery('.input-group.date input').val('');
	}
	
	jQuery('input').each(function(){
		if(jQuery(this).val() == "-")
		{
			jQuery(this).val('');
		}
	});
	
	jQuery('#edit').addClass('hidden');
	jQuery('#cancel, #update').removeClass('hidden');
}

/* get current date */
function getCurrentDate(addDays){
	var today = new Date();
	
	//var today = (setToday != undefined ) ? new Date(setToday) : 
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    dd = parseInt(dd) + parseInt(addDays);
    return today = dd+'/'+mm+'/'+yyyy;
}


function convertDateFromID(date, addDays){
	// dd/mm/yyyy
	//alert(date);
	
	var x		= (addDays == undefined) ? 0 : addDays;
	var mydate	= date.split('/');
	var today	= new Date(mydate[2],mydate[1],parseInt(mydate[0]) + parseInt(x) );
	var dd 		= today.getDate();
    var mm 		= today.getMonth(); //January is 0!
    var yyyy 	= today.getFullYear();
	
	return mm+'/'+dd+'/'+yyyy;
}

function getLastDate(date, addDays){
	var x		= (addDays == undefined) ? 0 : addDays;
	var mydate	= date.split('/');
	var today	= new Date(mydate[2],mydate[1],parseInt(mydate[0]) + parseInt(x) );
	var dd 		= today.getDate();
    var mm 		= today.getMonth(); //January is 0!
    var yyyy 	= today.getFullYear();
	
	return dd+'/'+mm+'/'+yyyy;
}
/* custom alert */
var myAlert = (function() {
    "use strict";

    var elem;
    var hideHandler;
    var that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(4000).fadeOut();
    };

    return that;
}());

var Example = (function() {
    "use strict";

    var elem,
        hideHandler,
        that = {};

    that.init = function(options) {
        elem = $(options.selector);
    };

    that.show = function(text) {
        clearTimeout(hideHandler);

        elem.find("span").html(text);
        elem.delay(200).fadeIn().delay(4000).fadeOut();
    };

    return that;
}());