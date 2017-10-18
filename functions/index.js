var functions = require('firebase-functions');
var cors = require('cors')({ origin: true });
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.article = functions.https.onRequest(function(request, response){
    const params = request.url.split('/');

    const user = params[1];
    const article = params[2];

    return cors(request, response, function() {
        return admin.database().ref('articles/' + user + '/' + article)
            .once('value', function(snapshot) {
                response.status(200).json({
                    title: snapshot.val().title,
                    description: snapshot.val().description,
                    text: snapshot.val().text
                });
            });
    });
});