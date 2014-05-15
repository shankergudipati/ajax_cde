		$(window).load(function() {
			//alert("window load occurred!");
    		window.service_with_tag_url = 'http://10.233.52.111:8999/service_with_tag/';
    		window.products_all_url = 'http://10.233.52.111:8999/products_all/';
    		window.products_by_service_tag_key_url = 'http://10.233.52.111:8008/products/';
    		window.request_status_all_url='http://10.233.52.111:8999/req_status_all/';
    		window.service_by_key_tag_url = 'http://10.233.52.111:8999/products_by_tag/';
    		window.validate_url = 'http://10.233.52.111:8999/validate/';
    		window.request_for_installation_url = 'http://10.233.52.111:8999/request/';
			window.authenticate_openstack_credentials_url= 'http://10.233.52.111:8999/auth_user_opstk/';
			//window.request_installation_openstack = 'http://10.233.52.111:8999/request/';
    		//alert (window.url);
		});

		$(document).ready(function(){						
			$("#availablemachine_button").on('click',function(){
				$("#progressBar").show();
				var current = 0;
				var max = 100;				
				function update() {
					current += 1; 					
					$("#progressBar").val(current);
					if (current >= max) clearInterval(interval);					
					$('.progress-value').html(current + '%'); 
				};
				var interval = setInterval(update, 450); //for 30 seconds				
			});
			$("body select").msDropDown();
			$('#cloud_back').on('click',function(){								
				$('li#details_li').addClass('active');
				$('li#details_li').show();
				$('#details').show();
				$('li#cloud_li').hide();						
				$('#cloud').hide();	
			});
			$('#cloud_back2').on('click',function(){				
				$('li#details_li').addClass('active');
				$('li#details_li').show();
				$('#details').show();
				$('li#cloud_li').hide();						
				$('#cloud').hide();				
			});
			$('#available_back').on('click',function(){
				$('li#details_li').addClass('active');
				$('li#details_li').show();
				$('#details').show();
				$('li#available_li').hide();						
				$('#available').hide();
			});
			$('body').on('hide.bs.modal', '#popup-modal', function () {				
				$("#progressBar").hide();
				$(".progress-value").hide();
				$('#popup-form').each (function(){
  					this.reset();
					//$('li#details_li').find('a[data-toggle="tab"]').tab('show'); 					
					document.getElementById('loader_heading').innerHTML='';
					document.getElementById('loader1').style.visibility='hidden';
					document.getElementById('loader').style.visibility='hidden';
					document.getElementById('invalid_img').style.visibility='hidden';
					document.getElementById('availablemachine_button').style.visibility='visible';
				});
				$('li#details_li').addClass('active');
				$('li#details_li').show();
				$('#details').show();
				$('li#available_li').hide();
				$('#available').hide();
				$('li#cloud_li').hide();
				$('#cloud_li').hide();
				$('a#available_a').attr('href','');
				$('a#cloud_a').attr('href','');
				$('#non_openstack_frm').hide();
				$('#openstack_frm').hide();
			});
			//$('li#available_li').addClass('disabled');
			$('li#available_li').hide();
			$('#available').hide();
			$('a#available_a').attr('href','');
			//$('li#cloud_li').addClass('disabled');
			$('li#cloud_li').hide();
			$('#cloud').hide();
			$('a#cloud_a').attr('href','');
			$('li#details_li').addClass('active');
			$('li#details_li').show();
			$('#details').show();
			$('#selectednext').on('click', function () {
				if($('#installation_mode').val() == 0){
					alert("Please selct Mode");
				}
				else{
					if($('#installation_mode').val() == "existingvm"){
						/*$('li#available_li').removeClass('disabled');
						$('a#available_a').attr('href','#available');
						//$('.nav-pills li').filter('.active').next('li').find('a[data-toggle="tab"]').tab('show');				
						$('li#available_li').find('a[data-toggle="tab"]').tab('show');				
						$('li#available_li').show();
						$('li#cloud_li').hide();*/
						$('li#available_li').addClass('active');
						$('li#available_li').show();
						$('#available').show();
						$('li#details_li').hide();						
						$('#details').hide();
					}
					else if($('#installation_mode').val() == "openstack" || $('#installation_mode').val() == "awsvm" || $('#installation_mode').val() == "vmonothers"){
							if($('#installation_mode').val() == "openstack"){
								$('#non_openstack_frm').hide();
								$('#openstack_frm').show();
							}
							else{
								$('#openstack_frm').hide();
								$('#non_openstack_frm').show();
							}
							/*
							$('li#cloud_li').removeClass('disabled');
							$('a#cloud_a').attr('href','#cloud');
							//$('.nav-pills li').filter('.active').next('li').next('li').find('a[data-toggle="tab"]').tab('show');	
							$('li#cloud_li').find('a[data-toggle="tab"]').tab('show');				
							$('li#cloud_li').show();
							$('li#available_li').hide();*/
							$('li#cloud_li').addClass('active');
							$('li#cloud_li').show();
							$('#cloud').show();
							$('li#details_li').hide();						
							$('#details').hide();
						}
					}
				});
			});
			function progressBar(percent, $element) {
				var progressBarWidth = percent * $element.width() / 100;
				$element.find('div').animate({ width: progressBarWidth }, 500).html(percent + "%&nbsp;");
			}

		/*
		//sample function
		function details_popup(value,key)
		{
		alert('called');
		alert(value);
		alert(key);
		}*/
		
		
		window.onload = function() { 
		    $('.install-btn').avgrund({
		        height: 250,
		        width: 370,
		        holderClass: 'custom',
		        showClose: true,
		        showCloseText: 'close',
		        onBlurContainer: '.container',
		        template: $('.modal-box').html()
		    });
			
			/*$.ajax({
				url: 'http://10.233.52.111:8008/servicewithtag/',
				contentType: "application/json",
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback: "test",

				success: function (data)
				{
				
					//console.log(data);
					//console.log(data['1']);
				    var existing_html = $('#sidebar-list ul').html();

						$('#sidebar-list ul').html('');
					$.each(data,function(key,value){
						//console.log(key);
						var list="";
						list = list + "<li><span>"+value+"</span></li>";
		                //<ul class='sub' id='"+key+"'><li>hello</li></ul>
						$("#sidebar-list ul").append(list);
					});
					$("#sidebar-list ul").append(existing_html);

				}
			});*/
		    display_all_products();
			var existing_html = $('#sidebar-list ul').html();
			$.ajax({
				//url: 'http://10.233.52.111:8008/servicewithtag/',
				url : window.service_with_tag_url,		
				contentType: "application/json",
				dataType: "jsonp",
				jsonp: "callback",
				jsonpCallback: "service_with_tag",
				success: function (data)
				{
					//console.log(data);
					//status report is already defined so..we are taking that to a variable before emptying the sidebar-list 
		            //var existing_html = $('#sidebar-list ul').html();
					$('#sidebar-list ul').html('');  //emptying sidebar-list ul(div)
					//console.log(data);
					//console.log(existing_html);
					var list="";
					var list="<li onClick='display_all_products();'><span>All<span class='icon-collapse'></span></span><li>";
					$.each(data,function(key,value){
						list =list+ "<li><span>"+value[0]+"<span class='icon-collapse'></span></span><ul class='sub'>";
						var tags = value[1].split(',');
						for (i = 0; i < tags.length; i++) {
							list = list+ "<li onClick='display_products_by_tag(\""+key+"\",\""+tags[i]+"\")'><span>"+tags[i]+"</span></li>";
						}
						list = list + "</ul></li>";
					});
					$("#sidebar-list ul").html(list);
					setSideBarCollapse();
					$("#sidebar_list").append(existing_html); //now appending -to get "status" at the end of side-bar list
				}

			});
		};

		function display_all_products(){
			//alert("this is all button");
			$.ajax({
    			url : window.products_all_url,
    			contentType: "application/json",
    			dataType: "jsonp",
    			jsonp: "callback",
    			jsonpCallback: "products_all",
    			success: function (data){
        			//console.log(data);
        			var products="<ul id='product_details' class='bxslider'>";
        			$.each(data,function(key,value){
        				//console.log(key);
        				//console.log(value);
        				products+='<li style=height:150px;width:200px;><div title='+value+'><div class=head><img src=images/logos/'+key+'.png></div><button id=details_button name=details-button-popup class=btn data-toggle=modal style=\'position: relative;margin-left:30px;margin-left:15%\' href=\'#popup-modal\' onclick=\'details_popup("1","'+value+'","'+key+'");\'>Provision</button></div></li>';
        			});
        			$("#product_filter").html(products+"</ul>");
    			}
			});
		}
			

		
		function details_popup(service_id,value,key){
			$.ajax({
		        //url : 'http://10.233.52.111:8008/products/'+service_id+'/'+key,
				url : window.products_by_service_tag_key_url+service_id+'/'+key,
				contentType: "application/json",
		        dataType: "jsonp",
		        jsonp: "callback",
		        jsonpCallback: "test",
		        success: function (data){
		        	//console.log(data);
		        	$.each(data,function(key,value){
		        		console.log(service_id+"  "+key+"   "+value)
						var length=document.getElementsByName("details-button-popup").length;
		        		//alert(product_name+"     "+product_id+service_tag+version+os+architecture+service_id);
		        		for(var i =0; i<length; i++){
		             		document.getElementsByName("details-button-popup")[i].setAttribute("href","#popup-modal");
		           		}
						document.getElementById("pop-image").setAttribute("src","images/logos/"+key+".png");
						document.getElementById("label-productname").innerHTML="Product Name :  "+value[0];
						document.getElementById("label-version").innerHTML="Version :  "+value[1];
						document.getElementById("label-architecture").innerHTML="Architecture :  "+value[3];
						document.getElementById("label-operatingsystem").innerHTML="Operating System :  "+value[2];
						//hiding the data in the openstack login form
						document.getElementById("os_form_serviceid").setAttribute("value",service_id);
						document.getElementById("os_form_productid").setAttribute("value",key);
						document.getElementById("os_form_productname").setAttribute("value",value[0]);
						document.getElementById("os_form_os").setAttribute("value",value[2]);
						document.getElementById("os_form_version").setAttribute("value",value[1]);
						document.getElementById("os_form_architecture").setAttribute("value",value[3]);
		            });
		            
		        }
			});
		}

		
		 //************This method clickd returns the status of all the requests*************//
		function display_status_report(){
			$.ajax({
		    	//url: 'http://10.233.52.111:8008/req_status_all/',
		    	url : window.request_status_all_url,
		    	contentType: "application/json",
		    	dataType: "jsonp",
		    	jsonp: "callback",
		    	jsonpCallback: "req_status_all",
		    	success: function (data){
					//console.log(data);
		        	//console.log(data['1']);
					$('#product_filter').html('');
					$('#product_filter').append("<div id='table_div'><table class ='table' style='width: 85%;position: relative;margin-left: 50px;' id='product_filter_table' ><thead><tr><th>Request Id</th><th>Username</th><th>Product Name</th><th>Machine IP</th><th>Status</th><th>Remarks</th></tr></thead></table></div>");
					$.each(data,function(key,value){
						var tableData = "<tr ><td>"+key+"</td>";
						for (var key in value) {
						    if(value[key]=="In Progress")
							{
							  tableData = tableData + "<td> <img style='width:50;height:20;' src='./images/inprogress-loader.gif'/></td>";
							}
							else if(value[key]=="Completed")
							{
							  tableData = tableData + "<td> <img style='height:30' src='./images/loader1.png'/></td>";
							}
							else if(value[key]=="Failed")
							{
							tableData = tableData + "<td> <b style='color:red;font-size: 12px;'>"+value[key]+"</b></td>";
							}
							else{
							tableData = tableData + "<td>"+value[key]+"</td>";
						    }
						}

						tableData = tableData + "</tr>";
		 				$('#product_filter_table').append(tableData);
					});
				}
			});
		}