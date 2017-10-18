var functions = require('firebase-functions');
var cors = require('cors');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.article = functions.https.onRequest(function(request, response){
    const params = request.url.split('/');

    const user = params[1];
    const article = params[2];
    
    return admin.database().ref('articles/' + user + '/' + article)
            .once('value', function(snapshot) {
                response.send(snapshot.val().title);
            });
});