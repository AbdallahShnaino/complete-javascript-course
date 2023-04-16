const fs = require('fs');

function reqHandler(req, res) {
  if (req.url === '/message' && req.method == 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBuddy = JSON.parse(Buffer.concat(body).toString());
      fs.writeFile('messages.txt', parsedBuddy['message'], (err) => {
        if (!err) {
          res.setHeader('Content-Type', 'text/html');
          res.write('message saved');
          /* 
         res.statusCode = 200;
         res.setHeader('location', '/');
     */
          return res.end();
        }
      });
    });
  }

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>');
    res.write('Wellcome to home web page');
    res.write('</h1>');
    return res.end();
  }

  if (req.url === '/user') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>');
    res.write('Wellcome to user web page');
    res.write('</h1>');
    return res.end();
  }
}
module.exports = { reqHandler };
