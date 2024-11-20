import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import idGen from '../../utils/idGenerator.ts';
import { Task, Filter, FilterName } from './my-todo-list.types.ts';

import './my-todo-input.ts';

import './my-todo-list-footer.ts';
import './my-todo-list-item.ts';
import './my-todo-list-header.ts';

@customElement('my-todo-list')
export class MyTodoList extends LitElement {
  static styles = css`
    .my-todo-list__card {
      background: #fff;
      position: relative;
      box-shadow: 0 2px 4px #0003, 0 25px 50px #0000001a;
      width: 550px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `;

  @property({ type: Array }) tasks: Task[] = [
    // { id: '1', title: 'Task 1', completed: false },
    // { id: '2', title: 'Task 2', completed: true },
    // { id: '3', title: 'Task 3', completed: false },
  ];

  @state() private _filters: Filter[] = [
    {
      name: 'all',
      filterFn: () => true,
    },
    {
      name: 'active',
      filterFn: (task: Task) => !task.completed,
    },
    {
      name: 'completed',
      filterFn: (task: Task) => task.completed,
    },
  ];

  @state() private _activeFilter: FilterName = 'all';

  private _setFilter(filter: FilterName) {
    this._activeFilter = filter;
  }

  private _getFilteredTasks() {
    return this.tasks.filter(
      this._filters.find((f) => f.name === this._activeFilter)!.filterFn
    );
  }

  private _getActiveTasks() {
    return this.tasks.filter((task) => !task.completed);
  }

  private _getCompletedTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  protected render() {
    return html`<div class="my-todo-list">
      <my-todo-list-header textAlign="center">todos</my-todo-list-header>
      <div class="my-todo-list__card">
        <my-todo-input 
          class="new-todo" 
          .showToggle="${this.tasks.length > 0}"
          @enter-pressed=${this._createNewTask}
          @toggle-all=${this._toggleAllTasks}
        ></my-todo-input>
        <ul>
            ${this._getFilteredTasks().map(
              (task) => html`
                <my-tasks-list-item 
                  .task="${task}"
                  @toggle="${this._onToggle}"
                  @remove="${this._removeTask}"
                  @update="${this._updateTask}"
                ></my-tasks-list-item>
            `
            )}
        </ul>
        ${
          this.tasks.length > 0
            ? html`<my-todo-list-footer 
            .filters="${this._filters}"
            .itemsCount="${this._getActiveTasks().length}"
            .completedCount="${this._getCompletedTasks().length}"
            .activeFilter="${this._activeFilter}"
            @filter-changed=${this._onFilterChanged}
            @clear-completed=${this._removeCompletedTasks}
          ></my-todo-list-footer>`
            : ''
        }
      </div>
    </div>`;
  }

  private _createNewTask(event: CustomEvent) {
    const newTask: Task = {
      id: idGen.next().value,
      title: event.detail.value,
      completed: false,
    };
    this.tasks = [...this.tasks, newTask];

    this.requestUpdate();
  }

  private _removeTask(event: CustomEvent) {
    const taskId = event.detail.taskId;

    this.tasks = this.tasks.filter((t) => t.id !== taskId);

    this.requestUpdate();
  }

  private _removeCompletedTasks() {
    this.tasks = this.tasks.filter((t) => !t.completed);

    this.requestUpdate();
  }

  private _updateTask(event: CustomEvent) {
    const taskId = event.detail.taskId;
    const newTitle = event.detail.newTitle;

    this.tasks = this.tasks.map((t) =>
      t.id === taskId ? { ...t, title: newTitle } : t
    );

    this.requestUpdate();
  }

  private _onToggle(event: CustomEvent) {
    this.tasks = this.tasks.map((t) =>
      t.id === event.detail.taskId ? { ...t, completed: !t.completed } : t
    );
  }

  private _toggleAllTasks() {
    const anyActive = this.tasks.some((t) => !t.completed);

    if (anyActive) {
      this.tasks = this.tasks.map((t) => ({ ...t, completed: true }));
    } else {
      this.tasks = this.tasks.map((t) => ({ ...t, completed: false }));
    }
  }

  private _onFilterChanged(event: CustomEvent) {
    this._setFilter(event.detail);
  }
}
