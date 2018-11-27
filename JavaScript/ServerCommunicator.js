const thisPlayerID = (Math.random()*100) +1;   

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
				//if(request.status == 0 && request.statusText.length == 0)
					//alert("Connection failed");
				//else
					//alert("Server returned status " + request.status + ", " + request.statusText);
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

	// Parse the JSON  
	let ob = JSON.parse(response);
		console.log(ob);
    
    //giving data from server to the game
	//saves the data in the other player
	if(ob.playerData == "true"){
		if(ob.p1id == thisPlayerID){	//if this character is player 1
			game.model.otherPlayer.x = ob.p2x;
			game.model.otherPlayer.y = ob.p2y;
			game.model.otherPlayer.image = game.model.otherPlayer.turtle;
		}
		if(ob.p2id == thisPlayerID){	//if this character is player 2
			game.model.otherPlayer.x = ob.p1x;
			game.model.otherPlayer.y = ob.p1y;
			game.model.mario.image = game.model.otherPlayer.turtle; //draw self as turtle
		}

		//drawing chat window messages
		console.log("message gotten from server is: " + ob.message);
		document.getElementById("chatHistory").innerHTML = "";
		for(const str of ob.messages){
			message = str;
			document.getElementById("chatHistory").innerHTML += "<option>" + message +"</option>"
		}
	}

}//end cb method

function sendToServer() {

	// Make a JSON blob to send to this server
	let ob = {};
	ob.playerData = "true"
    ob.player = thisPlayerID;
	ob.x = game.model.mario.x;   //should get the values from mario on this instance
    ob.y = game.model.mario.y;
    //ob.imageNum = game.model.mario.marioImageCounter;
	let json_string = JSON.stringify(ob);

	// Send the JSON blob to the server
	httpPost("ajax_handler.html", json_string, cb);
}

function sendMessageToServer(){
	let ob = {};
	ob.playerData = "false";
	ob.player = thisPlayerID;
	ob.incomingMessage = document.getElementById("message").value;

	let json_string = JSON.stringify(ob);

	httpPost("ajax_handler.html", json_string, cb);
}
