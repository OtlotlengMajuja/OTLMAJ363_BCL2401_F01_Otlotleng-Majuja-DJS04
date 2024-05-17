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

    connectedCallback() {
        const image = this.getAttribute('image');
        const title = this.getAttribute('title');
        const authorId = this.getAttribute('author');
        const author = authors[authorId];

        this.shadowRoot.querySelector('.preview__image').src = image;
        this.shadowRoot.querySelector('.preview__title').innerText = title;
        this.shadowRoot.querySelector('.preview__author').innerText = author;

        this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick);
    }


}

