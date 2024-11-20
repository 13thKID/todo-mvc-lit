import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Filter, FilterName } from './my-todo-list.types.ts';

@customElement('my-todo-list-footer')
export class MyTodoListFooter extends LitElement {
  @property({ type: Array })
  filters: Filter[] = [];

  @property({ type: Array })
  itemsCount: number = 0;

  @property({ type: Array })
  completedCount: number = 0;

  @property({ type: Array })
  activeFilter?: FilterName;

  static styles = css`
    .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        right: 0;
        left: 0;
    }

    .filters li {
      display: inline;
    }

    .filters li a {
      color: inherit;
      margin: 3px;
      padding: 3px 7px;
      text-decoration: none;
      border: 1px solid transparent;
      border-radius: 3px;
    }

    .filters li a.selected {
      border-color: var(--color-primary, #ce4646);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #e6e6e6;
      font-size: 15px;
      height: 20px;
      padding: 10px 15px;
      text-align: center;
    }

    .footer * {
      z-index: 2;
    }

    .footer p {
      margin: 0;
    }

    .footer:before {
      bottom: 0;
      box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, .2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, .2);
      content: "";
      height: 50px;
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
    }

    .footer button {
      background: none;
      border: none;
      cursor: pointer;
    }

    .clear-completed:focus,
    .filters li a:focus {
      box-shadow: var(--focus-shadow, 0 0 2px 2px #cf7d7d);
      outline: 0;
    }

    @media (max-width: 550px) {
      .filters {
        position: absolute;
        bottom: 10px;
      }

      .footer {
        padding: 10px 15px 40px 15px;
      }
    }
  `;

  protected render() {
    return html`<div class="footer">
    <p>${this.itemsCount} items left!</p>
    <ul class="filters">
      ${this.filters.map(
        (filter) => html`
          <li>
            <a 
              href="#/${this.activeFilter}" 
              @click=${() => this._setFilter(filter.name)}
              class="${filter.name === this.activeFilter ? 'selected' : ''}"
            >${filter.name}</a>
          </li>
        `
      )}
      </ul>
      
      <button 
        class="clear-completed" 
        ?disabled="${this.completedCount === 0}"
        @click=${this._clearCompletedTasks}
      >Clear completed</button>
    </div>`;
  }

  private _setFilter(filter: string) {
    this.dispatchEvent(new CustomEvent('filter-changed', { detail: filter }));
  }

  private _clearCompletedTasks() {
    this.dispatchEvent(new CustomEvent('clear-completed'));
  }
}
