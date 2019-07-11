var Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: 'ms2o7JGsa83kszn2i9SWgC9jySvpxH3F',
    clientSecret: 'IPOV2zCofJsAkuLg'
});

amadeus.referenceData.urls.checkinLinks.get({
    airlineCode: 'BA'
}).then(function (response) {
    console.log(response.data[0].href);
}).catch(function (responseError) {
    console.log(responseError.code);
});