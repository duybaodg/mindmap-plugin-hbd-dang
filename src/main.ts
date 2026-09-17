import { Plugin } from "obsidian";
import { MindMapView, VIEW_TYPE } from "./mindmap/view";
import { registerCommands } from "./commands";

export default class MindMapPlugin extends Plugin {
    onload() {
        this.registerView(
            VIEW_TYPE,
            (leaf) => new MindMapView(leaf)
        );

        registerCommands(this.app, this);

        const ribbonIcon = this.addRibbonIcon('map', 'Mind Map', async () => {
            const leaf = this.app.workspace.getLeaf("tab");
            await leaf.setViewState({ type: VIEW_TYPE, active: true });

            const view = leaf.view as MindMapView;
            if (view instanceof MindMapView) {
                view.createNew();
            }
        });
        ribbonIcon.addClass('mindmap-ribbon-icon');
    }
}
