  $(document).ready(function () {
    $('#show-header-template').load('../templates/header/header.html');
    $('#show-footer-template').load('../templates/footer/footer.html');

    setTimeout(function () {
      var showPage = document.getElementsByTagName('body')[0].style.visibility = 'visible';
    }, 1000);

  });