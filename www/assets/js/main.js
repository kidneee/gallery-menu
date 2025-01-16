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

  // .gallery セクションで .side-btn の表示/非表示制御
  const gallerySection = document.querySelector('.gallery');
  const sideBtn = document.querySelector('.side-btn');

  if (gallerySection && sideBtn) {
    console.log('Elements found:', gallerySection, sideBtn); // 要素が見つかったか確認

    const galleryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Gallery visible'); // ログ表示
            sideBtn.classList.add('visible'); // クラスを追加
          } else {
            console.log('Gallery not visible'); // ログ表示
            sideBtn.classList.remove('visible'); // クラスを削除
          }
        });
      },
      {
        threshold: 0, // 50%が表示されたら
      }
    );

    galleryObserver.observe(gallerySection);
  } else {
    console.error('Gallery section or side button not found.');
  }
});
