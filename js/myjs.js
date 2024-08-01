// Global variables to store the result color, session ID, allow flag, and player score
var result;
var session_id;
var allow = 1;
var score = 0;
var combo = 1; // Track the number of consecutive correct guesses

// Function to create boxes and initialize the game with a difficulty level
function createbox(id) {
	// Store session ID for current game session
	session_id = id;
	const color = document.getElementById('color');
	var bonus = 0;
	var diff = 0;
	// Clear previous boxes
	color.innerHTML = '';
	// Generate random RGB values
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	// Check difficulty level and adjust bonus and diff values accordingly
	if (id == 'easy') {
		// Create 25 boxes with specific parameters for 'easy' difficulty
		for (i = 0; i < 16; i++) {
			create(i, r, g, b);
		}
		bonus = 40;
		diff = 0;
		document.getElementById('color').style.width = '100%';
		document.getElementById('color').style.marginLeft = '0%';
	} else if (id == 'hard') {
		// Create 25 boxes with specific parameters for 'hard' difficulty
		for (i = 0; i < 16; i++) {
			create(i, r, g, b);
		}
		bonus = 25;
		diff = 0;
		document.getElementById('color').style.width = '100%';
		document.getElementById('color').style.marginLeft = '0%';
	} else {
		// Default case, create 25 boxes with specific parameters for 'medium' difficulty
		for (i = 0; i < 16; i++) {
			create(i, r, g, b);
		}
		bonus = 15;
		diff = 0;
		document.getElementById('color').style.width = '100%';
		document.getElementById('color').style.marginLeft = '0%';
	}

	// Select a random child element from the color container
	let parentSelector = document.querySelector('.color');
	let random = Math.floor(Math.random() * parentSelector.childElementCount) + 1;
	child = document.querySelector('.color>div:nth-child(' + random + ')'); // Choose random child

	// Adjust RGB values for the selected child to differentiate it
	var r_random = r + Math.floor(Math.random() * diff) + bonus; // Add between range bonus-diff to random r,g,b
	var g_random = g + Math.floor(Math.random() * diff) + bonus; // Add between range bonus-diff to random r,g,b
	var b_random = b + Math.floor(Math.random() * diff) + bonus; // Add between range bonus-diff to random r,g,b

	//child.style.backgroundColor = 'rgb(' + r_random + ',' + g + ',' + b + ')';
	child.style.backgroundColor =
		'rgb(' + r_random + ',' + g_random + ',' + b_random + ')';
	// Set the result to be the color of the selected box
	result = child.style.backgroundColor;
	// Display the result color on the page
	document.getElementById('result').innerHTML = result;
}

// Function to create individual boxes with a given RGB color
function create(i, r, g, b) {
	var div = document.createElement('div');
	div.setAttribute('class', 'box');
	div.setAttribute('id', i);
	div.setAttribute('onClick', 'check(this.id)');
	div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	document.getElementById('color').appendChild(div);
}

// Function to reset the container background color to default
function normalbox() {
	document.getElementById('container').style.backgroundColor =
		'rgb(103, 78, 245)';
}

// Function to disable clicking on boxes by removing click event handlers
function disable_click() {
	var i = 0;
	const list = document.getElementById('color');
	while (list.hasChildNodes()) {
		list.childNodes[i].setAttribute('onclick', '');
		i++;
	}
}

// Function to remove all boxes from the color container
function destroy() {
	const list = document.getElementById('color');
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
}

// Function to check if the clicked box has the correct color
async function check(id) {
	var box_id = document.getElementById(id);
	var check = box_id.style.backgroundColor;
	if (check == result && allow == 1) {
		// Correct box clicked, update border and message
		box_id.style.border = '5px solid lime';
		var user_result = document.getElementById('user_result');
		user_result.style.color = 'lime';
		//document.getElementById('user_result').innerHTML = 'YOU ARE CORRECT';
		score += 10 * combo; // Increase score based on combo
		combo++; // Increase combo multiplier
		updateScoreDisplay();
		allow = 0;
		await delay(100); // Wait for 1 second
		document.getElementById('user_result').innerHTML = '';
		allow = 1;
		// Start a new game
		createbox(session_id);
	} else if (check != result && allow == 1) {
		// Wrong box clicked, update border and message
		box_id.style.border = '5px solid red';
		var user_result = document.getElementById('user_result');
		user_result.style.color = 'rgb(224, 0, 0)';
		//document.getElementById('user_result').innerHTML = 'WRONG BOX';
		if (score > 0) {
			score -= 10; // Decrease score
			combo = 1; // Reset combo multiplier
			updateScoreDisplay();
		}

		allow = 0;
		await delay(100); // Wait for 1 second
		document.getElementById('user_result').innerHTML = '';
		box_id.style.border = '2px solid rgba(255, 255, 255, 0.648)';
		allow = 1;
		// Start a new game
		createbox(session_id);
	}
}

// Helper function to create a delay using a promise
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to update the player's score display
function updateScoreDisplay() {
	document.getElementById('score').innerHTML = '' + score + ' x' + (combo - 1);
}
