'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('#avatar');
  var avatarImg = document.querySelector('.ad-form-header__preview').querySelector('img');
  var imagesInput = document.querySelector('#images');
  var imagesContainer = document.querySelector('.ad-form__photo');

  var setSrcImg = function (file, img) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        img.src = reader.result;
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  avatarInput.addEventListener('change', function () {
    var file = avatarInput.files[0];
    setSrcImg(file, avatarImg);
  });

  imagesInput.addEventListener('change', function () {
    var fragment = document.createDocumentFragment();
    Array.from(imagesInput.files).forEach(function (item) {
      var img = document.createElement('img');
      setSrcImg(item, img);
      img.width = 100;
      fragment.appendChild(img);
    });
    imagesContainer.appendChild(fragment);
  });
})();
