var result;
var session_id;
var allow = 1;

function createbox(id) {
	session_id = id;
	const color = document.getElementById('color');
	var bonus = 0;
	var diff = 0;
	color.innerHTML = '';
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	if (id == 'easy') {
		//Create 25 boxes
		for (i = 0; i < 25; i++) {
			create(i, r, g, b);
		}
		bonus = 30;
		diff = 40;
		document.getElementById('color').style.width = '100%';
		document.getElementById('color').style.marginLeft = '0%';
	} else if (id == 'hard') {
		//Create 25 boxes
		for (i = 0; i < 25; i++) {
			create(i, r, g, b);
		}
		bonus = 20;
		diff = 30;
		document.getElementById('color').style.width = '100%';
		document.getElementById('color').style.marginLeft = '0%';
	} else {
		//Create 25 boxes
		for (i = 0; i < 25; i++) {
			create(i, r, g, b);
		}
		bonus = 7;
		diff = 8;
		document.getElementById('color').style.width = '100%';
		document.getElementById('color').style.marginLeft = '0%';
	}

	let parentSelector = document.querySelector('.color');
	let random = Math.floor(Math.random() * parentSelector.childElementCount) + 1;
	child = document.querySelector('.color>div:nth-child(' + random + ')'); //Choose random child
	var r_random = r + Math.floor(Math.random() * diff) + bonus; //Add between range bonus-diff to random r,g,b
	child.style.backgroundColor = 'rgb(' + r_random + ',' + g + ',' + b + ')';

	result = child.style.backgroundColor;
	document.getElementById('result').innerHTML = result;
}

function create(i, r, g, b) {
	var div = document.createElement('div');
	div.setAttribute('class', 'box');
	div.setAttribute('id', i);
	div.setAttribute('onClick', 'check(this.id)');
	div.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
	document.getElementById('color').appendChild(div);
}

function normalbox() {
	document.getElementById('container').style.backgroundColor =
		'rgb(103, 78, 245)';
}

function disable_click() {
	var i = 0;
	const list = document.getElementById('color');
	while (list.hasChildNodes()) {
		list.childNodes[i].setAttribute('onclick', '');
		i++;
	}
}

function destroy() {
	const list = document.getElementById('color');
	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
}

async function check(id) {
	var box_id = document.getElementById(id);
	var check = box_id.style.backgroundColor;
	if (check == result && allow == 1) {
		box_id.style.border = '5px solid lime';
		var user_result = document.getElementById('user_result');
		user_result.style.color = 'lime';
		document.getElementById('user_result').innerHTML = 'YOU ARE CORRECT';
		allow = 0;
		await delay(2000);
		document.getElementById('user_result').innerHTML = '';
		allow = 1;
		createbox(session_id);
	} else if (check != result && allow == 1) {
		box_id.style.border = '5px solid red';
		var user_result = document.getElementById('user_result');
		user_result.style.color = 'rgb(224, 0, 0)';
		document.getElementById('user_result').innerHTML = 'WRONG BOX';
		allow = 0;
		await delay(2000);
		document.getElementById('user_result').innerHTML = '';
		box_id.style.border = '2px solid rgba(255, 255, 255, 0.648)';
		allow = 1;
		createbox(session_id);
	}
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
