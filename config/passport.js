   // ===================================================
   // IMPORT REQUIRE LIBRARIES:
   // ===================================================

   const LocalStrategy = require('passport-local').Strategy;

   // load up the user model
   const bcrypt = require('bcrypt-nodejs');
   const connection = require('../config/connection');
   const express = require("express");
   const bodyParser = require('body-parser');
   const app = express();

   app.use(bodyParser.urlencoded({
      extended: false
   }));
   app.use(bodyParser.json());

   // expose this function to our app using module.exports
   module.exports = function (passport) {

      // ===================================================
      // PASSPORT SESSION SETUP:
      // ===================================================

      /* required for persistent login sessions */
      /* passport needs ability to serialize and unserialize users out of session */

      /* used to serialize the user for the session */
      passport.serializeUser(function (user, done) {
         done(null, user.user_id);
      });

      // used to deserialize the user
      passport.deserializeUser(function (user_id, done) {
         connection.query("SELECT * FROM tbl_q_users WHERE user_id = ? ", [user_id], function (err, rows) {
            done(err, rows[0]);
         });
      });

      // =========================================================================
      // LOCAL SIGNUP:
      // =========================================================================

      /* we are using named strategies since we have one for login and one for signup */
      /* by default, if there was no name, it would just be called 'local' */

      passport.use(
         'local-signup',
         new LocalStrategy({

               /* by default, local strategy uses username and password, we will override with email */

               emailField: 'email',
               passwordField: 'password',
               passReqToCallback: true // allows us to pass back the entire request to the callback
            },

            function (req, email, password, done) {

               /* find a user whose email is the same as the forms email */
               /* we are checking to see if the user trying to login already exists */

               connection.query("SELECT * FROM tbl_q_users WHERE email = ?", [email], function (err, rows) {
                  if (err)
                     return done(err);
                  if (rows.length) {
                     return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                  } else {

                     /* if there is no user with that email */
                     /* create a new user */

                     // ========== INSERT NEW USER ==============

                     var currentDate = new Date();
                     var userInfo = req.body;
                     var userArray = [];
                     values = userArray;

                     values.push([
                        userInfo.id,
                        userInfo.firstName,
                        userInfo.lastName,
                        userInfo.email,
                        bcrypt.hashSync(userInfo.password, null, null),
                        userInfo.country,
                        userInfo.birthday,
                        userInfo.gender,
                        currentDate,
                        currentDate
                     ]);

                     var insertSQL = 'INSERT INTO tbl_q_users' + ' ';
                     var colSQL = '(user_id, first_name, last_name, email, password, country, date_of_birth, gender, date_created, last_updated)' + ' ';
                     var valSQL = 'VALUES ?';

                     var excQuery = insertSQL + colSQL + valSQL;
                     connection.query(excQuery, [values], function (err, rows) {
                        values.user_id = rows.insertId;

                        if (!err) {

                           // ========== INSERT NEW USER POINTS ==============

                           var pointsArray = [];
                           values2 = pointsArray;

                           values2.push(
                              [pointsId = 0,
                                 points = 0,
                                 currentDate,
                                 currentDate,
                                 userId = rows.insertId,
                              ]);

                           var insSql2 = 'INSERT INTO tbl_q_user_points' + ' ';
                           var colSql2 = '(points_id, points, pts_date_created, pts_last_updated, points_fk_user_id)' + ' '
                           var valSql2 = 'VALUES ?';

                           const excQuery2 = insSql2 + colSql2 + valSql2;
                           connection.query(excQuery2, [values2], function (err) {
                              if (err) {
                                 return;
                              }
                           });

                        }

                        return done(null, values);

                     });
                  }
               });
            })
      );

      // =========================================================================
      // LOCAL LOGIN =============================================================
      // =========================================================================
      // we are using named strategies since we have one for login and one for signup
      // by default, if there was no name, it would just be called 'local'

      passport.use(
         'local-login',
         new LocalStrategy({

               /* by default, local strategy uses username and password, we will override with email */
               emailField: 'email',
               passwordField: 'password',
               passReqToCallback: true // allows us to pass back the entire request to the callback
            },

            function (req, email, password, done) { // callback with email and password from our form
               connection.query("SELECT * FROM tbl_q_users WHERE email = ?", [email], function (err, rows) {
                  if (err)
                     return done(err);
                  if (!rows.length) {
                     return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                  }

                  // if the user is found but the password is wrong
                  if (!bcrypt.compareSync(password, rows[0].password))
                     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                  // all is well, return successful user
                  return done(null, rows[0]);
               });

            })
      );
   };