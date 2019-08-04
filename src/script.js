class Order {
    constructor() {
        this.btnNext = document.getElementById('js-next-step');
        this.tabsContent = document.getElementsByClassName('js-tab');
        this.tabs = document.getElementsByClassName('order-nav__item');
        this.activeClass = 'order-nav__item_active';
        this.events()
    }
    events() {
        this.btnNext.addEventListener('click' , this.slide.bind(this));
    }
    slide(e) {
        [].forEach.call(this.tabsContent, function (tabContent) {
            tabContent.style.left = '-100%';
        });

        this.changeTab();

        e.preventDefault();
        return false;
    }
    changeTab(e) {
        let arr = [...this.tabs];
        let activeClass = this.activeClass;
        let activeTab = false;

        arr.reduce(function (previousValue, currentItem) {
            console.log(previousValue);
            if (previousValue) {
                currentItem.classList.add(activeClass);
                activeTab = false;
            }
            else if (currentItem.classList.contains(activeClass)) {
                activeTab = true;
                currentItem.classList.remove(activeClass);
            }
            else {
                activeTab = false;
            }
            return activeTab;
        },0)
    }
}
setTimeout(
    function () {
        let order = new Order();
    },
    100
);

// order.btnNext.onclick = function () {
//     order.slide();
// };
