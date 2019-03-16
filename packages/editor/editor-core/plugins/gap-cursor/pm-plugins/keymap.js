import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { arrow, deleteNode } from '../actions';
import { Direction } from '../direction';
export default function keymapPlugin() {
    var map = {};
    keymaps.bindKeymapWithCommand(keymaps.moveLeft.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return arrow(Direction.LEFT, endOfTextblock)(state, dispatch, view);
    }, map);
    keymaps.bindKeymapWithCommand(keymaps.moveRight.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return arrow(Direction.RIGHT, endOfTextblock)(state, dispatch);
    }, map);
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return arrow(Direction.UP, endOfTextblock)(state, dispatch);
    }, map);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, function (state, dispatch, view) {
        var endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
        return arrow(Direction.DOWN, endOfTextblock)(state, dispatch);
    }, map);
    // default PM's Backspace doesn't handle removing block nodes when cursor is after it
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, deleteNode(Direction.BACKWARD), map);
    // handle Delete key (remove node after the cursor)
    keymaps.bindKeymapWithCommand(keymaps.deleteKey.common, deleteNode(Direction.FORWARD), map);
    return keymap(map);
}
//# sourceMappingURL=keymap.js.map