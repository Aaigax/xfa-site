$(document).ready(function () {
  $('#show-header-template').load('../templates/header/header.html');
  $('#show-footer-template').load('../templates/footer/footer.html');
});

var clone_projectArray;

call_entertainmentJSON_API();

function call_entertainmentJSON_API() {

  $.get('/api/projects', function (dbData) {

    clone_projectArray = [].concat(dbData);

    populate_projects_slider();
    init_custom_swiper();

    console.log('clone_projectArray', clone_projectArray)

  })

};

function init_custom_swiper() {

  var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 10000,
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

function populate_projects_slider() {

  var swiperCon = document.getElementById('swiper-container');
  var swiperWrapper = document.getElementById('swiper-wrapper');

  for (var x = 0; x < clone_projectArray.length; x++) {

    var swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';
    swiperWrapper.appendChild(swiperSlide);

    // project info:

    var infoCard = document.createElement('div');
    infoCard.className = 'project-info-wrapper-group';
    swiperSlide.appendChild(infoCard);

    var projectType = document.createElement('h2');
    projectType.innerHTML = clone_projectArray[x].project_type;
    infoCard.appendChild(projectType);

    var projectName = document.createElement('h3');
    projectName.innerHTML = clone_projectArray[x].project_name + ' (' + clone_projectArray[x].progress + ')';
    infoCard.appendChild(projectName);

    var leaderImgWrapper = document.createElement('div');
    leaderImgWrapper.className = 'project-leader-img-wrapper-group';
    infoCard.appendChild(leaderImgWrapper);

    var leaderImg = document.createElement('img');
    leaderImg.src = clone_projectArray[x].leader_img_path;
    leaderImgWrapper.appendChild(leaderImg);

    var leaderName = document.createElement('span');
    leaderName.innerHTML = 'lead by ' + clone_projectArray[x].leader_name;
    leaderImgWrapper.appendChild(leaderName);

    var description = document.createElement('p');
    description.innerHTML = clone_projectArray[x].description;
    infoCard.appendChild(description);

    var imgSrc = document.createElement('img');
    imgSrc.src = clone_projectArray[x].project_img_path;
    swiperSlide.appendChild(imgSrc);

  }

  swiperCon.appendChild(swiperWrapper);

};