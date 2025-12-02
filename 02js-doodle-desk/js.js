const card = document.querySelector('.card');
const colorButtons = document.querySelectorAll('button');

colorButtons.forEach(button => {
    button.addEventListener('click', function () {
        // 先定义colorName = button date开头的 后面是自定义
        const colorName = button.dataset.color;
        // 然后再用card-加上colorName。这里的目的是为了找到我在css中写的
        // card-color 为了实现这一步。我需要保持colorName 和color，相同。
        // 我在html中的datecolor了三个颜色，分别是red，blue和green
        // 我需要在css中先写好所对应的效果，card-red。
        const targetClass = 'card-' + colorName;
        // 先抹除所有效果
        card.classList.remove('card-red', 'card-blue', 'card-green');
        //
        card.classList.add(targetClass);
    })
})

