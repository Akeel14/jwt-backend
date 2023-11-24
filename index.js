import express from 'express';
import { connectToMongo } from './src/config/mongoose.js';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from "cors";
import routes from './src/routes/index.js';
import HttpError from './src/models/http-error.js';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

app.use('/api', routes);

// this middleware will be reached when no response from the previous one
app.use(() => {
  throw new HttpError('Could not find this route.', 404);
});

// catch error from the previous middlewares
app.use((error, req, res, next) => {
  // skip if error has sent in response already
  if (res.headersSent) {
    return next(error);
  }
  // response catched error
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknow error occurred!' });
});

try {
  // make sure mongoDB is connected before starting server
  await connectToMongo();
  app.listen(8080, () => {
    console.log('The server is running on 8080');
  });
} catch (err) {
  console.log(err);
}
