import './css/styles.css'
import InfiniteScrolling from './js/infinite-scrolling'

document.addEventListener('DOMContentLoaded', () => {
    const infiniteScroll = new InfiniteScrolling('images.json', 'footer', 'main');
    infiniteScroll.initialize();
});
