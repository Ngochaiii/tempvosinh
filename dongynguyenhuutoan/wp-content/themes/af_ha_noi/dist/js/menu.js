document.addEventListener("DOMContentLoaded", function () {
  let options = {
    event: "click", // * View note below
    selector: "a", // * View note below
    speed: 100,
    cssClass: {
      container: "drilldown-container",
      root: "drilldown-root",
      sub: "drilldown-sub",
      back: "drilldown-back",
    },
  };

  $(".drilldown").drilldown(options);

  let button_menu_show_mobile = document.querySelector(
    "#button_menu_show_mobile"
  );
  let menu_mobile = document.querySelector("#menu_mobile");

  if (button_menu_show_mobile && menu_mobile) {
    let flap = 0;
    button_menu_show_mobile.onclick = () => {
      flap++;
      if (flap % 2) {
        menu_mobile.classList.remove("hidden");
        menu_mobile.classList.add("block");
        button_menu_show_mobile.classList.add("change");
      } else {
        menu_mobile.classList.remove("block");
        menu_mobile.classList.add("hidden");
        button_menu_show_mobile.classList.remove("change");
      }
    };
  }

  function hasClass(element, cls) {
    return (" " + element.className + " ").indexOf(" " + cls + " ") > -1;
  }

  let nav__menu = document.querySelector(".nav__menu");
  if (nav__menu) {
    let q = nav__menu.children;
    for (let i = 0; i < nav__menu.children.length; i++) {
      if (hasClass(q[i], "dropdown")) {
        let w = q[i].children;
        if (w[0] && w[0].children[0]) {
          w[0].children[0].remove();
        }
      }
    }
  }

  document.addEventListener("DOMContentLoaded", (_) => {
    let li = document.querySelectorAll(".dropdown");
    li.forEach((v) => {
      if (v.querySelector(".active_nav")) v.classList.add("active_nav");
    });
  });
});
// chạy chữ thông báo trên header trang chủ
document.addEventListener("DOMContentLoaded", function () {
  if (
    document.getElementById("list") &&
    document.getElementById("containerElem")
  ) {
    console.log("menu.js đã được load và các phần tử cần thiết tồn tại.");
    const listElem = document.getElementById("list");
    const containerElem = document.getElementById("containerElem");

    if (!listElem || !containerElem) {
      console.error("listElem hoặc containerElem không tồn tại.");
      return;
    }

    const leftSideOfContainer = containerElem.getBoundingClientRect().left;

    // Tính toán chiều dài ban đầu của danh sách
    let totalWidth = 0;
    const items = listElem.getElementsByClassName("list__item");

    if (items.length === 0) {
      console.error("Không có phần tử .list__item trong listElem.");
      return;
    }

    Array.from(items).forEach((item) => {
      totalWidth += item.offsetWidth;
    });

    let currentLeftValue = 0;
    let timer = window.setInterval(animationLoop, 25);

    function animationLoop() {
      const firstListItem = listElem.querySelector(".list__item:first-child");

      if (!firstListItem) {
        console.error("firstListItem không tồn tại.");
        return;
      }

      let rightSideOfFirstItem = firstListItem.getBoundingClientRect().right;

      // Kiểm tra nếu phần tử đầu tiên đi ra khỏi màn hình
      if (rightSideOfFirstItem < leftSideOfContainer) {
        listElem.appendChild(firstListItem); // Chuyển phần tử đầu tiên sang cuối danh sách
        currentLeftValue += firstListItem.offsetWidth; // Cập nhật vị trí bên trái sau khi di chuyển phần tử
      }

      // Nếu danh sách đã di chuyển hết, reset vị trí
      if (currentLeftValue <= -totalWidth) {
        currentLeftValue = 0; // Đặt lại giá trị bên trái để bắt đầu lại từ đầu
      }

      listElem.style.marginLeft = `${currentLeftValue}px`;
      currentLeftValue--; // Giảm dần giá trị left để di chuyển danh sách sang trái
    }

    // Tạm dừng animation khi hover vào item
    $(listElem)
      .on("mouseenter", ".list__item", function () {
        clearInterval(timer);
      })
      .on("mouseleave", ".list__item", function () {
        timer = setInterval(animationLoop, 25);
      });
  } else {
    console.log("menu.js chưa được load hoặc các phần tử không tồn tại.");
  }
});
