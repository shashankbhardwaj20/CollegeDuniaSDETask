const express = require('express');
const app = express();
const path =  require('path');
const port = 3000;
const colleges = require('./public/dummy.js');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/colleges', (req, res) => {
    const { sort, order, search } = req.query;
    let filteredColleges = [...colleges];

    if (search) {
      filteredColleges = filteredColleges.filter(college => 
        college.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort && order) {
      filteredColleges.sort((a, b) => {
        if (order === 'asc') {
          return a[sort] - b[sort];
        } else {
          return b[sort] - a[sort];
        }
      });
    }
  
    res.json(filteredColleges);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});