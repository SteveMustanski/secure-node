import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = 3000;

// config for helmet
app.use(helmet());

// set up for rate limit

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // equals 15 minutes
  max: 100, // limits the number of requests from a single IP to 100
  delayMs: 0 // turn off delays

})

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb');

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`your server is running on port ${PORT}`)
);