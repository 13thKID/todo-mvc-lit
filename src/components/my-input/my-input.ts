import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-input')
export class MyInput extends LitElement {
    @property({ type: String }) value = '';
    @property({ type: String }) placeholder = '';

    static styles = css`
    input {
        padding: 8px;
        font-size: 16px;
        box-sizing: border-box;
        width: 100%;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, .03);
        box-sizing: border-box;
        width: 100%;
        font-style: italic;
        border: 0;
    }

    input:focus {
        box-shadow: 0 0 2px 2px #cf7d7d;
        outline: 0;
    }
    `;

    render() {
        return html`
          <input
              part="input"
              type="text"
              .value=${this.value}
              placeholder=${this.placeholder}
              @input=${this._onInput}
              @keydown=${this._onKeyDown}
          />
        `;
    }

    private _onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.dispatchEvent(
            new CustomEvent('value-changed', {
                detail: {
                    value: this.value,
                },
            })
        );
    }

    private _onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.dispatchEvent(
                new CustomEvent('enter-pressed', {
                    detail: {
                        value: this.value,
                        bubbles: true,
                    },
                })
            );
            this.value = '';
        }
    }
}
