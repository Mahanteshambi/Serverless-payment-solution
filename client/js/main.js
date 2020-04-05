function payAmount(event) {
	console.log("Sending data");
	event.preventDefault();
	var URL = "https://h2p3y51wm5.execute-api.ap-south-1.amazonaws.com/prod/pay";
	var amount = $("#quantity").val();
	var reason = $("#reason").val();
	var payee = getName()
	var payer = "Sony"
	var data = {
          payee_id : payee,
          payer_id : payer,
          amount : amount,
		  reason : reason
        };
	console.log(data);
    $.ajax({
         type: "PUT",
		 async: false,
         url : URL,
		 dataType: "json",
		 contentType: "application/json",
		 crossDomain: "true",
         data: JSON.stringify(data),

         
         success: function (data, textStatus, xhr) {
           // clear form and show a success message
           //toastmsg("Thanks for participating!  <br/> Please visit @3.30pm for lucky draw!");
		   alert("Transfered!");
		   console.log(textStatus);
         },
		 
         error: function (xhr, ajaxOptions, thrownError) {
           // show an error message
		   console.log("Errors: ")
		   console.log(thrownError)
		   console.log(ajaxOptions)
		   console.log(xhr)
		   alert("Website is unhealthy! Call developer")
         }
		 });
}

function updatePage(){
	var username = getName()	
	var userEle = document.getElementById("user");
	userEle.innerHTML = username;
}

function getName() {
	var user = getUrlParams("user", 1)
	if(user == 1) {
		user = "Mahantesh"
	} else if(user == 2) {
		user = "Shilpa"
	} else if(user == 3) {
		user = "Sneha"
	} else if(user == 4) {
		user = "Adarsh"
	} else {
		user = "Idiot"
	}
	return user;
}

function getUrlParams(param, defaultValue) {
	var urlparam = defaultValue
	if(window.location.href.indexOf(param) > -1) {
		urlparam = getUrlVars()[param]
	}
	return urlparam
}

function getUrlVars() {
	var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);