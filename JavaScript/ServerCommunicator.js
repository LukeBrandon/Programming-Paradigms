

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
function cb(response){

	alert("The back-end server sent back player data: " + response);

	// Parse the JSON
	let ob = JSON.parse(response);

	console.log("Player 1 data is: x = " + ob.p1x + " // y = " + ob.p1y);
	console.log("Player 2 data is: x = " + ob.p2x + " // y = " + ob.p2y);
}

function sendToServer()
{
	// Find the text field
    let msg1 = document.getElementById("p1x").value;
    console.log("msg1: " + msg1);
	let msg2 = document.getElementById("p1y").value;

	// Make a JSON blob
	let ob = {};
    ob.player = "1";
    //ob.x = model.mario.x;
    //ob.y = model.mario.y;
	ob.p1x = msg1;
	ob.p1y = msg2;
	let json_string = JSON.stringify(ob);

	// Send the JSON blob to the server
	httpPost("ajax_handler.html", json_string, cb);
}

function player2SendToServer()
{
	// Find the text field
	let msg1 = document.getElementById("p1x");
	let msg2 = document.getElementById("p1y");

	// Make a JSON blob
	let ob = {};
    ob.player = "2";
    //ob.x = model.mario.x;
    //ob.y = model.mario.y;
	ob.p2x = msg1;
	ob.p2y = msg2;
	let json_string = JSON.stringify(ob);

	// Send the JSON blob to the server
	httpPost("ajax_handler.html", json_string, cb);
}



