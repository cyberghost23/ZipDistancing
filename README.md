# ZipDistancing
# Author: Walid Sharaiyra

# About:
This is Zip-Distancing API. I created this API using node.js and JavaScript.
It`s used to return the distance between a given Zip Code and a list of pre-stored Zip Codes located in the USA.
And returns the closest place with the corresponding Zip Code using HTTP GET Request.
Using a mathematical ecuation to calculate distances, given longitude and latitude of each zip code.

you can find the equation below in the (calculate) function.

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

I created this as a task for a small business.



Hope you like it!
