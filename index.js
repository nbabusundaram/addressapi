var restify = require('restify');
var port = 7000;

server = restify.createServer(
{
name : 'Address API Server'
}
);


var mongoose = require('mongoose');

mongoose.connect('mongodb://tesco:tesco@ds052827.mongolab.com:52827/multivision');


var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;


var Address = new Schema({
    id: ObjectId,
    isActive: String,
    picture: String,
    age: String,
    eyeColor: String,
    fullname: String,
    gender: String,
    company: String,
    email: String,
    phone: String,
    street1: String,
    buildingname: String,
    buildingno: String,
    town: String,
    city: String,
    postcode: String,
    registered: Date,
    latitude: String,
    longitude: String,
    favoriteFruit: String
});


var AddressModel = mongoose.model('address', Address);



server.get('/', function(req,res,next)
{
res.send('Address API Server running Successfully');

});

server.get('/address', function(req,res,next)
{
res.send('Address API Server running Successfully');

});


server.get('/address/:postcode/:limit', function(req,res,next)
{

if(req.params.limit=='undefined')
{

	req.params.limit=10;
}

AddressModel
.find({"postcode":req.params.postcode})
.sort({'registered': -1})
.limit(req.params.limit)
.exec(function(err, posts) {
res.send(posts);
});



});


server.get('/address/:postcode', function(req,res,next)
{


AddressModel
.find({"postcode":req.params.postcode})
.sort({'registered': -1})
.limit(10)
.exec(function(err, posts) {
res.send(posts);
});



});

function getPostalcode()
{
var PostCodes = ["ASCN 1ZZ","STHL 1ZZ","TDCU 1ZZ","BBND 1ZZ", "WC2A 1QT", "WC2A 1QU", "WC2A 1RP", "WC2A 1PQ", "WC1V 7PB", "EC4Y 9AR"];



postcode=PostCodes[Math.floor((Math.random() * 10))] ;

return postcode;

}

function getLat()
{
var Coordinates = ["100.293","423.567","112.567","345.778", "846.898", "124.678", "148.908", "123.678", "456.346", "123.125"];

coordinate=Coordinates[Math.floor((Math.random() * 10))] ;
return coordinate;

}

function getLag()
{
var Coordinates = ["100.293","423.567","112.567","345.778", "846.898", "124.678", "148.908", "123.678", "456.346", "123.125"];

coordinate=Coordinates[Math.floor((Math.random() * 10))] ;
return coordinate;
}


function getFirstName()
{
var FirstNames = ["Shiley","Safeer","Micheal","Warne", "Willsmith", "Shankar", "Nithya", "Atanu", "Shane", "Campell"];

firstname=FirstNames[Math.floor((Math.random() * 10)) ] ;
return firstname;

}
function getLastName()
{
var LastNames = ["Smith","Benny","Mark","Tommy", "Alexander", "Kamal", "Roshan", "Peter", "Kumar", "Babu"];

lastname=LastNames[Math.floor((Math.random() * 10))] ;
return lastname;

}

function getCity()
{
var Cities = ["ASCN 1ZZ","STHL 1ZZ","TDCU 1ZZ","BBND 1ZZ", "WC2A 1QT", "WC2A 1QU", "WC2A 1RP", "WC2A 1PQ", "WC1V 7PB", "EC4Y 9AR"];

city=Cities[Math.floor((Math.random() * 10)) ] ;
return city;

}
function getStreet()
{
var Streets = ["533 Montgomery Place, Biehle, Louisiana, 9197","49 Featherstone Street","44 Simon Street","A 29 Kingdome Vallace", "34 India Gateway"];

street=Streets[Math.floor((Math.random() * 5)) ] ;
return street;

}
function getGender()
{
var genders = ["Male","Female"];

gender=genders[Math.floor((Math.random() * 2)) ] ;


return gender;

}




server.listen(port, function()
{
console.log('address server started on port ' + port);
}
);


