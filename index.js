const app = require('express')();
const PORT = process.env.PORT || 5000;

const zipCodes = [];
const longitude = [];
const latitude = [];
const lngth = 33788;
const locations = [75080, 75104, 75237, 75236, 75154, 76028, 75032, 75115, 75206, 75043, 76132, 75137, 76084, 75092, 75021, 75569, 75460, 75189];
const locLONGs = [-96.7416, -96.96712, -96.87238, -96.93455, -96.80885, -97.30491, -96.42858, -96.86433, -96.77032, -96.57986, -97.41827, -96.91224, -97.0888, -96.70011, -96.47552, -94.12292, -95.60296, -96.30941];
const locLATs = [32.97382, 32.58295, 32.66489, 32.6866, 32.52319, 32.52603, 32.85756, 32.59831, 32.83161, 32.8571, 32.66743, 32.63421, 32.43258, 33.64869, 33.72686, 33.44127, 33.6627, 32.94821];
var distances = [];
var shortest;
getData();

function getData(){
	
    const fs = require('fs');
    const papa = require('papaparse');
    const file = fs.createReadStream('uszips.csv');

	papa.parse(file, {
		header: true,
		skipEmptyLines: true,
		complete: function(results) {
			// console.log("Finished:", results);
			for (let i = 0; i < lngth; i++){
				zipCodes.push(results.data[i].zip);
				longitude.push(results.data[i].lng);
				latitude.push(results.data[i].lat);
			}
		}
	});
}

app.listen(
    PORT,
    () => {console.log('Starting server at ${PORT}');
});

app.get('/zipcode/:zip', (req, res) => {
    var { zip } = req.params;
    var code = zip;
    var out = dis(parseInt(code));
    res.send({
        location: out,
        distance: parseInt(shortest) + "Km"
    });

});

// app.post('/zipcode/:zip', (req, res) => {
//     var { zip } = req.params;
//     var code = zip;
//     var out = dis(parseInt(code));
//     res.send({
//         location: out,
//         distance: parseInt(shortest) + "Km"
//     });
// });

function dis(zip){
    distances = [];
	// var zip = document.getElementById("zip").value;
	var lon1, lon2, lat1, lat2;
	for (let i=0;i<lngth;i++){
		if (zip == zipCodes[i]){
			lon1 = longitude[i];
			lat1 = latitude[i];
			break;
		}
	}
    console.log(lon1 +" "+ lat1);

	var  closest;
	for (let i=0;i<locations.length;i++){
		lon2 = locLONGs[i];
		lat2 = locLATs[i];

		distances.push(calculate(lon1, lon2, lat1, lat2));
		if (i == 0){
			shortest = distances[i];
			closest = locations[i];
		}
		else if (i > 0){
			if (distances[i] < shortest){
				shortest = distances[i];
				closest = locations[i];
			}
		}
		console.log("Dist between " + zip + " and " + locations[i] + " : " + distances[i]);
        console.log(lon2 + " " + lat2);
	}
	console.log(closest + " is the closest location at distance of " + shortest);
    return closest;
}

function calculate(lon1, lon2, lat1, lat2){
	lon1 =  lon1 * Math.PI / 180;
	lon2 = lon2 * Math.PI / 180;
	lat1 = lat1 * Math.PI / 180;
	lat2 = lat2 * Math.PI / 180;
	let dlon = lon2 - lon1;
	let dlat = lat2 - lat1;
	let a = Math.pow(Math.sin(dlat / 2), 2)
				+ Math.cos(lat1) * Math.cos(lat2)
				* Math.pow(Math.sin(dlon / 2),2);
		
	let c = 2 * Math.asin(Math.sqrt(a));
	let r = 6371;

	return (c * r);
}