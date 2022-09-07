let res;
let avePos = [];


	let filterByName = (first, last) => {
		let filter = playerList.filter((p) => {
			return p.firstName == first && p.lastName == last;
		});
		return filter[0];
	};

	function bla() {
		console.log("bla");
	}

	let filterByTeamId = (teamId) => {
		let filteredPlayerList = playerList.filter((player) => {
			return player.teamId == teamId;
		});
		return filteredPlayerList;
	};

	let buildElement = (tag, cls, id, text, html, parent, src, eventName, funcName) => {
		if (typeof (tag) == "string") {
			let t = document.createElement(tag);
			if (Array.isArray(cls)) {
				cls.forEach((c) => {
					t.classList.add((typeof (c) == "string") ? c : "");
				});
			} else if (typeof (cls) == "string") {
				t.classList.add(cls);
			}
			t.id = (typeof (id) == "string") ? id : "";
			if (typeof (text) == "string") {
				t.textContent = text;
			} else if (typeof (html) == "string") {
				t.innerHTML = html;
			}
			if (typeof (parent) == "object") {
				parent.appendChild(t);
			}
			if (tag == "img" && typeof (src) == "string") {
				t.src = src;
			}
			if (typeof (eventName) == "string") {
				if (typeof (funcName) == "function") {
					t[eventName] = funcName;
				} else if (typeof (funcName) == "string") {
					t[eventName] = funcName;
				}
			}
			return t;
		} else {
			return null;
		}
	};

	let bod = document.querySelector("body");
	let buildGallery = (list, parent) => {
		parent.innerHTML = "";
		for (let i = 0; i < list.length; i++) {
			let card = buildElement("div", ["card", "centeredFlex"], null, null, null, parent, null);
			let child = buildElement("div", "name", null, null, null, card, null);
			buildElement("p", "name", null, list[i].firstName + " " + list[i].lastName, null, child, null);

			child = buildElement("div", "picture", null, null, null, card, null);
			buildElement("img", null, null, null, null, child, "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" + list[i].personId + ".png", "onclick", bla);

			child = buildElement("div", "details", null, null, null, card, null);
			child = buildElement("ul", null, null, null, null, child, null);
			buildElement("li", null, null, "Position: " + list[i].pos, null, child, null);
			buildElement("li", null, null, "Jersy: " + list[i].jersey, null, child, null);
		}
	}

function selectYear() {

	let container = document.querySelector(".container");
	fetch('http://data.nba.net/data/10s/prod/v1/' + document.querySelector("#year").value + '/players.json').then((data) => {return data.json()}).then(data => { 
		//buildGallery(aaa.data.league.standard, container); 
		console.log(data);
		res =  data.league.standard;
		getPositions();

	});
	//let positions = res.filter(data => {!positions.includes(data.pos)});
}
function getPositions(){
for (let index = 0; index < res.length; index++) {
	if (!avePos.includes(res[index].pos)) avePos[avePos.length] = res[index].pos;
	
}
let posSelector = document.createElement("div");
posSelector.id = "posSelector";
posSelector.classList = document.querySelector("#yearSelector").classList;
posSelector.innerHTML += "select position:";
let posList = document.createElement("select");
posList.id = "posList";
for (let index = 0; index < avePos.length; index++) {
	let opt = document.createElement("option");
	opt.innerHTML =  opt.value = avePos[index];
	posList.appendChild(opt);	
}
let selectPosBT = document.createElement("button");
selectPosBT.innerHTML = "select position";
selectPosBT.onclick = () => {viewGalery()};

posSelector.append(posList, selectPosBT);
if (document.querySelector("#posSelector")) document.querySelector("#posSelector").remove();
document.querySelector("#yearSelector").after(posSelector);
}
function viewGalery(){
	let posList = document.querySelector("#posList");
	const regex = new RegExp(posList.value);
	//---
	let filteredByPos = [];
	filteredByPos = res.filter(data => {return regex.test(data.pos)});
	let container = document.querySelector(".container");

	buildGallery(filteredByPos, container);
}
