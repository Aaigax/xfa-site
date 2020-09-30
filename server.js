// =============================================================================
// IMPORT DEPENDENCIES:
// =============================================================================
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');
const path = require('path');

// =============================================================================
// CONFIGURATION CONNECTION:
// =============================================================================

require('./config/passport')(passport); // pass passport for configuration

// =============================================================================
// SETUP EXPRESS:
// =============================================================================

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
   extended: false
})); /* parse incoming params. req. to req.body */
app.use(bodyParser.json());
app.use(fileUpload());

// =============================================================================
// SETUP EJS. TEMPLATES
// =============================================================================

app.set('view engine', 'ejs'); // set up ejs for templating

// =============================================================================
// INITIALIZE EXPRESS-SESSION:
// =============================================================================

/* exp.sess will allow us to track the logged-in user across sessions */
app.use(session({
   secret: 'xfa5family3016zone!',
   resave: false,
   saveUninitialized: false,
   cookie: {
      expires: 600000
   }
})); // session secret

// =============================================================================
// INITIALIZE PASSPORT:
// =============================================================================

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(methodOverride('_method'))

app.use(function (req, res, next) {
   res.locals.user = req.user;
   next();
})

// =============================================================================
// SERVER STATIC FILES:
// =============================================================================

app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/about.html'));
});

app.get('/journey/adventure', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/journey/adventure.html'));
});

app.get('/journey/education', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/journey/education.html'));
});

app.get('/journey/entertainment', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/journey/entertainment.html'));
});

app.get('/blog/parenting', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/blog/parenting/parenting.html'));
});

app.get('/contact', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/contact.html'));
});

app.get('/projects', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/projects.html'));
});


// Blog Pages:

app.get('/blog/parenting/family-routines', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/blog/parenting/family-routines.html'));
});

app.get('/blog/parenting/happy-family', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/blog/parenting/happy-family.html'));
});

app.get('/blog/parenting/alternative-games', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/blog/parenting/alternative-games.html'));
});

app.get('/blog/parenting/positive-parenting', function (req, res) {
   res.sendFile(path.join(__dirname + '/html/blog/parenting/positive-parenting.html'));
});

// =============================================================================
// EXT. ROUTES
// =============================================================================

require('./routes/route')(app, passport);

// =============================================================================
// SETUP PORT:
// =============================================================================

const port = process.env.PORT || 3306;
app.listen(port, () => {
   console.log('Port is running on: ' + port);
});