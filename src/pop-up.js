import { html, LitElement, css } from 'lit-element';

class PopUp extends LitElement {
    static get properties() {
        return {
            show: { type: Boolean },
            counter: { type: Number },
            data: { type: Object },
            loading: { type: Boolean }
        }
    }

    static get styles() {
        return css`
        :host {
            position: relative;
        }
        .popup {
            width: 300px;
            height: 250px;
            border: 1px solid #ddd;
            border-radius: 5px;
            position: relative;
            background: #fff;
            box-shadow: 0 0 9px #000;
            animation-name: popUp;
            animation-duration: .6s;
            animation-fill-mode: forwards;
        }
        .content {
            padding: 30px 15px 15px;
            text-transform: capitalize;
            font-size: 14px;
            line-height: 20px;
        }
        @keyframes popUp {
            0% { opacity: 0; top: -100% }
            100% { opacity: 1; top: calc(50% - 135px) }
        }
        button {
            float: right;
            margin: 5px;
            cursor: pointer;
        }
        `
    }

    constructor() {
        super();
        this.data = {};
        this.loading = true;
    }

    handleClose(e) {
        e.preventDefault();
        this.dispatchEvent(new CustomEvent('pop-close', {
            composed: true,
            bubbles: true,
        }))
    }

    fetchCall(param) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${param}`)
            .then(res => res.json())
            .then(data => { 
                this.data = data;
                this.loading = false;
            });
    }

    _templateData(data) {
        return html`
        <p>
            <strong>${data.title}</strong>
            <sup>(${data.id})</sup>
        </p>
        <p>${data.body}.</p>
        `
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchCall(this.counter);
        this.addEventListener('click', (e) => {
            if(e.target === this) {
                e.stopPropagation();
            }
        });
    } 

    render() {
        return html`
        <div class="popup">
            <button @click=${this.handleClose}>X</button>
            <div class="content">               
            ${this.loading ? html`<p>loading...</p>` : this._templateData(this.data)}
            </div>
        </div>`
    }
}

customElements.define('pop-up', PopUp);