$(document).ready(function () {

  $('#show-header-template').load('../../templates/header/header.html')
  $('#show-footer-template').load('../../templates/footer/footer.html');

  $('.show-video-slide-template').load("../../templates/slideshow/video-slide.html");

});

var videoIcon = '<i class="fa fa-play-circle"></i>';
var lockIcon = '<i class="fa fa-lock"></i>';

const closeModalBtn = document.getElementsByClassName('modal-close-btn')[0].onclick = close_modal;

function close_modal() {

  var stopVideo = document.getElementsByTagName('iframe').src = '';
  var clearLastPlayedVideo = document.getElementsByClassName('video-wrapper')[0].innerHTML = '';
  var closeModal = document.getElementsByClassName('modal-backdrop-con')[0].style.display = 'none';

};

function show_modal_backdrop() {

  var show_modalBackdrop = document.getElementsByClassName("modal-backdrop-con")[0];
  show_modalBackdrop.style.display = "block";

};

// ================= Science ====================================

var clone_scienceArray;

call_scienceJSON_API();
init_coverflow_swiper();

function call_scienceJSON_API() {

  $.get('/api/science', function (dbData) {

    clone_scienceArray = [].concat(dbData);

    create_sci_unique_topics_arr();
    populate_sci_topics_list();


    console.log('clone_scienceArray', clone_scienceArray)

  })

};

function init_coverflow_swiper() {

  swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    observer: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 20,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

};

function populate_sci_img_slider(topic) {

  var sci_swiper_con = document.getElementById('sci-swiper-container');
  var sci_video_wrapper = document.getElementById('sci-swiper-wrapper-con');

  for (var x = 0; x < clone_scienceArray.length; x++) {

    if (topic === clone_scienceArray[x].topic) {

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var imgSrc = document.createElement('img');
      imgSrc.src = clone_scienceArray[x].img_path;
      imgCon.appendChild(imgSrc);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var title = document.createElement('h4');
      title.innerHTML = clone_scienceArray[x].title;
      cardInfo.appendChild(title);

      var subject = document.createElement('p');
      subject.innerHTML = clone_scienceArray[x].topic;
      cardInfo.appendChild(subject);

      var playBtn = document.createElement('a');
      playBtn.title = clone_scienceArray[x].title;
      playBtn.innerHTML = videoIcon;
      cardInfo.appendChild(playBtn);
      playBtn.onclick = function () {
        show_sci_play_video(this.title)
      }

      sci_video_wrapper.appendChild(swiperSlide);
      sci_swiper_con.appendChild(sci_video_wrapper);

    }
  }
};

function create_sci_unique_topics_arr() {

  flags = [];
  unique_sci_topics_arr = [];

  for (var i = 0; i < clone_scienceArray.length; i++) {

    if (flags[clone_scienceArray[i].topic]) continue;
    flags[clone_scienceArray[i].topic] = true;

    var obj = {
      id: clone_scienceArray[i].sci_id,
      topic: clone_scienceArray[i].topic
    }

    unique_sci_topics_arr.push(obj);

  }

  console.log('unique_sci_topics_arr', unique_sci_topics_arr)
};

function populate_sci_topics_list() {

  var topicsCon = document.getElementById('edu-sci-topics-con');
  var ulList = document.getElementById('edu-sci-topics-ul');

  for (var x = 0; x < unique_sci_topics_arr.length; x++) {

    var liItem = document.createElement('li');
    liItem.innerHTML = unique_sci_topics_arr[x].topic;
    ulList.appendChild(liItem);
    liItem.onclick = function () {

      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      document.getElementById('sci-swiper-wrapper-con').innerHTML = '';

      populate_sci_img_slider(this.innerHTML)

    }

    var select_firstItem = unique_sci_topics_arr[0].topic;

    if (unique_sci_topics_arr[x].topic === select_firstItem) {

      $(liItem).siblings().removeClass('active');
      $(liItem).addClass('active');

      populate_sci_img_slider(select_firstItem);

    }

  }

  topicsCon.appendChild(ulList);

};

function show_sci_play_video(title) {

  for (var x = 0; x < clone_scienceArray.length; x++) {

    if (title === clone_scienceArray[x].title) {

      show_modal_backdrop();

      var video_wrapper = document.getElementsByClassName('video-wrapper')[0];

      var videoSrc = document.createElement("iframe");
      videoSrc.src = clone_scienceArray[x].video_link;

      video_wrapper.appendChild(videoSrc);

    }

  }

};

// ================= Technology ====================================

var clone_technologyArray;

call_technologyJSON_API();

function call_technologyJSON_API() {

  $.get('/api/technology', function (dbData) {

    clone_technologyArray = [].concat(dbData);

    create_tech_unique_topics_arr();
    populate_tech_topics_list();

    console.log('clone_technologyArray', clone_technologyArray)

  })

};

function populate_tech_img_slider(topic) {

  var tech_swiper_con = document.getElementById('tech-swiper-container');
  var tech_video_wrapper = document.getElementById('tech-swiper-wrapper-con');

  for (var x = 0; x < clone_technologyArray.length; x++) {

    if (topic === clone_technologyArray[x].topic) {

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var imgSrc = document.createElement('img');
      imgSrc.src = clone_technologyArray[x].img_path;
      imgCon.appendChild(imgSrc);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var title = document.createElement('h4');
      title.innerHTML = clone_technologyArray[x].title;
      cardInfo.appendChild(title);

      var technology = document.createElement('p');
      technology.innerHTML = clone_technologyArray[x].technology;
      cardInfo.appendChild(technology);

      var playBtn = document.createElement('a');
      playBtn.title = clone_technologyArray[x].title;
      playBtn.innerHTML = videoIcon;;
      cardInfo.appendChild(playBtn);
      playBtn.onclick = function () {
        show_tech_play_video(this.title);
      }

      tech_video_wrapper.appendChild(swiperSlide);
      tech_swiper_con.appendChild(tech_video_wrapper);

    }
  }
};

function create_tech_unique_topics_arr() {

  flags = [];
  unique_techTopics_arr = [];

  for (var i = 0; i < clone_technologyArray.length; i++) {

    if (flags[clone_technologyArray[i].topic]) continue;
    flags[clone_technologyArray[i].topic] = true;

    var obj = {

      id: clone_technologyArray[i].id,
      topic: clone_technologyArray[i].topic
    }

    unique_techTopics_arr.push(obj);

  }

};

function populate_tech_topics_list() {

  var topicsCon = document.getElementById('edu-tech-topics-con');
  var ulList = document.getElementById('edu-tech-topics-ul');

  for (var x = 0; x < unique_techTopics_arr.length; x++) {

    var liItem = document.createElement('li');
    liItem.innerHTML = unique_techTopics_arr[x].topic;
    ulList.appendChild(liItem);
    liItem.onclick = function () {

      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      document.getElementById('tech-swiper-wrapper-con').innerHTML = '';

      populate_tech_img_slider(this.innerHTML)

    }

    var select_firstItem = unique_techTopics_arr[0].topic;

    if (unique_techTopics_arr[x].topic === select_firstItem) {
      $(liItem).siblings().removeClass('active');
      $(liItem).addClass('active');

      populate_tech_img_slider(select_firstItem);

    }

  }

  topicsCon.appendChild(ulList);

};

function show_tech_play_video(title) {

  for (var x = 0; x < clone_technologyArray.length; x++) {

    if (title === clone_technologyArray[x].title) {

      show_modal_backdrop();

      var video_wrapper = document.getElementsByClassName('video-wrapper')[0];

      var videoSrc = document.createElement("iframe");
      videoSrc.src = clone_technologyArray[x].video_link;

      video_wrapper.appendChild(videoSrc);

    }

  }
};

// ================= Book Club ====================================

var clone_booksArray;

call_booksJSON_API();

function call_booksJSON_API() {

  $.get('/api/books', function (dbData) {

    clone_booksArray = [].concat(dbData);

    create_book_unique_genres_arr();
    populate_book_club_list();

    console.log('clone_booksArray', clone_booksArray)

  })

};

function populate_book_img_slider(genre) {

  var book_club_swiper_con = document.getElementById('book-club-swiper-container');
  var book_club_video_wrapper = document.getElementById('book-club-swiper-wrapper-con');

  for (var x = 0; x < clone_booksArray.length; x++) {

    if (genre === clone_booksArray[x].genre) {

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var imgSrc = document.createElement('img');
      imgSrc.src = clone_booksArray[x].img_path;
      imgCon.appendChild(imgSrc);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var title = document.createElement('h4');
      title.innerHTML = clone_booksArray[x].title;
      cardInfo.appendChild(title);

      var author = document.createElement('p');
      author.innerHTML = clone_booksArray[x].author;
      cardInfo.appendChild(author);

      if (clone_booksArray[x].video_link === null) {
        var playBtn = document.createElement('a');
        playBtn.title = clone_booksArray[x].title;
        playBtn.innerHTML = lockIcon;
        playBtn.style.color = 'black';
        cardInfo.appendChild(playBtn);

      } else {

        var playBtn = document.createElement('a');
        playBtn.title = clone_booksArray[x].title;
        playBtn.innerHTML = videoIcon;;
        cardInfo.appendChild(playBtn);
        playBtn.onclick = function () {
          show_book_play_video(this.title);
        }

      }

      book_club_video_wrapper.appendChild(swiperSlide);
      book_club_swiper_con.appendChild(book_club_video_wrapper);

    }
  }

};

function create_book_unique_genres_arr() {

  flags = [];
  unique_genres_array = [];

  for (var i = 0; i < clone_booksArray.length; i++) {

    if (flags[clone_booksArray[i].genre]) continue;
    flags[clone_booksArray[i].genre] = true;

    var obj = {

      id: clone_booksArray[i].book_id,
      genre: clone_booksArray[i].genre
    }

    unique_genres_array.push(obj);

  }

  console.log('unique_genres_array', unique_genres_array)

};

function populate_book_club_list() {

  var topicsCon = document.getElementById('edu-book-club-topics-con');
  var ulList = document.getElementById('edu-book-club-ul')

  for (var x = 0; x < unique_genres_array.length; x++) {

    var liItem = document.createElement('li');
    liItem.className = '';
    liItem.textContent = unique_genres_array[x].genre;
    ulList.appendChild(liItem);
    liItem.onclick = function () {

      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      document.getElementById('book-club-swiper-wrapper-con').innerHTML = '';

      populate_book_img_slider(this.textContent)

    }

    var select_firstItem = unique_genres_array[0].genre;

    if (unique_genres_array[x].genre === select_firstItem) {

      $(liItem).siblings().removeClass('active');
      $(liItem).addClass('active');

      populate_book_img_slider(select_firstItem)

    }

  }

  topicsCon.appendChild(ulList);

};

function show_book_play_video(title) {

  for (var x = 0; x < clone_booksArray.length; x++) {

    if (title === clone_booksArray[x].title) {

      show_modal_backdrop();

      var video_wrapper = document.getElementsByClassName('video-wrapper')[0];

      var videoSrc = document.createElement("iframe");
      videoSrc.src = clone_booksArray[x].video_link;

      video_wrapper.appendChild(videoSrc);

    }

  }
};