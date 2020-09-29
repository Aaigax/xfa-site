module.exports = function (app, passport) {

  const connection = require('../config/connection');

  // SELECT:

  app.get('/api/adventure', notLoggedIn, function (req, res) {

    var select = 'SELECT adventure_id, category, place, address, state, country, folder_name, image_name' + ' ';
    var from = 'FROM tbl_adventure' + ' ';
    var innerJoin = 'INNER JOIN tbl_images ON adventure_fk_id = adventure_id' + ' ';
    var groupBy = 'GROUP BY adventure_id';

    var excQuery = select + from + innerJoin + groupBy;
    connection.query(excQuery, function (err, rows) {

      if (!err) {

        res.send(rows);

        console.log('LOADED | adventure data');

      } else {

        console.log(err);

      };

    })

  });

  app.get('/api/entertainment', notLoggedIn, function (req, res) {

    var select = 'SELECT entertmt_id, category, topic, title, genre, org_artist, covered_by, img_path, video_link' + ' ';
    var from = 'FROM tbl_entertainment';

    var excQuery = select + from;
    connection.query(excQuery, function (err, rows) {

      if (!err) {

        res.send(rows);

        console.log('LOADED | adventure data');

      } else {

        console.log(err);

      };

    })

  });

  app.get('/api/science', notLoggedIn, function (req, res) {

    var select = 'SELECT sci_id, category, topic, title, img_path, video_link' + ' ';
    var from = 'FROM tbl_edu_science';

    var excQuery = select + from;
    connection.query(excQuery, function (err, rows) {

      if (!err) {

        res.send(rows);

        console.log('LOADED | science data');

      } else {

        console.log(err);

      };

    })

  });

  app.get('/api/technology', notLoggedIn, function (req, res) {

    var select = 'SELECT tech_id, category, topic, title, technology, prepared_by, img_path, video_link' + ' ';
    var from = 'FROM tbl_edu_technology';

    var excQuery = select + from;
    connection.query(excQuery, function (err, rows) {

      if (!err) {

        res.send(rows);

        console.log('LOADED | technology data');

      } else {

        console.log(err);

      };

    })

  });

  app.get('/api/books', notLoggedIn, function (req, res) {

    var select = 'SELECT book_id, category, genre, title, author, type, read_by, img_path, video_link' + ' ';
    var from = 'FROM tbl_edu_books';

    var excQuery = select + from;
    connection.query(excQuery, function (err, rows) {

      if (!err) {

        res.send(rows);

        console.log('LOADED | books data');

      } else {

        console.log(err);

      };

    })

  });

  app.get('/api/projects', notLoggedIn, function (req, res) {

    var select = 'SELECT project_id, project_type, project_name, project_img_path, leader_name, leader_img_path, progress, description' + ' ';
    var from = 'FROM tbl_projects';

    var excQuery = select + from;
    connection.query(excQuery, function (err, rows) {

      if (!err) {

        res.send(rows);

        console.log('LOADED | books data');

      } else {

        console.log(err);

      };

      connection.end();

    })

  });

  app.get('/api/quizes', notLoggedIn, function (req, res) {

    var d = new Date();
    var date = d.getDate()
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var currentDate = year + '-' + month + '-' + date;

    console.log(currentDate);

    var select = 'SELECT quiz_id, category, question, option_1, option_2, option_3, option_4, correct_answer, DATE_FORMAT(scheduled_date, "%Y-%m-%d") AS scheduled_date' + ' ';
    var from = 'FROM tbl_quizes' + ' ';
    var where = 'WHERE scheduled_date = ?';

    var excQuery = select + from + where;
    connection.query(excQuery, [currentDate], function (err, rows) {

      if (!err) {

        res.send(rows);

        console.log('LOADED | quizes data' + currentDate);

      } else {

        console.log(err);

      };

    })

  });

}

var advID;

function get_photo_gallery() {

  app.get('/api/adventure/photo-gallery', notLoggedIn, function (req, res) {

    var select = 'SELECT adventure_fk_id, category, country, state, folder_name, image_name' + ' ';
    var from = 'FROM tbl_images' + ' ';
    var innerJoin = 'INNER JOIN tbl_adventure ON adventure_id = adventure_fk_id' + ' ';
    var where = 'WHERE adventure_fk_id = ?';

    var excQuery = select + from + innerJoin + where;
    connection.query(excQuery, [advID], function (err, rows) {

      if (!err) {

        res.send(rows);

      } else {

        console.log(err);

      };

    })

  });

};

// POST:

app.post('/api/adventure/image-id', notLoggedIn, function (req, res) {

  var adventure_id = req.body;

  for (var i = 0; i < adventure_id.length; i++) {

    advID = Number(adventure_id[i].id);

    // ---------------------------------

    setTimeout(() => {

      get_photo_gallery();

    }, 200);

  }

});

app.post('/api/quiz/correct-ans-counter', notLoggedIn, function (req, res) {

  var correctAnsCounterArr = req.body;

  for (var i = 0; i < correctAnsCounterArr.length; i++) {

    var quizID = correctAnsCounterArr[i].quiz_id;

    var update = 'UPDATE tbl_quizes' + ' ';
    var set = 'SET correct_ans_counter = correct_ans_counter + 1' + ' ';
    var where = 'WHERE quiz_id = ?';

    const excQuery = update + set + where;
    connection.query(excQuery, [quizID], function (err) {

      if (!err) {

        console.log('UPDATED | correct ans counter id: ' + quizID);

        return false;

      } else {

        console.log(err)

      };

    })


  }

});

app.post('/api/quiz/wrong-ans-counter', notLoggedIn, function (req, res) {

  var wrongAnsCounterArr = req.body;

  console.log(wrongAnsCounterArr);

  for (var i = 0; i < wrongAnsCounterArr.length; i++) {

    var quizID = Number(wrongAnsCounterArr[0].quiz_id);

    var update = 'UPDATE tbl_quizes' + ' ';
    var set = 'SET wrong_ans_counter = wrong_ans_counter + 1' + ' ';
    var where = 'WHERE quiz_id = ?';

    const excQuery = update + set + where;
    connection.query(excQuery, [quizID],

      function (err) {
        if (!err) {

          console.log('UPDATED | wrong ans counter id: ' + quizID);

          return false;

        } else {

          console.log(err)

        }

      })

    connection.end();

  }

});


// =====================================
// ROUTE MIDDLEWARE:
// =====================================

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated())
    return next();

  res.redirect('/');

};

function notLoggedIn(req, res, next) {

  if (req.isAuthenticated()) {

    return res.redirect('/');

  }

  next();
};