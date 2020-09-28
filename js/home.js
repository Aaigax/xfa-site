$(document).ready(function () {
  $('#show-header-template').load('/templates/header/header.html');
  $('#show-footer-template').load('/templates/footer/footer.html');
  $('.show-quiz-template').load('/templates/quiz.html');
});

var quizMe = document.getElementById('welcome-btn');
quizMe.onclick = function () {

  showModal();
  call_quizJSON_API();

};

function showModal() {

  document.getElementsByClassName('modal')[0].style.display = 'block';

};

function init_swiper() {

  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

};

var banner_arr = [

  {
    image: '/images/home/one_tree_hill.jpg',
    heading_1: 'Full Callow Scholarship',
    heading_2: 'Bacchus Marsh Grammar',
    heading_3: '2020 - 2026',
  },

  {
    image: '/images/home/syd_blue_mountain.jpg',
    heading_1: 'End Of Year Party',
    heading_2: 'Xfa Family',
    heading_3: '2019',
  },

  {
    image: '/images/home/eoy_celebration_2019.jpg',
    heading_1: '',
    heading_2: '',
    heading_3: '',
  },

  {
    image: '/images/home/xfa_fitness.jpg',
    heading_1: '',
    heading_2: '',
    heading_3: '',
  },
  {
    image: '/images/home/charity.jpg',
    heading_1: '',
    heading_2: '',
    heading_3: '',
  },

];

function populate_banner_img_slider() {

  var swiperCon = document.getElementById('home-banner-con');
  var swiperWrapper = document.getElementById('swiper-wrapper');

  for (var x = 0; x < banner_arr.length; x++) {

    var swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';
    swiperWrapper.appendChild(swiperSlide);

    var imgSrc = document.createElement('img');
    imgSrc.className = 'slide-img-src'
    imgSrc.src = banner_arr[x].image;
    swiperSlide.appendChild(imgSrc);

  }

  swiperCon.appendChild(swiperWrapper);

}

$(document).ready(function () {
  populate_banner_img_slider();
  init_swiper();
});