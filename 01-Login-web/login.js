// 选中所有以 card 开头的元素
const cards = document.querySelectorAll('[class^="card"]');

let isDragging = false;
let currentCard = null;
let offsetX, offsetY;

cards.forEach(card => {
  card.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentCard = card;
    offsetX = e.clientX - card.offsetLeft;
    offsetY = e.clientY - card.offsetTop;
    card.style.zIndex = 10; // 提到最上层
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentCard) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  currentCard.style.left = x + 'px';
  currentCard.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  if (currentCard) currentCard.style.zIndex = 1;
  currentCard = null;
});
