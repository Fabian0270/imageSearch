const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const app = express();
const PORT = 5172;
const router = express.Router();
var path = require('path');
const cors = require('cors');
 
var favoriteRouter = require('./routes/favorite')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/favorite', favoriteRouter) 


// Endpoint to get favorite images for a user
app.get('/favorite/:user', (req, res) => {
  const { user } = req.params;

  // Read data from JSON file
  const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

  // Find user in data
  const userData = data.find(entry => entry.user === user);

  if (!userData) {
    return res.status(404).send('User not found.');
  }

  res.status(200).json(userData.favoriteImages);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = router;