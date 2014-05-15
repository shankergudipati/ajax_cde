		function display_products_by_tag(key,tagname){
			if(tagname == "Import"){				
				$("#product_filter").load("template.html");				
			}
			else{
				var service_id = key;
				$.ajax({
					//url: 'http://10.233.52.111:8008/servicebytag/'+key+'/'+tagname+'/',
					url : window.service_by_key_tag_url+key+'/'+tagname+'/',
					contentType: "application/json",
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "product_by_tag",
					success: function (data){
						var products="<ul id='product_details' class='bxslider'>"
						$.each(data,function(key,value){
							 //console.log(key);
							//console.log(value);
							products+='<li style=height:150px;width:200px;><div title='+value+'><div class=head><img src=images/logos/'+key+'.png></div><button id=details_button name=details-button-popup class=btn data-toggle=modal style=\'position: relative;margin-left:30px;margin-left:15%\' href=\'#popup-modal\' onclick=\'details_popup("'+service_id+'","'+value+'","'+key+'");\'>Provision</button></div></li>';	 
							//inner_html+= '<li><div title='+product_info[i-4]+'><div class=head><img src=images/'+product_info[i+1]+'.png /></div><div class=content ></div><button id=button123 name=details-button-popup class=btn data-toggle=modal onclick=\'details_popup("'+product_info[i-4]+'","'+product_info[i+1]+'","'+product_info[i-3]+'","'+product_info[i-3]+'","'+product_info[i-2]+'","'+product_info[i-1]+'","'+product_info[i+2]+'");\' >Details</button></div></li>';
						});
						$("#product_filter").html(products+"</ul>");
					}
				});

			   //alert("here is the sample function  "+key+"  "+tagname );
			}
		}



		function changetab_next(){
			var e = document.getElementById("installation_mode");
			var strUser = e.options[e.selectedIndex].value;
			//alert(strUser);
			if(strUser=="awsvm"){
				document.getElementsById("selectednext").setAttribute("href","#cloud_a");
			}
		}




		function submit_details(){
			var available_ipaddress,available_username,available_password,aws_accessid,aws_secretkey,aws_keypair,openstack_username,openstack_password;
			//alert("In submit details function");
			var service_id = $( "#os_form_serviceid" ).val();
			var product_id = $("#os_form_productid").val();
			var product_name = $("#os_form_productname").val();
			var os = $("#os_form_os").val();
			var service_tag = $("#os_form_service_tag").val();
			var version = $("#os_form_version").val();
			var architecture = $("#os_form_architecture").val();

			var e = document.getElementById("installation_mode");
			var strUser = e.options[e.selectedIndex].value;
			var openstack_auth_url="10.233.52.162";

			if(strUser=="existingvm")
			{
			
				available_ipaddress = document.getElementById('available_ipaddress').value;
				available_username = document.getElementById('available_username').value;
				available_password= document.getElementById('available_password').value;
				console.log("here are available details:");
				console.log(available_ipaddress+"  name:" +available_username + " pwd:"+available_password );
				
				validate_machine_details(available_ipaddress,os,architecture,available_username,available_password);
			}

			else if(strUser=="awsvm"){
				aws_accessid= document.getElementById('aws_accessid').value;
				aws_secretkey = document.getElementById('aws_secretkey').value;
				aws_keypair = document.getElementById('aws_keypair').value;
				console.log("here are AWS details:");
				console.log(aws_accessid+"  "+aws_secretkey+"  "+aws_keypair);
			}

			else if(strUser=="openstack"){
				openstack_username = document.getElementById('openstack_username').value;
				openstack_password= document.getElementById('openstack_password').value;
				console.log("here are openstack details:");
				console.log(openstack_username+"  "+openstack_password+"  "+openstack_auth_url);
				authenticate_openstack_credentials(openstack_username,openstack_password,openstack_auth_url);
			}

		}
