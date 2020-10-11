// // const http = require('http');
// // const app = http.createServer(function(req, res){
// //     res.end(JSON.stringify({
// //         time:1
// //     }, null, 3));
// // });

// const express = require('express');
// const app = express();

// app.get('/time', (req, res) => {
//     // var data = [{'time': '12:00'}];

//     res.send("heyheyhey");
// })

// const port = process.env.port || 3000;
// app.listen(port, () => {
//     console.log("connection succeed");
// });


const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

const server = http.createServer((req, res) => {

  req.on('error', err => {
      console.error(err);
      // Handle error...
      res.statusCode = 400;
      res.end('400: Bad Request');
      return;
  });

  res.on('error', err => {
      console.error(err);
      // Handle error...
  });

  fs.readFile('./public' + req.url, (err, data) => {
      if (err) {
          if (req.url === '/time' && req.method === 'GET') {
              let date = new Date();
              res.end(date.toString());
          } else if (req.url === '/tcs' && req.method === 'GET') {
              res.end('HI RCSer');
          } else {
              res.statusCode = 404;
              res.end('404: File Not Found');
          }
      } else {
          // NOTE: The file name could be parsed to determine the
          // appropriate data type to return. This is just a quick
          // example.
          res.setHeader('Content-Type', 'application/octet-stream');
          res.end(data);
      }
  });

});

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
