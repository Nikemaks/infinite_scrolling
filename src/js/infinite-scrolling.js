/**
 * Class for create infinite scrolling (lazy loading) of images in a page - deferred fetching of images until the user
 * scrolls near the end of the list.
 * @param url {String} - url address for loading images.json, example json field:
 *              {"name": "joda", "alt": "joda", "url": "assets/joda.jpeg"},
 * @param target {String} - className which user scrolls near the end of the list.
 * @param insertElement {String} - className for insert new items.
 * */

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
                const newItem = this.createNewItem(item);
                this.printNewItem(newItem);
            })
        });
    }

    loadItems() {
        return fetch(this.url)
            .then(resp => resp.json())
            .catch(e => console.error(e));
    }

    createNewItem(item) {
        const template = ({url, alt, name}) => `<div class="item"><img src="${url}" alt="${alt}"><p>${name}</p></div>`;
        return template(item);
    }

    printNewItem(newItem) {
        this.insertElement.insertAdjacentHTML('beforeend', newItem);
    }

    unsubscribe() {
        this.observer.disconnect();
    }
}