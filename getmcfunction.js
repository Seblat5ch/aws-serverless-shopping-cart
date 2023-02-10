const https = require('https');

exports.handler = async (event) => {
    let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get("https://api.mindfulchef.com/recipes/recipes", function(res) {
          res.on('data', chunk => {
            dataString += chunk;
			console.log(JSON.stringify(JSON.parse(dataString)));
          });
          res.on('end', () => {
            resolve({
                statusCode: 200,
                body: JSON.stringify(JSON.parse(dataString), null, 4)

				
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
    return response;
};