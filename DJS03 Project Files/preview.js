import { books, authors } from './data.js';

// Set up the BookPreview class 
class BookPreview extends HTMLElement {
    constructor() {
        super();
        // Uses 'shadow' DOM to encapsulate styles and markup
        this.attachShadow({ mode: 'open' });
        // Retrieves attributes (image, title, author) to populate the preview details
        this.shadowRoot.innerHTML = `
            <style>
                .preview {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin: 10px;
                    cursor: pointer;
                }
                .preview__image {
                    width: 100px;
                    height: 150px;
                    object-fit: cover;
                }
                .preview__info {
                    text-align: center;
                }
                .preview__title {
                    font-size: 1.2em;
                    margin: 10px 0;
                }
                .preview__author {
                    font-size: 0.9em;
                    color: #555;
                }
            </style>
            <button class="preview">
                <img class="preview__image" />
                <div class="preview__info">
                    <h3 class="preview__title"></h3>
                    <div class="preview__author"></div>
                </div>
            </button>
        `;
    }

    // Called when the element is inserted into the DOM. You use this to fetch attributes and attach event listeners.
    connectedCallback() {
        const image = this.getAttribute('image'); // Retrieves the value of the 'image' attribute from HTML tag 
        const title = this.getAttribute('title'); // Retrieves the value of the 'title' attribute from HTML tag 
        const authorId = this.getAttribute('author'); // Retrieves the value of the 'author' attribute from HTML tag 
        const author = authors[authorId];

        this.shadowRoot.querySelector('.preview__image').src = image;
        this.shadowRoot.querySelector('.preview__title').innerText = title;
        this.shadowRoot.querySelector('.preview__author').innerText = author;

        this.addEventListener('click', this.handleClick);
    }
    // Called when the element is removed from the DOM. You use this to detach event listeners.
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
    }

    handleClick() {
        const detailElement = document.querySelector('[data-list-active]');
        const isOpen = detailElement.open;

        if (isOpen) {
            detailElement.open = false;
        } else {
            const book = books.find(book => book.id === this.getAttribute('data-preview'));
            detailElement.open = true;
            document.querySelector('[data-list-blur]').src = book.image;
            document.querySelector('[data-list-image]').src = book.image;
            document.querySelector('[data-list-title]').innerText = book.title;
            document.querySelector('[data-list-subtitle]').innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
            document.querySelector('[data-list-description]').innerText = book.description;
        }
    }
}

