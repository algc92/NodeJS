require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const SECRET = process.env.SECRET;

app.post('/preguntar', async (req, res) => {
  const { pregunta } = req.body;

  try {
    const respuesta = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: pregunta }],
    }, {
      headers: {
        'Authorization': `Bearer TU_API_KEY`,
        'Content-Type': 'application/json',
      }
    });

    res.json({ respuesta: respuesta.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Error al comunicarse con ChatGPT' });
  }
});

app.listen(3000, () => {
  console.log('API corriendo en http://localhost:3000');
});
