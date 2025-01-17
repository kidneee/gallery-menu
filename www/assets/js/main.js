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
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, index * 200);
          observer.unobserve(entry.target); // 一度だけ適用
        }
      });
    },
    {threshold: 0.1}
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

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
  const targetElement = document.querySelector('.bg__wrapper'); // 背景を切り替える対象
  const contactHeading = document.querySelector('.contact__heading'); // .contact__headingを取得

  if (accessHeading) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === accessHeading) {
              console.log('.access__heading is visible');
              targetElement.style.backgroundImage = 'url("assets/img/bg.jpg")';
              targetElement.style.backgroundSize = 'cover';
              targetElement.style.backgroundPosition = 'center';
              targetElement.style.backgroundRepeat = 'no-repeat';
              targetElement.style.backgroundAttachment = 'fixed';
              targetElement.classList.add('change-bg');
              targetElement.classList.remove('return-bg');
              gallerySection.classList.add('fade-out');
            } else if (entry.target === contactHeading) {
              console.log('.contact__heading is visible');
              targetElement.classList.remove('change-bg');
              targetElement.classList.add('fade-out');
              targetElement.style.backgroundImage = 'none';
              targetElement.style.backgroundColor = 'var(--background)';
            }
          } else {
            if (entry.target === accessHeading) {
              console.log('.access__heading is not visible');
              targetElement.classList.remove('change-bg');
              targetElement.classList.add('return-bg');
              gallerySection.classList.remove('fade-out');
            } else if (entry.target === contactHeading) {
              console.log('.contact__heading is not visible');
              targetElement.classList.remove('fade-in');
            }
          }
        });
      },
      {threshold: 0.5}
    );

    observer.observe(accessHeading);
    observer.observe(contactHeading);
  } else {
    console.error('.access__heading or .contact__heading not found');
  }
});
