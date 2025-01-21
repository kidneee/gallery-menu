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

  /*=================================================
    スクロール時のイベント
    ===================================================*/
  $(window).scroll(function () {
    // スクロール位置を取得
    let scroll = $(window).scrollTop();

    /*=================================================
      メインビジュアルの拡大・縮小
      ===================================================*/
    mv_scale(scroll);

    /*=================================================
      ロゴ、ハンバーガーメニューの表示
      ===================================================*/
    // スクロール位置が520pxを超えた場合
    if (scroll > 520) {
      // ロゴとハンバーガ―メニュをfadeInで表示する
      $('.header__logo').fadeIn(500);
      $('.hamburger').fadeIn(500);
      // スクロール位置が520px未満の場合
    } else {
      // ロゴとハンバーガ―メニュをfadeOutで非表示にする
      $('.header__logo').fadeOut(500);
      $('.hamburger').fadeOut(500);
    }
  });

  /*=================================================
  メインビジュアルの拡大・縮小（共通処理）
  ===================================================*/
  function mv_scale(scroll) {
    // window.innerWidthで画面幅を取得
    // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
    if (window.innerWidth > 900) {
      // メインビジュアルのCSS（width）を変更する
      // widthの値をスクロール量にあわせて増やすことで画像を拡大させる
      $('.main-visual__image').css({
        width: 100 / 3 + scroll / 10 + '%',
      });
      // スマホ表示の場合の処理（画面幅が900px以下の場合）
    } else {
      // メインビジュアルのCSS（width）を変更する
      // widthの値をスクロール量にあわせて減らすことで画像を縮小させる
      $('.main-visual__image').css({
        width: 100 - scroll / 10 + '%',
      });
    }
  }

  // セクションフェード表示
  const fadeInElements = document.querySelectorAll('.fade-in');

  // IntersectionObserverを作成
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 要素がビューポートに入ったら show クラスを追加
          entry.target.classList.add('show');
        }
      });
    },
    {
      threshold: 0.1, // 要素の10%が表示されたらトリガー
    }
  );

  // すべての .fade-in 要素を監視
  fadeInElements.forEach((element) => {
    observer.observe(element);
  });

  /*=================================================
      サイドボタンを表示
      ===================================================*/
  // 画面下から#galleryまでの距離を取得
  let gallery_position = $('#gallery').offset().top - $(window).height();
  // 画面下から#accessまでの距離を取得
  let access_position = $('#access').offset().top - $(window).height();

  // window.innerWidthで画面幅を取得
  // PC表示の場合の処理（画面幅が900pxより大きい場合　※900pxはCSSのブレークポイントとあわせる）
  if (window.innerWidth > 900) {
    // #galleryが表示された場合（スクロール位置が、画面下から#galleryまでの距離を超えた場合）
    if (scroll > gallery_position) {
      // #accessが表示されるまでの間は、#side-btnを横からスライドさせて表示する
      if (scroll < access_position) {
        $('.side-btn').css({
          transform: 'rotate(-90deg) translateY(0)',
        });
        // #accessが表示されたら、#side-btnをスライドさせて非表示にする
      } else {
        $('.side-btn').css({
          transform: 'rotate(-90deg) translateY(60px)',
        });
      }
      // #galleryが表示される前は、#side-btnをスライドさせて非表示にする
    } else {
      $('.side-btn').css({
        transform: 'rotate(-90deg) translateY(60px)',
      });
    }
  }

  /*=================================================
      Accessの背景画像を表示
      ===================================================*/
  // 画面下から#contactまでの距離を取得
  let contact_position = $('#contact').offset().top - $(window).height();

  // #accessが表示された場合
  if (scroll > access_position) {
    // #contactが表示されるまでの間は、背景画像をfadeInで表示する
    if (scroll < contact_position) {
      $('.access__bg').fadeIn(500);
    } else {
      $('.access__bg').fadeOut(500);
    }
    // #accessが表示される前の場合
  } else {
    // 背景画像を表示しない
    $('.access__bg').fadeOut(500);
  }
});
