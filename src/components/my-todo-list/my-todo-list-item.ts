import { LitElement, html, css } from 'lit-element';
import { property, customElement, state } from 'lit/decorators.js';
import { Task } from './my-todo-list.types';
import { nothing } from 'lit';

import '../my-input/my-input.ts';

type TaskMode = 'view' | 'edit';

@customElement('my-tasks-list-item')
export class MyTasksListItem extends LitElement {
  @property({ type: Object }) task: Task = {
    id: '0',
    title: '',
    completed: false,
  };

  @state() private _mode: TaskMode = 'view';

  static styles = css`
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
      position: relative;
  }

  .toggle {
      text-align: center;
      width: 40px;
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      border: none;
      -webkit-appearance: none;
      appearance: none;
  }

  .toggle:hover {
      cursor: pointer;
  }

  label {
      word-break: break-all;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      transition: color .4s;
      font-weight: 400;
      color: #484848;
      font-size: 24px;
  }

  .toggle+label {
      background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);
      background-repeat: no-repeat;
      background-position: center left;
  }

  li .toggle:checked+label {
      background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E);
  }

  li.completed label {
      color: #949494;
      text-decoration: line-through;
  }

  li.edit {
      z-index: 1;
  }

  li .destroy:focus,
  li .destroy:hover {
      color: #c18585;
  }

  button {
      -webkit-font-smoothing: antialiased;
      -webkit-appearance: none;
      appearance: none;
      background: none;
      border: 0;
      color: inherit;
      font-family: inherit;
      font-size: 100%;
      font-weight: inherit;
      vertical-align: baseline;
  }

  .destroy {
      bottom: 0;
      color: #949494;
      display: none;
      font-size: 30px;
      height: 40px;
      margin: auto 0;
      position: absolute;
      right: 10px;
      top: 0;
      transition: color .2s ease-out;
      width: 40px;
      cursor: pointer;
  }

  li .destroy:after {
      content: "×";
      display: block;
      height: 100%;
      line-height: 1.1;
  }

  li:hover .destroy {
      display: block;
  }

  li:focus {
      box-shadow: var(--focus-shadow, 0 0 2px 2px #cf7d7d);
      outline: 0;
  }

  my-input::part(input) {
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
  }
  `;

  render() {
    return html`
    ${
      this.task
        ? html`
        <li
          tabindex="0"
          class="${this._getItemClass()}" 
          @dblclick=${() => this._setMode('edit')} 
          @keydown=${this._onKeyDown}
        >
        ${
          this._mode === 'view'
            ? html`
          <input @change=${this._toggle} .checked=${this.task.completed} class="toggle" type="checkbox" tabindex="-1">
          <label>${this.task.title}</label>
          <button @click=${this._onRemove} class="destroy"></button>
        `
            : html`
          <my-input 
            .value=${this.task.title} 
            @enter-pressed=${this._confirmUpdate}
            @blur=${() => this._setMode('view')}
          ></my-input>
        `
        }        
      </li>`
        : nothing
    }
    `;
  }

  _getItemClass() {
    const classes = [
      this.task.completed ? 'completed' : '',
      this._mode == 'edit' ? 'edit' : '',
    ];
    return classes.filter(Boolean).join(' ');
  }

  private _toggle() {
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: {
          taskId: this.task.id,
          value: !this.task.completed,
        },
      })
    );
  }

  private _onRemove() {
    this.dispatchEvent(
      new CustomEvent('remove', {
        detail: {
          taskId: this.task.id,
        },
      })
    );
  }

  private _onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this._toggle();
    }
  }

  private _confirmUpdate(e: CustomEvent) {
    this._setMode('view');
    this.dispatchEvent(
      new CustomEvent('update', {
        detail: {
          newTitle: e.detail.value,
          taskId: this.task.id,
        },
      })
    );
  }

  private _setMode(mode: TaskMode) {
    this._mode = mode;

    setTimeout(() => {
      const inputElement = this.shadowRoot
        ?.querySelector('my-input')
        ?.shadowRoot?.querySelector('input');

      if (inputElement) {
        inputElement.focus();
      }
    }, 0);
  }
}
