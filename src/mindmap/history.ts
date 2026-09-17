import { MindMapData } from "./models";
import { cloneMindMap } from "./tree";

export class CommandHistory {
    private undoStack: MindMapData[] = [];
    private redoStack: MindMapData[] = [];

    execute(data: MindMapData, mutate: () => boolean | void): boolean {
        const before = cloneMindMap(data);
        const result = mutate();
        if (result === false) return false;

        this.undoStack.push(before);
        if (this.undoStack.length > 100) {
            this.undoStack.shift();
        }
        this.redoStack = [];
        return true;
    }

    undo(current: MindMapData): MindMapData | null {
        const previous = this.undoStack.pop();
        if (!previous) return null;

        this.redoStack.push(cloneMindMap(current));
        return previous;
    }

    redo(current: MindMapData): MindMapData | null {
        const next = this.redoStack.pop();
        if (!next) return null;

        this.undoStack.push(cloneMindMap(current));
        return next;
    }

    clear(): void {
        this.undoStack = [];
        this.redoStack = [];
    }
}
