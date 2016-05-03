jQuery(document).ready(function(){
	/* general */
	jQuery('#general-form').validate({
		rules:{
			name:{required:true},
			tax_id:{required:true},
			tax_no:{required:true},
			phone:{required:true},
			email:{email:true},
			address:{required:true},
			city:{required:true},
			province:{required:true},
			country:{required:true},
			poscode:{required:true},
		},
		submitHandler: function(form){
			jQuery('#save-button').button('loading');
			jQuery.post( base_url + 'config/save', jQuery("#general-form").serialize(), function(data){
				if(data == 'done'){
					bootbox.alert('Data saved successfully.')
				}else{
					bootbox.alert('Save failed, please try again leter.')
				}
				jQuery('#save-button').button('reset');
			})
		}
		
	});
});