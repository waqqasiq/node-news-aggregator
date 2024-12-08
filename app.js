const dotenv = require('dotenv');
dotenv.config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var articleRouter = require('./routes/article');

const swaggerDocument = require('./swagger_output.json');

const cors = require('cors');

var app = express();

(async () => {
    try {
      // Sync database
      await sequelize.sync({ alter: true });
      console.log('Database synced successfully!');
    } catch (error) {
      console.error('Error syncing database:', error);
      process.exit(1); // Exit if database initialization fails
    }
  })();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.disable('x-powered-by'); // avoid attacks specific to express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers required
  credentials: true,
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter);
app.use('/api/article', articleRouter);

// Scheduler: Add this line after routes and middleware setup
require('./scheduler');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
