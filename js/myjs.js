var result;
var session_id;
var allow = 1;

function createbox(id) {
	session_id = id;
	const color = document.getElementById('color');
	color.innerHTML = '';
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	if (id == 'easy') {
		for (i = 0; i < 15; i++) {
			create(i, r, g, b);
		}
		r += 20;
		document.getElementById('color').style.width = '80%';
		document.getElementById('color').style.marginLeft = '10%';
	} else if (id == 'hard') {
		for (i = 0; i < 28; i++) {
			create(i, r, g, b);
		}
		r += 10;
		document.getElementById('color').style.width = '80%';
		document.getElementById('color').style.marginLeft = '10%';
	} else {
		for (i = 0; i < 72; i++) {
			create(i, r, g, b);
		}
		document.getElementById('color').style.width = '80%';
		document.getElementById('color').style.marginLeft = '10%';
	}

	let parentSelector = document.querySelector('.color');
	let random = Math.floor(Math.random() * parentSelector.childElementCount) + 1;
	child = document.querySelector('.color>div:nth-child(' + random + ')'); //Choose random child
	var r_random = r + Math.floor(Math.random() * 50); //Add 10 to random r,g,b
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
		box_id.style.border = '2px solid rgba(255, 255, 255, 0.648)';
		allow = 1;
	}
}

function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
