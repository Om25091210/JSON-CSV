const express = require('express');
const json2csv = require('json2csv').parse;
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/convert', (req, res) => {
  const data = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Jane', age: 25, city: 'London' },
    { name: 'Bob', age: 35, city: 'Paris' }
  ];

  const csvData = json2csv(data);

//   res.header('Content-Type', 'text/csv');
//   res.attachment('data.csv');
//   res.send(csvData);

  const filePath = 'data.csv';
  
  //Or save as a file
  fs.writeFile(`public/${filePath}`, csvData, (err) => {
    if (err) {
      console.error('Error saving CSV file:', err);
      res.status(500).send('Error generating CSV file');
    } else {
      const downloadLink = `${req.protocol}://${req.get('host')}/${filePath}`;
      res.send(`Download your CSV file: <a href="${downloadLink}">Download CSV</a>`);
    }
  });

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
