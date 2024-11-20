import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../my-input/my-input.ts';

@customElement('my-todo-input')
export class MyTodoInput extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'What needs to be done?';
  @property({ type: Boolean }) showToggle = true;

  static styles = css`
    .todo-input {
        display: flex;
        position: relative;
        width: 100%;
    }

    my-input {
        width: 100%;
    }

    my-input::part(input) {
        background: rgba(0, 0, 0, .003);
        height: 65px;
        padding: 16px 16px 16px 60px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        border: none;
        color: inherit;
        font-family: inherit;
        font-size: 24px;
        font-weight: inherit;
        line-height: 1.4em;
        margin: 0;
        position: relative;
    }

    .toggle-all {
        border: none;
        bottom: 100%;
        height: 1px;
        opacity: 0;
        position: absolute;
        right: 100%;
        width: 1px;
        top: 0;
        z-index: 1;
        cursor: pointer;
    }

    .toggle-all {
        height: 60px !important;
        right: auto !important;
        width: 40px !important;
    }

    .toggle-all+label {
        align-items: center;
        display: flex;
        font-size: 0;
        height: 65px;
        justify-content: center;
        left: 0;
        position: absolute;
        width: 45px;
        cursor: pointer;
    }

    .toggle-all+label:before {
        color: #949494;
        content: "❯";
        display: inline-block;
        font-size: 22px;
        padding: 10px 27px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .toggle-all:focus+label{
        box-shadow: var(--focus-shadow, 0 0 2px 2px #cf7d7d);
        outline: 0;
    }

    .toggle-all-container {
        z-index: 1;
    }
    `;

  render() {
    return html`
        <div class="todo-input">
            ${
              this.showToggle
                ? html`
            <div class="toggle-all-container">
                <input class="toggle-all" type="checkbox" @input="${this._onToggleAll}">
                <label class="toggle-all-label" for="toggle-all">Toggle All Input</label>
            </div>
            `
                : ''
            }
            <my-input .value=${this.value} .placeholder=${
      this.placeholder
    } @value-changed=${this._reEmit}
                @enter-pressed=${this._reEmit}></my-input>
        </div>
        `;
  }

  _reEmit(e: Event) {
    this.dispatchEvent(new CustomEvent(e.type, e));
  }

  _onToggleAll() {
    this.dispatchEvent(new CustomEvent('toggle-all'));
  }
}
