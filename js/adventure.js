$(document).ready(function () {

  $("#show-header-template").load("../../templates/header/header.html");
  $("#show-footer-template").load("../../templates/footer/footer.html");

  $(".show-img-slider-template-con").load("../../templates/slideshow/img-slide.html");

});

const closeModalBtn = document.getElementsByClassName('modal-close-btn')[0].onclick = close_modal;

function close_modal() {

  var reset_Counter = (index = 0);

  document.getElementsByClassName('img-slide-wrapper')[0].innerHTML = '';

  document.getElementsByClassName("modal-backdrop-con")[0].style.display = "none";

};

function show_modal_backdrop() {

  var show_modalBackdrop = document.getElementsByClassName("modal-backdrop-con")[0];
  show_modalBackdrop.style.display = "block";

};

var clone_advArray;
var cameraIcon = '<i class="fa fa-camera"></i>';

call_adventureJSON_API();

function call_adventureJSON_API() {

  $.get('/api/adventure', function (dbData) {

    clone_advArray = [].concat(dbData);

    populate_vic_img_slider();
    populate_syd_img_slider();
    populate_tas_img_slider();
    populate_qld_img_slider();
    populate_akl_img_slider();

    init_coverflow_swiper();

  })

};

function init_coverflow_swiper() {

  var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    update: true,
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

function populate_vic_img_slider() {

  var vic_swiper_con = document.getElementById('vic_swiper-container');
  var vic_swiper_wrapper = document.getElementById('vic_swiper_wrapper_con');

  for (var x = 0; x < clone_advArray.length; x++) {

    if (vic_swiper_wrapper.title === clone_advArray[x].state) {

      var adventure = clone_advArray[x].category.toLowerCase() + '/',
        country = clone_advArray[x].country.toLowerCase() + '/',
        state = clone_advArray[x].state.toLowerCase() + '/',
        folderName = clone_advArray[x].folder_name.toLowerCase() + '/',
        imageName = clone_advArray[x].image_name,
        imageDirectory = "../../images/journey/",
        fullImageDir = imageDirectory + adventure + country + state + folderName + imageName;

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var srcImg = document.createElement('img');
      srcImg.src = fullImageDir;
      imgCon.appendChild(srcImg);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var place = document.createElement('h4');
      place.innerHTML = clone_advArray[x].place;
      cardInfo.appendChild(place);

      var location = document.createElement('p');
      location.innerHTML = clone_advArray[x].address + ', ' + clone_advArray[x].state + ' ' + clone_advArray[x].country;
      cardInfo.appendChild(location);

      var viewPhoto = document.createElement('a');
      viewPhoto.id = clone_advArray[x].adventure_id;
      viewPhoto.innerHTML = cameraIcon;
      cardInfo.appendChild(viewPhoto);
      viewPhoto.onclick = function () {

        get_selected_adventure_id(this.id);

      }

    }

    vic_swiper_wrapper.appendChild(swiperSlide);
    vic_swiper_con.appendChild(vic_swiper_wrapper);

  }
};

function populate_syd_img_slider() {

  var nsw_swiper_con = document.getElementById('nsw-swiper-container');
  var nsw_swiper_wrapper = document.getElementById('nsw-swiper-wrapper-con');

  for (var x = 0; x < clone_advArray.length; x++) {

    if (nsw_swiper_wrapper.title === clone_advArray[x].state) {

      var adventure = clone_advArray[x].category.toLowerCase() + '/',
        country = clone_advArray[x].country.toLowerCase() + '/',
        state = clone_advArray[x].state.toLowerCase() + '/',
        folderName = clone_advArray[x].folder_name.toLowerCase() + '/',
        imageName = clone_advArray[x].image_name,
        imageDirectory = "../../images/journey/",
        fullImageDir = imageDirectory + adventure + country + state + folderName + imageName

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var srcImg = document.createElement('img');
      srcImg.src = fullImageDir;
      imgCon.appendChild(srcImg);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var place = document.createElement('h4');
      place.innerHTML = clone_advArray[x].place;
      cardInfo.appendChild(place);

      var location = document.createElement('p');
      location.innerHTML = clone_advArray[x].address + ', ' + clone_advArray[x].state + ' ' + clone_advArray[x].country;
      cardInfo.appendChild(location);

      var viewPhoto = document.createElement('a');
      viewPhoto.id = clone_advArray[x].adventure_id;
      viewPhoto.innerHTML = cameraIcon;
      cardInfo.appendChild(viewPhoto);
      viewPhoto.onclick = function () {

        get_selected_adventure_id(this.id)

      }
      nsw_swiper_wrapper.appendChild(swiperSlide);
      nsw_swiper_con.appendChild(nsw_swiper_wrapper);

    }


  }
};

function populate_tas_img_slider() {

  var tas_swiper_con = document.getElementById('tas-swiper-container');
  var tas_swiper_wrapper = document.getElementById('tas-swiper-wrapper-con');

  for (var x = 0; x < clone_advArray.length; x++) {

    if (tas_swiper_wrapper.title === clone_advArray[x].state) {

      var adventure = clone_advArray[x].category.toLowerCase() + '/',
        country = clone_advArray[x].country.toLowerCase() + '/',
        state = clone_advArray[x].state.toLowerCase() + '/',
        folderName = clone_advArray[x].folder_name.toLowerCase() + '/',
        imageName = clone_advArray[x].image_name,
        imageDirectory = "../../images/journey/",
        fullImageDir = imageDirectory + adventure + country + state + folderName + imageName

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var srcImg = document.createElement('img');
      srcImg.src = fullImageDir;
      imgCon.appendChild(srcImg);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var place = document.createElement('h4');
      place.innerHTML = clone_advArray[x].place;
      cardInfo.appendChild(place);

      var location = document.createElement('p');
      location.innerHTML = clone_advArray[x].address + ', ' + clone_advArray[x].state + ' ' + clone_advArray[x].country;
      cardInfo.appendChild(location);

      var viewPhoto = document.createElement('a');
      viewPhoto.id = clone_advArray[x].adventure_id;
      viewPhoto.innerHTML = cameraIcon;
      cardInfo.appendChild(viewPhoto);
      viewPhoto.onclick = function () {
        get_selected_adventure_id(this.id)
      }

      tas_swiper_wrapper.appendChild(swiperSlide);
      tas_swiper_con.appendChild(tas_swiper_wrapper);

    }

  }
};

function populate_akl_img_slider() {

  var akl_swiper_con = document.getElementById('akl-swiper-container');
  var akl_swiper_wrapper = document.getElementById('akl-swiper-wrapper-con');

  for (var x = 0; x < clone_advArray.length; x++) {

    if (akl_swiper_wrapper.title === clone_advArray[x].state) {

      var adventure = clone_advArray[x].category.toLowerCase() + '/',
        country = clone_advArray[x].country.toLowerCase() + '/',
        state = clone_advArray[x].state.toLowerCase() + '/',
        folderName = clone_advArray[x].folder_name.toLowerCase() + '/',
        imageName = clone_advArray[x].image_name,
        imageDirectory = "../../images/journey/",
        fullImageDir = imageDirectory + adventure + country + state + folderName + imageName;

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var srcImg = document.createElement('img');
      srcImg.src = fullImageDir;
      imgCon.appendChild(srcImg);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var place = document.createElement('h4');
      place.innerHTML = clone_advArray[x].place;
      cardInfo.appendChild(place);

      var location = document.createElement('p');
      location.innerHTML = clone_advArray[x].address + ', ' + clone_advArray[x].state + ' ' + clone_advArray[x].country;
      cardInfo.appendChild(location);

      var viewPhoto = document.createElement('a');
      viewPhoto.id = clone_advArray[x].adventure_id;
      viewPhoto.innerHTML = cameraIcon;
      cardInfo.appendChild(viewPhoto);
      viewPhoto.onclick = function () {

        get_selected_adventure_id(this.id)
      }

      akl_swiper_wrapper.appendChild(swiperSlide);
      akl_swiper_con.appendChild(akl_swiper_wrapper);

    }
  }
};

function populate_qld_img_slider() {

  var imageDirectory = "../../images/journey/adventure/australia/qld/";

  var qld_swiper_con = document.getElementById('qld-swiper-container');
  var qld_swiper_wrapper = document.getElementById('qld-swiper-wrapper-con');

  for (var x = 0; x < clone_advArray.length; x++) {

    if (qld_swiper_wrapper.title === clone_advArray[x].state) {

      var adventure = clone_advArray[x].category.toLowerCase() + '/',
        country = clone_advArray[x].country.toLowerCase() + '/',
        state = clone_advArray[x].state.toLowerCase() + '/',
        folderName = clone_advArray[x].folder_name.toLowerCase() + '/',
        imageName = clone_advArray[x].image_name,
        imageDirectory = "../../images/journey/",
        fullImageDir = imageDirectory + adventure + country + state + folderName + imageName;

      var swiperSlide = document.createElement('div');
      swiperSlide.className = 'swiper-slide';

      var card = document.createElement('div');
      card.className = 'card';
      swiperSlide.appendChild(card);

      var imgCon = document.createElement('div');
      imgCon.className = 'img-con-group';
      card.appendChild(imgCon);

      var srcImg = document.createElement('img');
      srcImg.src = fullImageDir;
      imgCon.appendChild(srcImg);

      var cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-group';
      card.appendChild(cardInfo);

      var place = document.createElement('h4');
      place.innerHTML = clone_advArray[x].place;
      cardInfo.appendChild(place);

      var location = document.createElement('p');
      location.innerHTML = clone_advArray[x].address + ', ' + clone_advArray[x].state + ' ' + clone_advArray[x].country;
      cardInfo.appendChild(location);

      var viewPhoto = document.createElement('a');
      viewPhoto.id = clone_advArray[x].adventure_id;
      viewPhoto.innerHTML = cameraIcon;
      cardInfo.appendChild(viewPhoto);
      viewPhoto.onclick = function () {
        get_selected_adventure_id(this.id)
      }

      qld_swiper_wrapper.appendChild(swiperSlide);
      qld_swiper_con.appendChild(qld_swiper_wrapper);

    }
  }
};

// --------------- load photo gallery --------------------

var adv_id_array = [];
var clone_imgArray;
var index = 0;

var slide_counter = document.getElementsByClassName('slide-counter')[0];

function call_photoGallery_API() {

  $.get('/api/adventure/photo-gallery', function (dbImage) {

    clone_imgArray = [].concat(dbImage);

    populate_photo_gallery();

  });

};

function get_selected_adventure_id(adventure_id) {

  if (adv_id_array.length > 0) {

    adv_id_array.length = 0;
    adv_id_array.push({
      id: adventure_id
    });

    send_adventure_id_request_to_server();
    call_photoGallery_API();

  } else {

    adv_id_array.push({
      id: adventure_id
    });

    send_adventure_id_request_to_server();
    call_photoGallery_API();

  };

};

function populate_photo_gallery() {

  show_modal_backdrop();

  var imgSlideWrapper = document.getElementsByClassName('img-slide-wrapper')[0];

  var imgEl = document.createElement('img');
  imgEl.className = 'img-src';
  imgEl.src = fullImageDir = '../../images/journey/' +
    clone_imgArray[index].category.toLowerCase() + '/' +
    clone_imgArray[index].country.toLowerCase() + '/' +
    clone_imgArray[index].state.toLowerCase() + '/' +
    clone_imgArray[index].folder_name.toLowerCase() + '/' +
    clone_imgArray[index].image_name;

  var counter = index + 1;
  slide_counter.textContent = "Images " + counter + ' of ' + clone_imgArray.length;

  // next - image

  var nextBTN = document.getElementById("next-btn");
  nextBTN.onclick = function () {

    next_Item();

  };

  // previous-image

  var prevBTN = document.getElementById("prev-btn");
  prevBTN.onclick = function () {

    previous_Item();

  };

  // Loading animation:

  // var loader = document.createElement('span');
  // loader.className = 'loader';
  // var loader_inner = document.createElement('span');
  // loader_inner.className = 'loader-inner';
  // loader.appendChild(loader_inner);

  // imgSlideWrapper.appendChild(loader);

  // }

  // }

  imgSlideWrapper.appendChild(imgEl);

};

function image_slide_counter(arrLength) {

  var counter = index + 1;

  slide_counter.textContent = "Images " + counter + ' of ' + arrLength;

};

function next_Item() {

  index++;

  if (index === clone_imgArray.length) {

    index = 0;

  };

  var img = document.getElementsByClassName('img-src')[0];
  img.src = fullImageDir = '../../images/journey/' +
    clone_imgArray[index].category.toLowerCase() + '/' +
    clone_imgArray[index].country.toLowerCase() + '/' +
    clone_imgArray[index].state.toLowerCase() + '/' +
    clone_imgArray[index].folder_name.toLowerCase() + '/' +
    clone_imgArray[index].image_name;

  image_slide_counter(clone_imgArray.length);

};

function previous_Item() {

  index--;

  if (index < 0) {

    index = clone_imgArray.length - 1;

  };

  var img = document.getElementsByClassName('img-src')[0];
  img.src = fullImageDir = '../../images/journey/' +
    clone_imgArray[index].category.toLowerCase() + '/' +
    clone_imgArray[index].country.toLowerCase() + '/' +
    clone_imgArray[index].state.toLowerCase() + '/' +
    clone_imgArray[index].folder_name.toLowerCase() + '/' +
    clone_imgArray[index].image_name;

  image_slide_counter(clone_imgArray.length);

};

function send_adventure_id_request_to_server() {

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {}
  };

  xmlhttp.open("POST", "http://xfasite-env.eba-3icap9gx.ap-southeast-2.elasticbeanstalk.com/api/adventure/image-id", true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(adv_id_array));

};