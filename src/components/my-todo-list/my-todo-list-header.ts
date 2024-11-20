import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('my-todo-list-header')
export class MyTodoListHeader extends LitElement {
  @property({ type: String })
  color = 'primary';

  @property({ type: String })
  textAlign = 'left';

  static styles? = css`
  h1 {
    font-size: 80px;
    font-weight: 200;
  }
  `

  protected render() {
    const styles = { color: `var(--color-${this.color})`, textAlign: this.textAlign };

    return html`<h1 style=${styleMap(styles)}>
      <slot><slot/>
    </h1>`;
  }
}
