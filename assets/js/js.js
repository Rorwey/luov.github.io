function getJuzi() {
	var str = ['水月镜花', '镜花水月', '南柯一梦', '千古风韵，声声不息', 'Eternal charm, Endless sound', 'Page not found', '江湖夜雨十年灯'];
	var sign = parseInt(Math.random()*(str.length-1),10);
	console.log(sign);
	var title = document.getElementById("title");
	console.log(title);
	title.innerText = str[sign];
}

