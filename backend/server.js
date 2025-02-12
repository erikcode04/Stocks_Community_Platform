const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const graphsRoutes = require('./routes/graphRoutes');
const { connectDB, client } = require('./config/db'); 
const cookieParser = require('cookie-parser');


const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use("/users", usersRoutes);
app.use("/graph", graphsRoutes);

connectDB();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});




app.post('/test', async (req, res) => {
  console.log(req.body);
});


app.get('/data', async (req, res) => {
  try {
    const collection = client.db('your_database_name').collection('your_collection_name');
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});