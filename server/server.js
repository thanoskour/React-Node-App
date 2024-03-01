const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;
const cors = require('cors');


app.use(cors());

app.get('/houses', async (req, res) => {
  try {
    const response = await axios.get('https://wizard-world-api.herokuapp.com/houses');
    const houses = response.data; // The data is available directly as response.data

    // Apply your filtering logic here
    const { name } = req.query;
    
    const filteredHouses = name 
      ? houses.filter(house => house.name.toLowerCase().includes(name.toLowerCase()))
      : houses;

    res.json(filteredHouses); // Send the filtered data back as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
