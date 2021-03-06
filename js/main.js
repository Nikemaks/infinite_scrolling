document.addEventListener("DOMContentLoaded", () => {
    const url = 'images.json';
    const target = document.querySelector("footer");
    const observer = createObserver();

    observer.observe(target);

    function createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        };

        return new IntersectionObserver(handlerIntersection, options);
    }

    function handlerIntersection(entries) {
        if (entries[0].intersectionRatio <= 0) {
            return;
        }

        loadItems();
    }

    function loadItems() {
        fetch(url)
            .then(resp => resp.json())
            .then(data => createNewItems(data))
            .catch(e => console.error(e));
    }

    function createNewItems(data) {
        data.forEach(item => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            const paragraph = document.createElement('p');
            div.classList.add('item');
            img.setAttribute('src', item.url);
            img.setAttribute('alt', item.alt);
            paragraph.innerHTML = item.name;
            printNewItem(div, img, paragraph);

        })
    }

    function printNewItem(div, img, paragraph) {
        const mainElement = document.querySelector('main');
        const newBlock = mainElement.appendChild(div);
        newBlock.appendChild(img);
        newBlock.appendChild(paragraph);
    }
});