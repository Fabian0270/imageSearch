var express = require('express')
var router = express.Router()
var path = require('path');
const Joi = require('joi');
const fs = require('fs');

// Endpoint to save favorite image
router.post('/', function(req, res)  {
    try {
        const dataToSave = req.body;
        const userData = req.body.user;
        const imageData = req.body.favoriteImage;

        // Ange sökvägen till JSON-filen
        const filePath = './data.json';

        // Läsa befintlig data från JSON-filen
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading JSON file:', err);
                return res.status(500).send('Internal server error');
            }

            try {
                const existingData = JSON.parse(data);

                let userExists = false;
   
                for (const user of existingData.favourites) {
                    console.log('user', user.user);
                    if (user.user.sub === userData.sub) {
                        user.favoriteImages.push(imageData);
                        userExists = true;
                        break; 
                    }
                } 

                if (!userExists) {
                    existingData.favourites.push({
                        user: userData,
                        favoriteImages: [imageData]
                    });
                }

                const updatedJsonData = JSON.stringify(existingData);

                fs.writeFile(filePath, updatedJsonData, (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing to JSON file:', writeErr);
                        return res.status(500).send('Internal server error');
                    }
                    console.log('Data saved successfully.');
                    res.status(200).send('Data saved successfully.');
                });
            } catch (parseError) {
                console.error('Error parsing JSON data:', parseError);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/:userId', function(req, res) {
    try {
        const userId = req.params.userId;
        console.log('sub: ', userId);
        const filePath = './data.json';
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading data file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            try {
                const jsonData = JSON.parse(data);
                console.log('jsondata: ', jsonData);
                let images = []
   
                for (const user of jsonData.favourites) {
                    console.log('user', user);
                    if (user.user.sub === userId) {
                        console.log('user favorites: ', user.favoriteImages);
                        images = user.favoriteImages
                        break; 
                    }
                } 

                // Här kan du använda userId för att få relevant data från json-objektet
                //const user = jsonData.user[userId];
                res.status(200).json({favorite_images: images});
            } catch (parseError) {   
                console.error('Error parsing JSON data:', parseError);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  })
  
  module.exports = router;