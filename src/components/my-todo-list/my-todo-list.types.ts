export interface Task {
    id: string;
    title: string;
    completed: boolean;
}

export type FilterName = 'all' | 'active' | 'completed';

export interface Filter {
    name: FilterName;
    filterFn: (task: Task) => boolean;
}