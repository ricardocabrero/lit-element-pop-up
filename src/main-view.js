import { html, LitElement, css } from 'lit-element';
import './pop-up';

class MainView extends LitElement {
    
    static get properties() {
        return {
            show: { type: Boolean },
            counter: { type: Number },
        }
    }

    static get styles() {
        return css`
        .wrapper {
            font-family: Arial, Helvetica, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            position: relative;
            background: transparent;
            transition: background .05s ease-in;
        }
        .wrapper.layer {
            background: rgb(0 0 0 / 73%);
        }
        p {
            font-size: 14px;
            max-width: 600px;
            line-height: 16px;
        }
        .active {
            display: block;
        }
        .inactive {
            display: none;
        }`
    }

    constructor() {
        super();
        this.show = false;
        this.counter = 1;
    }

    handleClick(e) {
        e.stopPropagation();
        this.show = !this.show;
        this.handleCounter(this.show);
    }

    handleCounter(param) {
        if(!param) {
            this.counter === 100 ? this.counter = 1 : this.counter++;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('pop-close', this.handleClick);
        this.addEventListener('click', (e) => {
            if(this.show) {
                this.handleClick(e);
            }
        });
    }

    render() { 
        const showPopUp = this.show ? html`<pop-up counter=${this.counter}></pop-up>` : ``;   
        return html`
            <div class=${this.show ? 'wrapper layer' : 'wrapper'}>
                ${showPopUp}
            <button 
            class=${this.show ? 'inactive' : 'active'}
            @click=${this.handleClick}>Show pop-up</button>
        </div>`
    }
}

customElements.define('main-view', MainView);