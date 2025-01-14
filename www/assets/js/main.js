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

  //メインビジュアル
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
        const scaleValue = 1 - scrollY / 1000; // 縮小率を計算
        scaleImage.style.transform = `scale(${Math.max(scaleValue, 0.05)})`; // 縮小値の最小値を0.5に制限
      } else {
        // 通常の拡大
        const scaleValue = 1 + scrollY / 1000; // スクロール量に基づいて拡大率を計算
        scaleImage.style.transform = `scale(${scaleValue})`;
      }
    }
  });

  //セクションフェード表示
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
});
