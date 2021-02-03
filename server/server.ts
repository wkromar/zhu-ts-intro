const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app: any = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT: string | number = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, (): void => {
  console.log(`Listening on port: ${PORT}`);
});
