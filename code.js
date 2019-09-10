var request = require('request');
request('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=04bfcef315ee1476877103799713aa51192d9136', function(error, response, body) {
	const fs = require('fs');

	//json data
	var jsonData = response;
	//console.log(jsonData);


	//stringify json object
	//jsonData = JSON.stringify(jsonData);
	console.log(jsonData);

	
	fs.writeFile("answer.json", jsonData, 'utf8', function(err) {
		if (err) {
			console.log("Ocorreu um erro na gravação do json");
			return console.log(err);
		} 

		console.log("JSON file has been saved");
	});
	

	var jsonParsed = JSON.parse(jsonData.body);
	var cifrado = jsonData.cifrado;
	body = JSON.parse(body);
	var cifrado = body.cifrado;
	cifrado = cifrado.toLowerCase();

	var numero_casas = body.numero_casas;
	numero_casas = parseInt(numero_casas);
	

	function decifra(cifrado, casas) {
		var temp = casas;
		var alfabeto = "abcdefghijklmnopqrstuvwxyz";
		var decifrado = "";

		for (var i = 0; i < cifrado.length; i++) {
			if (!(cifrado[i] >= 'a' && cifrado <= 'z')) {
				decifrado += cifrado[i];
			} else {
				if(alfabeto.includes(cifrado[i])) {					
					if(alfabeto[alfabeto.indexOf(cifrado[i]) + casas] == undefined) {
						var contador = 0;
						do {
							contador++;
							temp--;
						} while (alfabeto[alfabeto.indexOf(cifrado[i]) + contador] != undefined);
						contador--;
						decifrado += alfabeto[contador];
					} else {
						decifrado += alfabeto[alfabeto.indexOf(cifrado[i]) + casas];
					}
				}					
			}					
		}
		return decifrado;
	}

	body.decifrado = decifra(cifrado, -body.numero_casas); //ate aqui deu certo!
	//console.log("decifrado: " + body.decifrado);
	/*
	var crypto = require('crypto');
	var hash = crypto.createHash('sha1');
	data = hash.update('nodejsera', 'utf-8');
	gen_hash = data.digest('hex');
	console.log("hash: " + gen_hash);

	body.resumo_criptografico = gen_hash;

	//console.log("resumo: " + body.resumo_criptografico);
	*/
	sha1 = require('js-sha1');
	
	

	body.resumo_criptografico = sha1(body.decifrado);
	console.log("decipher: " + body.resumo_criptografico);


	body = JSON.stringify(body);
	console.log(body);


});


/*
console.log(request);
	
var request = require('request');
request('https://api.openweathermap.org/data/2.5/weather?q=Contagem&APPID=0386ad8e4c917c30fe0c84da7b65117f', function(error, response, body) {
	if (error) console.log('error: ', error); //imprime o erro caso ocorrer
	console.log('statusCode: ', response && response.statusCode); //imprime o status code da resposta
	//console.log('body: ', body); //imprime a página

	var parsedWeather = JSON.parse(body);
	console.log("A temperatura atual em Contagem é " + parsedWeather['main']['temp']);//print the temp

});
*/