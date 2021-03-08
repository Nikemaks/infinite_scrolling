export default class InfiniteScrolling {
    constructor(url, target, insertElement) {
        this.url = url;
        this.target = document.querySelector(target);
        this.insertElement = document.querySelector(insertElement);
    }

    initialize() {
        this.createObserver();
        this.subscribe();
    }

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        };

        this.observer = new IntersectionObserver(this.handlerIntersection.bind(this), options);
    }

    subscribe() {
        this.observer.observe(this.target);
    }

    handlerIntersection(entries) {
        if (entries[0].intersectionRatio <= 0) {
            return;
        }

        this.loadItems().then(items => {
            items.forEach(item => {
                const {div, img, paragraph} = this.createNewItem(item);
                this.printNewItem(div, img, paragraph);
            })
        });
    }

    loadItems() {
        return fetch(this.url)
            .then(resp => resp.json())
            .catch(e => console.error(e));
    }

    createNewItem(item) {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const paragraph = document.createElement('p');
        div.classList.add('item');
        img.setAttribute('src', item.url);
        img.setAttribute('alt', item.alt);
        paragraph.innerHTML = item.name;
        return {
            div,
            img,
            paragraph
        };
    }

    printNewItem(div, img, paragraph) {
        const newBlock = this.insertElement.appendChild(div);
        newBlock.appendChild(img);
        newBlock.appendChild(paragraph);
    }

    unsubscribe() {
        this.observer.disconnect();
    }
}