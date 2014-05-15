function saveSettingsDialog(e){					
	// Check browser support
	if (typeof(Storage) != "undefined")
	{
		for (var i = 0; i < ($("#"+e.parentNode.id)[0].length)-1; i++){
			var eleVal = $("#"+e.parentNode.id)[0][i].value;
			var eleId =  e.parentNode.id+"_"+$("#"+e.parentNode.id)[0][i].id;
			localStorage.setItem(eleId, eleVal);
		}									 					
	}
	else
	{
		alert("Sorry, your browser does not support Web Storage...");
	}
	$("#"+e.id).parent().parent().hide();
}
function openSettingsDialog(e){
	if(($("#"+e.id).next()).is(":hidden")){
		// Check browser support
		if (typeof(Storage) != "undefined")
		{	
			for (var i = 0; i < ($("#"+e.id).next().children()[0].length)-1; i++){
				var eleObj =  $("#"+e.id).next().children()[0][i];
				var eleId =  $("#"+e.id).next().children()[0].id+"_"+$("#"+e.id).next().children()[0][i].id;
				eleObj.value = localStorage.getItem(eleId);
			}							 					
		}
		$("#"+e.id).next().show();
	}
	else{
		$("#"+e.id).next().hide();
	}
}

function allowDrop(ev)
{
	ev.preventDefault();
}
function dragStart(ev)
{		
	ev.dataTransfer.setData("Text",ev.target.id);
	if($(ev.target).prop('class') == "vm"){
		if(document.getElementById("increment_val").value == ""){
			document.getElementById("increment_val").value = 1;
		}
		else{
			document.getElementById("increment_val").value = parseInt(document.getElementById("increment_val").value) + 1;
		}
	}				
}
function dropOver(ev)
{				
	ev.preventDefault();				
	var dragId = ev.dataTransfer.getData("Text");				
	var dragdivClass = $("#"+dragId).prop('class');	
	var dragdivTitle = "";					
	var dragStyle = $("#"+dragId).prop('style')['backgroundColor'];			
	var targetEle = document.getElementById('template_div');
	var templateFlag = "template_flag";
	$( "#template_div").children().each(function() {					
		if($(this)[0].className == "vm_template_child"){
			templateFlag = "vm_flag";
		}
		else if($(this)[0].className == "sw_template_child"){
			templateFlag = "sw_flag";
		}
	});
	var iVal = document.getElementById('increment_val').value;
	
	if(dragdivClass == 'vm'){
		if(templateFlag != "sw_flag"){
			var inner_html = "";
			var vmDiv = document.createElement('div');
			vmDiv.id = dragId+"_"+iVal;					
			vmDiv.setAttribute('name',dragId+"_name_"+iVal);							
			inner_html  = "<div id="+dragId+"_name_"+iVal +">";
			inner_html  += "<input type='checkbox' id='delete_check_"+dragId+"_"+iVal+"' class='delete_check' title='Delete checkbox' name='delete_check_"+dragId+"_"+iVal+"'/><span style='font-size:20px;'>"+$("#"+dragId).html() + "</span>";
			inner_html  += "<button class='btn settings' id='settings_"+dragId+"_"+iVal+"' name='settings_"+dragId+"_"+iVal+"' style='float:right;' onclick='openSettingsDialog(this)'>Settings </button>";
			inner_html  += "<div id='settings_"+dragId+"_"+iVal+"_div' name='settings_"+dragId+"_"+iVal+"_div' class='settings_div'>";
			inner_html  += "<form id='settings_"+dragId+"_"+iVal+"_form' name='settings_"+dragId+"_"+iVal+"_form' class='settings_form'>";
			inner_html  += "<label for='settings' style='float:left;width:47%;font-size:11px;'>Select Image</label>";
			inner_html  += "<select id='settings' style='float:right;width:53%;'>";
			inner_html  += "<option value='111'>ubuntu-12.04</option><option value='222'>ubuntu-12.10</option><option value='333'>ubuntu-13.04</option>";
			inner_html  += "</select>";
			inner_html  += "<label for='ram' style='float:left;width:47%;font-size:11px;'>RAM</label>";
			inner_html  += "<input type='text' name='ram' id='ram' style='float:right;width:53%;'>";
			inner_html  += "<label for='cpu' style='float:left;width:47%;font-size:11px;'>CPU</label>";
			inner_html  += "<input type='text' name='cpu' id='cpu' style='float:right;width:53%;'>";
			inner_html  += "<label for='harddisk' style='float:left;width:47%;font-size:11px;'>Harddisk</label>";
			inner_html  += "<input type='text' name='harddisk' id='harddisk' style='float:right;width:53%;'>";
			inner_html  += "<button type='button' id='settings_"+dragId+"_"+iVal+"_save' onclick='saveSettingsDialog(this)'>OK</button>";
			inner_html  += "</form>";
			inner_html  += "</div>";
			inner_html  += "</div>";
			inner_html  += "<div style='width:99%;height:150px;overflow:auto;' name="+dragId+"_imgdiv_"+iVal+" class="+dragId+"_imgdiv_"+iVal+"  id='img_div'></div>";
			vmDiv.innerHTML = inner_html;
			vmDiv.style.backgroundColor = dragStyle;
			vmDiv.style.border = "1px solid black";
			vmDiv.style.borderRadius = "5px";
			vmDiv.style.display = "inline-block";
			vmDiv.style.width = "150px";
			vmDiv.style.height = "185px";
			vmDiv.style.margin = "2px 5px 0 5px";
			vmDiv.style.float = "left";
			vmDiv.style.textAlign = "center";
			vmDiv.style.position = "relative";					
			vmDiv.setAttribute('class',"vm_template_child");
			vmDiv.setAttribute('draggable',"true");
			vmDiv.setAttribute('ondragstart',"dragStart(event)");
			if(ev.target.id !=  "bin_div" && ev.target.id !=  "bin_img"){
				targetEle.appendChild(vmDiv);	
			}	
		}	
		else{
			$('alertModal .modal-body').html("This is only Software Template");
			$("#alertModal").modal({ 
				"backdrop" : "static",
				"keyboard" : true,
				"show" : true
			});
		}
	}
	else if(dragdivClass == 'software' || dragdivClass == 'swimg'){
		if(templateFlag == "vm_flag"){
			var iVal = document.getElementById('increment_val').value;
			var dragImgId = '';	
			if(ev.target.id ==  "img_div"){
				var flag = true;						
				$( "div[name="+ev.target.getAttribute('name')+"]>img").each(function() {
					if(dragdivClass == 'swimg'){
						var imgDragId = $("#"+dragId).children('div').children('img')[0].id;
						dragUpdatedId = $("."+ev.target.className).parent()[0].id+"_"+imgDragId+"_div";
						dragdivTitle = $("#"+imgDragId).parent().parent()[0].title;
						if(this.id == dragUpdatedId){								
							flag = false;									
						}
					}
					else{
						dragUpdatedId = $("."+ev.target.className).parent()[0].id+"_"+dragId+"_div";
						dragdivTitle = $("#"+dragId).parent().parent()[0].title;	
						if(this.id == dragUpdatedId){								
							flag = false;									
						}	
					}							
				});
				if(flag == true){
					var dragdivClass;	
					var dragSrc ;
					if(dragdivClass == 'swimg'){								
						dragImgId = $("."+ev.target.className).parent()[0].id+"_"+dragId;
						var imgDragId = $("#"+dragId).children('div').children('img')[0].id;
						dragdivClass = $("#"+imgDragId).prop('class');								
						dragSrc =  $("#"+imgDragId).prop('src');	
							
					}
					else{								
						dragImgId = $("."+ev.target.className).parent()[0].id+"_"+dragId+"_div";
						dragdivClass = $("#"+dragId).prop('class');								
						dragSrc =  $("#"+dragId).prop('src');		
					}
					
					var simgDiv = document.createElement('img');
					simgDiv.id = dragImgId;				
					simgDiv.src  = dragSrc;
					simgDiv.width  = "80";
					simgDiv.height  = "50";
					simgDiv.style.margin = "5px";							
					simgDiv.style.border = "1px solid gray";
					simgDiv.style.borderRadius = "5px";	
					simgDiv.setAttribute('class',"vm_template_child");
					simgDiv.setAttribute('draggable',"true");
					simgDiv.setAttribute('ondragstart',"dragStart(event)");
					if(ev.target.id ==  "img_div"){						
						ev.target.appendChild(simgDiv);
					}
					else if(ev.target.lastChild){					
						ev.target.lastChild.appendChild(simgDiv);
					}
				}
				else if(flag == false){					
					if(templateFlag == "sw_flag"){
						$('#alertModal .modal-body').html(dragdivTitle+" software already added to template");
					}
					else{
						$('#alertModal .modal-body').html(dragdivTitle+" software already added to this VM");
					}
					$("#alertModal").modal({ 
						"backdrop" : "static",
						"keyboard" : true,
						"show" : true
					});
				}
			}
			else if(ev.target.id ==  "template_div"){
				$('#alertModal .modal-body').html("Please add software to VM");
				$("#alertModal").modal({ 
					"backdrop" : "static",
					"keyboard" : true,
					"show" : true
				});
			}
		}
		else {
			var flag = true;	
			var dragUpdatedId = "";
			$( "#"+ev.target.id+">img").each(function() {
				if(dragdivClass == 'swimg'){
					var imgDragId = $("#"+dragId).children('div').children('img')[0].id;
					dragUpdatedId = imgDragId+"_template_div";
					dragdivTitle = $("#"+imgDragId).parent().parent()[0].title;
					if(this.id == dragUpdatedId){								
						flag = false;									
					}
				}
				else{								
					dragUpdatedId = dragId+"_template_div";
					dragdivTitle = $("#"+dragId).parent().parent()[0].title;	
					if(this.id == dragUpdatedId){								
						flag = false;									
					}	
				}							
			});
			if(flag == true){
				var imgDragId = "";							
				if(dragdivClass == 'software'){								
					imgDragId =  dragId;
				}
				else if(dragdivClass == 'swimg'){								
					imgDragId = $("#"+dragId).children('div').children('img')[0].id;
				}
				var simgDiv = document.createElement('img');
				dragSrc =  $("#"+imgDragId).prop('src');
				simgDiv.id = imgDragId+"_template_div";				
				simgDiv.src  = dragSrc;
				simgDiv.width  = "80";
				simgDiv.height  = "50";
				simgDiv.style.margin = "5px";							
				simgDiv.style.border = "1px solid gray";
				simgDiv.style.borderRadius = "5px";	
				simgDiv.setAttribute('class',"sw_template_child");
				simgDiv.setAttribute('draggable',"true");
				simgDiv.setAttribute('ondragstart',"dragStart(event)");
				if(ev.target.id !=  "bin_div" && ev.target.id !=  "bin_img"){
					targetEle.appendChild(simgDiv);	
				}
			}
			else if(flag == false){					
					$('#alertModal .modal-body').html(dragdivTitle+" software already added to this VM");
					$("#alertModal").modal({ 
						"backdrop" : "static",
						"keyboard" : true,
						"show" : true
					});
			}
		}
	}	
	else if(ev.target.id == "bin_div" || ev.target.id == "bin_img"){
		$('#confirmVmSwDelete .modal-body').html("<p>Are you sure you want to delete ?</p>");
		$("#confirmVmSwDelete").modal();
		$('#confirmVmSwDelete').find('.modal-footer #confirm_vm_sw_delete').on('click', function(e){
			if($("#"+dragId).prop('class') == "vm_template_child"){						
				for (var i = 0; i < ($("#"+dragId).children().children('button').next().children()[0].length)-1; i++){					
					var eleId =  $("#"+dragId).children().children('button').next().children()[0].id+"_"+$("#"+dragId).children().children('button').next().children()[0][i].id;		
					localStorage.removeItem(eleId);
				}
			}
			$("#"+dragId).remove();			
			$("#confirmVmSwDelete").modal('hide');			
		});			
	}				
}
function getTemplateDivDelete(deleteFlag){
	var flag = false;
	$("#template_div").children().each(function () {					
		if($(this).children().children('input[type=checkbox]').is(':checked'))
		{
			if(deleteFlag == "delete_true"){			
				if($(this).prop('class') == "vm_template_child"){
					for (var i = 0; i < ($(this).children().children('button').next().children()[0].length)-1; i++){					
						var eleId =  $(this).children().children('button').next().children()[0].id+"_"+$(this).children().children('button').next().children()[0][i].id		
						localStorage.removeItem(eleId);								
					}
				}			
				$(this).remove();
			}
			else{
				flag = true;				
			}
		}
	});	
	if(deleteFlag == "delete_false"){		
		return flag;	
	}
}