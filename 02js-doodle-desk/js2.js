// 确保这里的 ID 对应你 HTML 里实际的容器 ID (现在的 card2)
const container = document.getElementById('paperContainer');
const img = document.getElementById('myImg');

let isDragging = false; // 状态变量：是否正在拖拽
let startX = 0;         // 鼠标在图片内部的 X 偏移量
let startY = 0;         // 鼠标在图片内部的 Y 偏移量

// 1. 按下鼠标 (mousedown)：准备开始
img.addEventListener('mousedown', (e) => {
    e.preventDefault();// 关键：防止浏览器默认的“禁止符号”或图片拖拽鬼影
    e.stopPropagation();

    isDragging = true;
    img.classList.add('active'); // 增加样式（如阴影加深）

    // 获取图片当前相对于屏幕的位置
    const imgRect = img.getBoundingClientRect();

    // 计算鼠标点击的位置距离图片左上角有多远
    // 这样下次移动时，我们就能保持这个距离，防止图片乱跳
    startX = e.clientX - imgRect.left;
    startY = e.clientY - imgRect.top;
});

// 2. 移动鼠标 (mousemove)：实时跟随
// 注意：这里监听 document 而不是 container，是为了防止鼠标移动太快甩出容器时丢失焦点
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const containerRect = container.getBoundingClientRect();
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;

    // --- 计算新位置 ---
    // 公式：鼠标当前屏幕坐标 - 容器左边距 - 鼠标在图片内的偏移量
    let newLeft = e.clientX - containerRect.left - startX;
    let newTop = e.clientY - containerRect.top - startY;

    // --- 边界限制 (和之前一样) ---
    // 左、上限制
    newLeft = Math.max(0, newLeft);
    newTop = Math.max(0, newTop);

    // 右、下限制
    const maxLeft = containerRect.width - imgWidth;
    newLeft = Math.min(maxLeft, newLeft);

    const maxTop = containerRect.height - imgHeight;
    newTop = Math.min(maxTop, newTop);

    // --- 应用位置 ---
    img.style.left = newLeft + 'px';
    img.style.top = newTop + 'px';
});

// 3. 松开鼠标 (mouseup)：停止拖动
// 同样监听 document，确保你在页面任何地方松开鼠标都能停止
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        img.classList.remove('active');
    }
});


const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d');
const clearBtn = document.querySelector('.clear-button');

ctx.lineWidth = 3;
ctx.lineCap = 'round';
ctx.strokeStyle = '#333';

let isDrawing = false;

canvas.addEventListener('mousedown', (e) => {

    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
})

canvas.addEventListener('mousemove',(e) => {
    if(!isDrawing)return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
})

window.addEventListener('mouseup', () =>{
    if(isDrawing){
        isDrawing = false;
        ctx.closePath();
        saveDrawing();
    }
} )

function saveDrawing(){
    localStorage.setItem('myDoodle',canvas.toDataURL());
}
function loadDrawing(){
    const savedData = localStorage.getItem('myDoodle');
    if(savedData){
        const img = new Image();
        img.src = savedData;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
}
loadDrawing();


clearBtn.addEventListener('click',() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('myDoodle');

    clearBtn.classList.add('active');

    setTimeout(() => {
        clearBtn.classList.remove('active');
    }, 150);
});
