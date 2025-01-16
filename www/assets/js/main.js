document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー
  const hamburgerButton = document.querySelector('#js-buttonHamburger');
  const drawerMenu = document.getElementById('drawerMenu');
  const header = document.querySelector('.header');

  hamburgerButton.addEventListener('click', () => {
    const isExpanded = hamburgerButton.getAttribute('aria-expanded') === 'true';
    hamburgerButton.setAttribute('aria-expanded', !isExpanded);
    drawerMenu.classList.toggle('open');
    header.classList.toggle('open');
  });

  // メインビジュアル
  const moveImages = document.querySelectorAll('.move-image'); // 左右に動く画像
  const scaleImage = document.querySelector('.scale-image'); // 拡大する画像

  // スクロールイベントを追加
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const isSmallScreen = window.innerWidth <= 900; // ブレークポイントのチェック

    // .move-image の動作
    moveImages.forEach((image, index) => {
      const direction = index % 2 === 0 ? 1 : -1; // 偶数は右、奇数は左
      const offset = direction * (scrollY / -10); // スクロール量に基づくオフセット
      image.style.transform = `translateX(${offset}px)`;
    });

    // .scale-image の動作
    if (scaleImage) {
      if (isSmallScreen) {
        // 画面幅900px以下では縮小
        const widthValue = 200 - scrollY / 5; // 縮小率を計算（200pxから縮小）
        scaleImage.style.width = `${Math.max(widthValue, 50)}px`; // 最小幅を50pxに制限
      } else {
        // 通常の拡大
        const widthValue = 100 + '%' + scrollY / 5 + '%'; // 横幅を拡大
        scaleImage.style.width = `${widthValue}px`;
      }
    }
  });

  // セクションフェード表示
  const featureImages = document.querySelectorAll('.information__inner');
  if (featureImages.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    });

    featureImages.forEach((img) => {
      observer.observe(img);
    });
  }

  // .gallery と .access__wrapper の表示/非表示を制御
  const gallerySection = document.querySelector('.gallery');
  const accessWrapper = document.querySelector('.access__wrapper');
  const sideBtn = document.querySelector('.side-btn');

  let isInGallery = false; // .gallery内にいるかどうかのフラグ
  let isInAccess = false; // .access__wrapper内にいるかどうかのフラグ

  // IntersectionObserverで gallery を監視
  const galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Entered gallery');
          isInGallery = true;
          if (!isInAccess) {
            sideBtn.classList.add('visible'); // gallery内で、accessにいなければ表示
          }
        } else {
          console.log('Exited gallery');
          isInGallery = false;
          sideBtn.classList.remove('visible'); // galleryを抜けたら非表示
        }
      });
    },
    {threshold: 0}
  );

  // IntersectionObserverで access__wrapper を監視
  const accessObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Entered access__wrapper');
          isInAccess = true;
          sideBtn.classList.remove('visible'); // accessに入ったら常に非表示
        } else {
          console.log('Exited access__wrapper');
          isInAccess = false;
          if (isInGallery) {
            sideBtn.classList.add('visible'); // gallery内に戻った場合再表示
          }
        }
      });
    },
    {threshold: 0}
  );

  // gallery と access__wrapper を監視
  if (gallerySection) {
    galleryObserver.observe(gallerySection);
  }
  if (accessWrapper) {
    accessObserver.observe(accessWrapper);
  }

  // Access表示時の背景画像の切り替え
  const accessHeading = document.querySelector('.access__heading'); // .access__headingを取得
  const targetElement = document.body; // 背景を切り替える対象（例：body）

  if (accessHeading) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('.access__heading is visible');
            // 背景画像を切り替え
            targetElement.style.backgroundImage = 'url("assets/img/bg.jpg")';
            targetElement.classList.add('change-bg');
          } else {
            console.log('."access__heading is not visible');
            // 元の背景に戻す
            targetElement.style.backgroundImage = 'none';
          }
        });
      },
      {threshold: 0.5} // 50%が画面内に見えたら切り替え
    );

    observer.observe(accessHeading);
  } else {
    console.error('.access__heading not found');
  }
});
