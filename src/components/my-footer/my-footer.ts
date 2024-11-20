import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-footer')
export class MyFooter extends LitElement {
    static styles = css`
    .info {
        color: #4d4d4d;
        font-size: 11px;
        margin: 65px auto 0;
        text-align: center;
        text-shadow: 0 1px 0 hsla(0, 0%, 100%, .5);
    }

    .info p {
        line-height: 1;
    }

    .info a {
        color: inherit;
        font-weight: 400;
        text-decoration: none;
    }
    `

    render() {
        return html`
        <footer class="info">
            <p>Double-click to edit a todo</p>
            <p>Created by the TodoMVC Team</p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>`
    }
}