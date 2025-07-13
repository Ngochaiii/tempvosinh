function fixHeights() {
  matchHeights(".imageNew");

  // matchHeights(".descriptionNew");
  // Chỉ áp dụng matchHeights cho .descriptionNew khi màn hình lớn hơn 768px
  if (window.innerWidth > 768) {
    matchHeights(".descriptionNew");
  }
  matchHeights(".descriptionNew2");
  matchHeights(".descriptionNew3");

  // matchHeights(".titleNew");
  // Chỉ áp dụng matchHeights cho .titleNew khi màn hình lớn hơn 768px
  if (window.innerWidth > 768) {
    matchHeights(".titleNew");
  }

  matchHeights(".titleHeightNew1");
  matchHeights(".titleHeightNew2");
  matchHeights(".titleHeightNew3");
  matchHeights(".item_suKien img");
  matchHeights(".item_suKien h3");
  matchHeights(".item_suKien p");

  // matchHeights('.imageStory');
  // matchHeights('.story');

  matchHeights(".fixHeightTitleService");
  matchHeights(".fixHeightImageService");

  // matchHeights('.fixHeightImageDeTai');
  // matchHeights('.fixHeightImageContent');
  // matchHeights('.fixHeightDeTai');

  matchHeights(".fixHeightTab");
  matchHeights(".more__item .content");
  matchHeights(".fix-height-doi-ngu");

  matchHeights(".fix-height-tab-text-image");
  matchHeights(".fix-height-tab-text-image2");
  matchHeights(".imageThietBi");
  matchHeights(".imageCSVT");
}

// Lấy tất cả các phần tử có class "imageCSVT"
const elements = document.querySelectorAll(".imageCSVT");

// Khởi tạo biến để lưu trữ độ rộng rộng nhất
let maxWidth = 0;

// Lặp qua từng phần tử
elements.forEach((element) => {
  // Lấy độ rộng của phần tử hiện tại
  const elementWidth = element.offsetWidth;

  // Nếu độ rộng của phần tử hiện tại lớn hơn độ rộng rộng nhất hiện tại, cập nhật biến maxWidth
  if (elementWidth > maxWidth) {
    maxWidth = elementWidth;
  }
});

// Cập nhật độ rộng của tất cả các phần tử bằng độ rộng rộng nhất
elements.forEach((element) => {
  element.style.width = maxWidth + "px";
});

function matchHeights(ind) {
  let topHeight = 0;
  $(ind).height("");
  $(ind).each(function () {
    topHeight = Math.max(topHeight, $(this).height());
  });
  // console.log(topHeight);
  $(ind).height(topHeight);
}

$(document).ready(function () {
  fixHeights();
});

$(window).on("load", function () {
  fixHeights();
});

$(window).resize(function () {
  fixHeights();
});
