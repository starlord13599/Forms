var express = require('express');
var app = express();

var request = require('request');

app.use(express.static('public'));

app.set('view engine', 'ejs');

var BodyParser = require('body-parser');
app.use(
	BodyParser.urlencoded({
		extended: true
	})
);

//==========================
//SERVER SETUP
//==========================

app.listen(3000, function() {
	console.log('Server has started');
});

//=======================
//ROUTES
//======================
var friends = [ 'Tony', 'Steve', 'Thor', 'Clint', 'Nat' ];

app.get('/friends', function(req, res) {
	res.render('friends', {
		friends: friends
	});
});

app.get('/', function(req, res) {
	res.render('home');
});

app.post('/addfriends', function(req, res) {
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect('/friends');
});

app.get('/results', function(req, res) {
	var query = req.query.search;
	var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';

	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var result = JSON.parse(body);
			res.render('movies', {
				result: result
			});
		}
	});
});

app.get('/search', function(req, res) {
	res.render('search');
});
