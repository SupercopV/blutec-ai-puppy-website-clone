const http = require('http');

http.get('http://localhost:3000/', (res) => {
  console.log('Dev server status:', res.statusCode);
  res.on('data', () => {});
  res.on('end', () => console.log('Response ended successfully.'));
}).on('error', (err) => {
  console.error('Dev server connection error:', err.message);
});
