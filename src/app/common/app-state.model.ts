export interface TodoItem {
    id: number;
    checked: boolean;
    description: string;
    lastModified: Date;
}

export interface TodoContext {
    todos: TodoItem[];
    todosEdit: TodoItem[];
}

// The model representing the whole state of the application
export class PlaygroundState {
    public todosContext: TodoContext;
}
