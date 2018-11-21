const playerNum = (Math.random()*100) +1;   

function httpPost(url, payload, callback)
{
	let request = new XMLHttpRequest();
	request.onreadystatechange = function()
	{
		if(request.readyState == 4)
		{
			if(request.status == 200)
			callback(request.responseText);
			else
			{
				if(request.status == 0 && request.statusText.length == 0)
					alert("Connection failed");
				else
					alert("Server returned status " + request.status + ", " + request.statusText);
			}
		}
	};
	request.open('post', url, true);
	request.setRequestHeader('Content-Type',
	'application/x-www-form-urlencoded');
	request.send(payload);
}

//response back from the server
function cb(response)   {

	alert("The back-end server sent back player data: " + response);

	// Parse the JSON  
    let ob = JSON.parse(response);
    
    //giving data from server to the game
    if(ob.p1id == playerNum){
        game.model.otherPlayer.x = ob.p2x;
        game.model.otherPlayer.y = ob.p2y;
    }
    if(ob.p2id == playerNum){
        game.model.otherPlayer.x = ob.p1x;
        game.model.otherPlayer.x = ob.p1x;
    }

	console.log("Player 1 data is: x = " + ob.p1x + " // y = " + ob.p1y + "// id = " + ob.p1id);
	console.log("Player 2 data is: x = " + ob.p2x + " // y = " + ob.p2y + "// id = " + ob.p2id);
}

function sendToServer() {

	// Make a JSON blob to send to this server
    let ob = {};
    console.log("Player ID: " + playerNum);
    ob.player = playerNum;
	ob.x = game.model.mario.x;   //should get the values from mario on this instance
    ob.y = game.model.mario.y;
	let json_string = JSON.stringify(ob);

	// Send the JSON blob to the server
	httpPost("ajax_handler.html", json_string, cb);
}
