"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTerminal = exports.ensureTerminalExists = void 0;
const vscode = require("vscode");
const ensureTerminalExists = () => {
    if (vscode.window.terminals.length === 0) {
        vscode.window.showErrorMessage("No active terminals");
        return false;
    }
    return true;
};
exports.ensureTerminalExists = ensureTerminalExists;
const selectTerminal = async () => {
    const terminals = vscode.window.terminals;
    if (terminals.length === 1) {
        return terminals[0];
    }
    const items = vscode.window.terminals.map((terminal, index) => ({
        label: `${index + 1}: ${terminal.name}`,
        terminal: terminal
    }));
    const item = await vscode.window.showQuickPick(items);
    return item ? item.terminal : undefined;
};
exports.selectTerminal = selectTerminal;
//# sourceMappingURL=terminal.js.map