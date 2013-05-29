# Fargo Scripts

At the moment, just adds an Export to HTML list menu item.

# To Use

Either: Go to the Settings menu - Code tab and paste in the following, click OK and reload Fargo

    var s = 'https://raw.github.com/SparkyT/FargoScripts/master/fargo.js'; console.log("loading " + s + "..."); $.getScript(s,  function(data,  status) { console.log(status); tsFargo.msgMe(status,600,-1); }); 

or: Paste the following into a headline and run the code using CTRL-/

    var s = 'https://raw.github.com/SparkyT/FargoScripts/master/fargo.js'; console.log("loading " + s + "..."); $.getScript(s,  function(data,  status) { console.log(status); tsFargo.msgMe(status,600,-1); }); 


Voila. You should now have the extra functionality in there.
