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

// ================= Performance ====================================

var clone_entertmtArray;

call_entertainmentJSON_API();

function call_entertainmentJSON_API() {

  $.get('/api/entertainment', function (dbData) {

    clone_entertmtArray = [].concat(dbData);

    create_perf_unique_topics_arr();
    populate_perf_topics_list();
    init_coverflow_swiper();

    console.log('clone_entertmtArray', clone_entertmtArray)

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

function populate_perf_img_slider(topic) {

  var perf_swiper_con = document.getElementById('entmt-swiper-container');
  var perf_swiper_wrapper = document.getElementById('entmt-swiper-wrapper-con');

  for (var x = 0; x < clone_entertmtArray.length; x++) {

    if (topic === clone_entertmtArray[x].topic) {

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var imgSrc = document.createElement('img');
      imgSrc.src = clone_entertmtArray[x].img_path;
      imgCon.appendChild(imgSrc);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var title = document.createElement('h4');
      title.innerHTML = clone_entertmtArray[x].title;
      cardInfo.appendChild(title);

      var artist = document.createElement('p');
      artist.innerHTML = clone_entertmtArray[x].org_artist;
      cardInfo.appendChild(artist);

      var playBtn = document.createElement('a');
      playBtn.title = clone_entertmtArray[x].title;
      playBtn.innerHTML = videoIcon;
      cardInfo.appendChild(playBtn);
      playBtn.onclick = function () {
        show_perf_play_video(this.title)
      }

      perf_swiper_wrapper.appendChild(swiperSlide);
      perf_swiper_con.appendChild(perf_swiper_wrapper);

    }
  }
};

function create_perf_unique_topics_arr() {

  flags = [];
  unique_perf_topic_arr = [];

  for (var i = 0; i < clone_entertmtArray.length; i++) {

    if (flags[clone_entertmtArray[i].topic]) continue;
    flags[clone_entertmtArray[i].topic] = true;

    var obj = {
      id: clone_entertmtArray[i].entertmt_id,
      topic: clone_entertmtArray[i].topic
    }

    unique_perf_topic_arr.push(obj);

  }
  console.log('unique_topic', unique_perf_topic_arr)

};

function populate_perf_topics_list() {

  var topicsCon = document.getElementById('entmt-perf-topics-con');
  var ulList = document.getElementById('entmt-perf-topics-ul');

  for (var x = 0; x < unique_perf_topic_arr.length; x++) {

    var liItem = document.createElement('li');
    liItem.innerHTML = unique_perf_topic_arr[x].topic;
    ulList.appendChild(liItem);
    liItem.onclick = function () {

      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      document.getElementById('entmt-swiper-wrapper-con').innerHTML = '';

      populate_perf_img_slider(this.innerHTML)

    };

    var select_firstItem = unique_perf_topic_arr[0].topic;

    if (unique_perf_topic_arr[x].topic === select_firstItem) {
      $(liItem).siblings().removeClass('active');
      $(liItem).addClass('active');

      populate_perf_img_slider(select_firstItem);

    }

  }

  topicsCon.appendChild(ulList);

};

function show_perf_play_video(title) {

  for (var x = 0; x < clone_entertmtArray.length; x++) {

    if (title === clone_entertmtArray[x].title) {

      show_modal_backdrop();

      var video_wrapper = document.getElementsByClassName('video-wrapper')[0];

      var videoSrc = document.createElement("iframe");
      videoSrc.src = clone_entertmtArray[x].video_link;

      video_wrapper.appendChild(videoSrc);

    }

  }
};