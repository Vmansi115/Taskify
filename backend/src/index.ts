const dotenv = require('dotenv');
const { app } = require('./app');
const connectDB = require('./lib/connectDB');

dotenv.config();

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    if (process.env.MONGO_URL) {
      await connectDB(process.env.MONGO_URL);
      app.listen(port, () =>
        console.log(
           `Server is running at http://localhost:${port}`
        )
      );
    }


  } catch (error) {
    console.log(error);
  }
};
start();
