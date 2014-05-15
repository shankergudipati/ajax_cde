var xmlHttp;
		function createCORSREquest(method,url)
		{
			var xhr = new XMLHttpRequest();
			if ("withCredentials" in xhr) {
		    	xhr.open(method, url, true);
				xhr.setRequestHeader("Content-type", "application/json");
			} 
			else if (typeof XDomainRequest != "undefined") {
		   		xhr = new XDomainRequest();
		    	xhr.open(method, url);
				xhr.setRequestHeader("Content-type", "application/json");
		  	} 
		  	else {
		    	xhr = null;
		  	}
			return xhr;
		}
		
		function validate_machine_details(available_ipaddress,os,architecture,available_username,available_password)
		{
		
			//url = "http://10.233.52.111:8008/validate";
			url = window.validate_url;
			data = "{'ip_address':'"+available_ipaddress+"','os':'"+os+"','architecture':'"+architecture+"','user_name':'"+available_username+"','user_password':'"+available_password+"'}";
			console.log(data);
			data = JSON.stringify(eval("(" + data + ")"));
			console.log(data);
			
			xmlHttp = createCORSREquest('POST',url);
			if (!xmlHttp) {
		  	//	alert("error reaised");
		  	
		  		throw new Error('CORS not supported');
			}

			else{
				//alert("inside else");
				//alert(data);
				xmlHttp.send(data);
				document.getElementById('loader_heading').innerHTML='Validating';
				document.getElementById('loader1').style.visibility='hidden';
				document.getElementById('loader').style.visibility='visible';
				document.getElementById('invalid_img').style.visibility='hidden';
			}
		
			xmlHttp.onreadystatechange=function()
			{
			//alert(xmlHttp.readyState);
			//alert(xmlHttp.status);
			
			//if (xmlHttp.readyState==4)
		  		if (xmlHttp.readyState==4 && xmlHttp.status==200)
				{
				//alert("entered");
		    		for(var i in xmlHttp){
			    	//console.log(i);
					}
					var validate_result=xmlHttp.responseText;
					//alert("xmlHttp.responseText",xmlHttp.responseText);
					console.log("generated result",validate_result);
					var expected = "[\"true\", \"true\"]";
					console.log("comparing result",expected);
				//	alert(expected);
					//alert(validate_result);
					if(validate_result === expected){
						//alert("In iF of val[0]- first validate element");
		    			document.getElementById('loader').style.visibility='hidden';
						document.getElementById('loader1').style.visibility='visible';
		    			document.getElementById('loader_heading').innerHTML='Validation Successful';
		    			install_software();
					}
					else {
						//alert("Invalid credentials.,please try again!");
						document.getElementById('loader').style.visibility='hidden';
						document.getElementById('invalid_img').style.visibility='visible';
		    			document.getElementById('loader_heading').innerHTML='Invalid Credentials';
					}
					//alert(xmlHttp.responseText);
		    	}
		  }
		}


		//
		function authenticate_openstack_credentials(openstack_username,openstack_password,openstack_auth_url)
		{
			console.log("authenticate_openstack_credentials method entered");
			//alert("authenticate_openstack_credentials method entered");
			url = window.authenticate_openstack_credentials_url;
			data = "{'openstack_username':'"+openstack_username+"','openstack_password':'"+openstack_password+"','auth_url':'"+openstack_auth_url+"'}";
			console.log(data);
			data = JSON.stringify(eval("(" + data + ")"));
			console.log(data);
			xmlHttp = createCORSREquest('POST',url);
			if (!xmlHttp) {
		  		//alert("inside if");
		  		throw new Error('CORS not supported');
			}

			else{
				//alert("inside else");
				//alert(data);
				xmlHttp.send(data);
				document.getElementById('loader_heading_os').innerHTML='Validating';
				document.getElementById('loader1_os').style.visibility='hidden';
				document.getElementById('loader_os').style.visibility='visible';
				document.getElementById('invalid_img_os').style.visibility='hidden';
			}
		
			xmlHttp.onreadystatechange=function(){
		  		if (xmlHttp.readyState==4 && xmlHttp.status==200){
		    		for(var i in xmlHttp)
					{
			    		console.log(i);
					}
					var validate_result=xmlHttp.responseText;
					//alert(validate_result);
					var expected = '"True"';
					console.log(typeof validate_result, typeof expected);
					if(validate_result === expected){
						//alert("In iF of val[0]- first validate element");
						console.log(validate_result,expected);
		    			document.getElementById('loader_os').style.visibility='hidden';
						document.getElementById('loader1_os').style.visibility='visible';
		    			document.getElementById('loader_heading_os').innerHTML='Validation Successful';
		                boot_vm_openstack(openstack_username,openstack_password,openstack_auth_url);
				
					}
					else {
					console.log(validate_result,expected);
						//alert("Invalid credentials.,please try again!");
						document.getElementById('loader_os').style.visibility='hidden';
						document.getElementById('invalid_img_os').style.visibility='visible';
		    			document.getElementById('loader_heading_os').innerHTML='Invalid Credentials';
					}
					//alert(xmlHttp.responseText);
		    	}
		  }
		}
		
		//
		
		

		function install_software()
		{
			console.log("hello inside install_software");
			//alert("inside install_software");
			url = window.request_for_installation_url;
			service_id = document.getElementById('os_form_serviceid').value;
			product_id = document.getElementById('os_form_productid').value;
			ip_address = document.getElementById('available_ipaddress').value;
			machine_username = document.getElementById('available_username').value;
			machine_password = document.getElementById('available_password').value;
			os = document.getElementById('os_form_os').value;
			//'{"username":"json2","service_id":1,"product_id":20,"machine_details":{"ip_address":"10.233.188.161","machine_username":"root","machine_password":"root@123"},"parameters":{},"os":"linux"}' -H "Content-Type: application/json" */
			//console.log(service_id+product_id+ip_address+machine_username+machine_password);
			//'{"username":"odsi-user","service_id":1,"product_id":20,"machine_details":{"ip_address":"10.233.188.161","machine_username":"root","machine_password":"root@123"},"openstack_details":{"openstack_username":"admin","openstack_password":"ADMIN_PASS"},"parameters":{},"machine_availability":"Available","request_type":"Software","os":"linux"}' 
data = "{'username':'Prasad','service_id':"+service_id+",'product_id':"+product_id+",'machine_details':{'ip_address':'"+ip_address+"','machine_username':'"+machine_username+"','machine_password':'"+machine_password+"'},'parameters':{},'machine_availability':'Available','request_type':'Software','os':'"+os+"'}";

			console.log(data);
			//data = JSON.stringify(eval("(" +data+")"));
			data = JSON.stringify(eval("("+data+")"));
			console.log(data);
			xmlHttp = createCORSREquest('POST',url);
			console.log(xmlHttp);
			if (!xmlHttp) {
		  		//alert("inside if");
		  		throw new Error('CORS not supported');
			}
			else{
				//alert("inside else");
				//alert(data);
				xmlHttp.send(data);
				document.getElementById('loader_heading').innerHTML='Request initiated';
				document.getElementById('loader1').style.visibility='hidden';
				document.getElementById('loader').style.visibility='visible';
			}

			xmlHttp.onreadystatechange=function(){
		  		if (xmlHttp.readyState==4 && xmlHttp.status==200){
		    		/*for(var i in xmlHttp){
			    		console.log(i);
					}*/
					var result=xmlHttp.responseText;
					
						//alert("In iF of val[0]- first validate element");
		    			document.getElementById('loader').style.visibility='hidden';
						document.getElementById('loader1').style.visibility='visible';
		    			document.getElementById('loader_heading').innerHTML='Installation initiated <br> RequestID :'+ result;
						document.getElementById('availablemachine_button').style.visibility='hidden';

		    			//alert(xmlHttp.responseText);
		    	}
		  }


		}
		function boot_vm_openstack(openstack_username,openstack_password,openstack_auth_url)
		{
			//console.log("hello inside boot_vm_openstack ");
			//url = window.request_for_installation_url;
			url="http://10.233.52.111:8999/request/";
			//console.log(url);
			service_id = document.getElementById('os_form_serviceid').value;
			product_id = document.getElementById('os_form_productid').value;
			ip_address = document.getElementById('available_ipaddress').value;
			//machine_username = document.getElementById('available_username').value;
			//machine_password = document.getElementById('available_password').value;
			os = document.getElementById('os_form_os').value;
		/*'{"username":"json2","service_id":1,"product_id":20,"machine_details":{"ip_address":"10.233.188.161","machine_username":"root","machine_password":"root@123"},"parameters":{},"os":"linux"}' -H "Content-Type: application/json" */
			//console.log(service_id+product_id+ip_address+machine_username+machine_password);
data = "{'username':'Prasad','service_id':"+service_id+",'product_id':"+product_id+",'machine_details':{'ip_address':'','machine_username':'','machine_password':''},'openstack_details':{'openstack_username':'"+openstack_username+"','openstack_password':'"+openstack_password+"'},'parameters':{},'machine_availability':'','request_type':'Software','os':'"+os+"'}";
			alert(data);

			//console.log(data,"CHECK HERE ");
			//data = JSON.stringify(eval("(" +data+")"));
			data = JSON.stringify(eval("(" + data + ")"));
			console.log(data,"hi");
			xmlHttp = createCORSREquest('POST',url);
			console.log(xmlHttp);
			if (!xmlHttp) {
		  		//alert("inside if");
		  		throw new Error('CORS not supported');
			}
			else{
				//alert("inside else");
			//	alert(data);
				xmlHttp.send(data);
				document.getElementById('loader_heading_os').innerHTML='Request initiated';
				document.getElementById('loader1_os').style.visibility='hidden';
				document.getElementById('loader_os').style.visibility='visible';
			}

			xmlHttp.onreadystatechange=function(){
		  		if (xmlHttp.readyState==4 && xmlHttp.status==200){
		    		/*for(var i in xmlHttp){
			    		console.log(i);
					}*/
					var result=xmlHttp.responseText;
					
						//alert("In iF of val[0]- first validate element");
		    			document.getElementById('loader_os').style.visibility='hidden';
						document.getElementById('loader1_os').style.visibility='visible';
		    			document.getElementById('loader_heading_os').innerHTML='Installation initiated <br> RequestID :'+ result;
						document.getElementById('loginbutton_openstack').style.visibility='hidden';

		    			//alert(xmlHttp.responseText);
		    	}
		  }


		}