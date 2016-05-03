jQuery(document).ready(function(){
	
	/* login */
	jQuery('#login-form').validate({
		rules:{
			username:{required:true},
			password:{required:true}
		},
		submitHandler: function(form){
			jQuery('#login-submit').button('loading');
			jQuery.post( base_url + 'do_login', jQuery("#login-form").serialize(), function(data){
				if(data.status == 200){
                    window.location = base_url;
				}else{
                    alert(data.status+' '+data.msg);
                }
				jQuery('#login-submit').button('reset');
			},"json")
		}
		
	});
});