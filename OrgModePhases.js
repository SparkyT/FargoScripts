// Thanks to https://github.com/Remixer96/FargoScripts for inspiration


// Find our menu item and remove it if exists, then add it back in 
//  TODO there must be a better way to deal with this!
var myFM2Word = $('#tsFargo2HTMLList');
if(myFM2Word.length === 0){
}
else {
	myFM2Word.remove();	
	$('#tsFargoDivider').remove();
}
// Add the divider and Export to HTML list
myFM2Word = $('<li id="tsFargoDivider" class="divider"></li><li id="tsFargo2HTMLList"><a onclick="tsFargo.tsF2HTMLList();">* Export to HTML list</a></li>').appendTo('#idFileMenu ul.dropdown-menu');    


var tsFargo = {
  module:   "tsFargo",
  version:  "0.1",
  
  id: function() {
    var s = this.module + " " + this.version;
    console.log(s);
    return s;
  },
  inspect: function(obj) {
    var out = [];
    for(var p in obj) {
      var t = typeof obj[p];
      out.push(t + ":" + p + " = " + obj[p]);
    }
    return out.join('<br />\n');
  },
  msgMe: function(msgTxt,fadeInTime, fadeOutTime){
  	fadeInTime = typeof fadeInTime !== undefined ? fadeInTime : 600;
  	fadeOutTime = typeof fadeOutTime !== undefined ? fadeOutTime : 300;
  	
  	var myMsgDiv = $('#idHidableSidebarMsg');
	if(myMsgDiv.length === 0){
    		myMsgDiv = $('<div class="divExplanation" id="idHidableSidebarMsg" style="font-weight: bold; color: silver;"><span id="idHidableSidebarMsgTxt"></span></div>   ')
        	.appendTo('#idHidableSidebar');    
	}
	var myMsg = $("#idHidableSidebarMsgTxt");

  	myMsgDiv.hide();
  	myMsg.html(msgTxt);
  	//console.log('FI'+fadeInTime+' FO'+fadeOutTime);
  	myMsgDiv.fadeIn(fadeInTime,function(){
  		console.log('FI'+fadeInTime+' FO'+fadeOutTime);
  		if(fadeOutTime!=-1){
  			
  			myMsgDiv.fadeOut(fadeOutTime);
  			myMsg.html('');
  			myMsgDiv.show();
  		}
  		
  		
  	});
 
  },
  tsF2HTMLList:				function file2HTMLList (){
					var tab = smallTabs.getActiveTab ();
					var tabTitle = tab.getTitle();
					var tabUrl = tab.url;
					// direct from fargo.io, tweked to remove blocking of popups ;
					//	open window first and retain reference, then set location in callback; 
					var tab = smallTabs.getActiveTab ();
					//	TODO - Move to proper server when practical, thanks to Trinity URC admin for the use (that's me)
					var baseurl = "http://www.trinity-urc.org.uk/fargo/opml2html.php?fargoOPML=";
					var w = window.open( baseurl + 'redirecting' );
					if (tab.type == "watchedOutline") {
						w.location =baseurl + encodeURIComponent (tab.url);
						}
					else {
						vendor.createSharedUrl (tab.url, function (publicUrl) {
							w.location = baseurl + encodeURIComponent (publicUrl);
							},
							function () {
								alertDialog ("Can't open the outline \"" + tab.title + "\" in Taco Pie."); 
								w.close();
								}
							);
						}
											
  				},	
}
