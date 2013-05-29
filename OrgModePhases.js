// NOTE: This currently only works in text mode.

// NOTE: Labels can be expanded here. I imagine labels might have more intermediate phases like PENDING or WAITING.
// I've included spaces in the labels in case you want to use other delimeters without changing the code
var labels = ['TODO ', 'DONE '];

var labelsRegex = new RegExp('^(' + labels.join('|') + ')');

$(document).bind('keydown', function(event) {
    // Bail if not in text mode
    if($('.textMode').length == 0) {
	return -1;
    }
    var theKey = event.which;
    // Since this will run on every keydown, I'm doing my best to make sure this is as performant as possible by excluding as many cases as I can outright
    // Is the shift key held down?
    if(event.shiftKey && !event.ctrlKey) {
	// Is this an arrow key?
        if(theKey === 37 || theKey === 39) {
	    var currentElement = $('div.active .concord-cursor > div > div');
	    var currentText = currentElement.text();
	    
	    //Check which we're changing, priorities or labels
	    if(theKey === 37 || theKey === 39) {
		//Labels stuff
		// Is there no label at all?
		if(!labelsRegex.test(currentText)) {
		    if(theKey === 37) {
			currentElement.text(labels[labels.length - 1] + currentText);
		    } else {
			currentElement.text(labels[0] + currentText);
		    }
		} else {
		    //Find the label and increment/decrement
		    var parsedLabel = labelsRegex.exec(currentText)[0];
		    var currentLabelIndex = labels.indexOf(parsedLabel);
		    if(theKey === 37) {
			//Left Arrow
			if(currentLabelIndex - 1 < 0) {
			    currentElement.text(currentText.replace(labelsRegex, ''));
			} else {
			    currentElement.text(currentText.replace(labelsRegex, labels[currentLabelIndex - 1]));
			}
		    } else {
			// Right Arrow
			if(currentLabelIndex + 1 >= labels.length) {
			    currentElement.text(currentText.replace(labelsRegex, ''));
			} else {
			    currentElement.text(currentText.replace(labelsRegex, labels[currentLabelIndex + 1]));
			}
		    }
		}
	    }
        } 
    }
});





var myFM2Word = $('#idtsFargo2Word');
if(myFM2Word.length === 0){
	myFM2Word = $('<li class="divider"></li><li id="idtsFargo2Word"><a onclick="tsFargo.tsFS();">* Export to Word</a></li>')
        .appendTo('#idFileMenu ul.dropdown-menu');    
}

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
  tsFS:				function fileShare (){
					var tab = smallTabs.getActiveTab ();
					var tabTitle = tab.getTitle();
					var tabUrl = tab.url;
					// direct from fargo.io;
					var tab = smallTabs.getActiveTab ();
					var baseurl = "http://www.trinity-urc.org.uk/fargo/xml.php?fargoOPML=";
					if (tab.type == "watchedOutline") {
						window.open (baseurl + encodeURIComponent (tab.url));
						}
					else {
						vendor.createSharedUrl (tab.url, function (publicUrl) {
							window.open (baseurl + encodeURIComponent (publicUrl));
							},
							function () {
								alertDialog ("Can't open the outline \"" + tab.title + "\" in Taco Pie."); 
								}
							);
						}
/*						
					if(tab.flEditable && (tab.url!==undefined)){
						confirmDialog ("Create a public link for the \""+tabTitle+"\" file?",function(){
							vendor.createSharedUrl(tabUrl, function(publicUrl){
								//tsFargo.msgMe(publicUrl,600,-1);
								window.open("http://www.trinity-urc.org.uk/fargo/xml.php?fargoOPML=" + publicUrl,'_blank');
								});
							});
						}
					}
*/
}
