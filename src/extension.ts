// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {spawn, execSync} from 'child_process';
import { ensureTerminalExists, selectTerminal } from "./terminal";
import path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const subscriptions = [
        vscode.commands.registerCommand('vscode-skipper.skipperMake', () => runMake(context)),
		vscode.commands.registerCommand('vscode-skipper.skipperMakeUnitTest', () => runMakeUnitTest(context)),
		vscode.commands.registerCommand('vscode-skipper.skipperMakeGenerate', () => runMakeGenerate(context)),
    ];
    subscriptions.forEach((sub) => {context.subscriptions.push(sub);});

	// Cache targets
	findMakeTargets(context);
}

const runMake = async (context: vscode.ExtensionContext) => {
	let targets = findMakeTargets(context);
    invokeSkipperMake(context, targets);
};

const runMakeUnitTest = async (context: vscode.ExtensionContext) => {
	if (vscode.window.activeTextEditor) {
		let filePath = path.dirname(vscode.window.activeTextEditor.document.fileName);
		sendTextsToTerminal([
			`cd ${getWorkspaceFolder()}`,
			`skipper make unit-test TEST=${filePath}`
		]);
	}
};

const runMakeGenerate = async (context: vscode.ExtensionContext) => {
	let targets = findMakeTargets(context);
	targets = targets.filter(t => t.indexOf("generate") !== -1);
    invokeSkipperMake(context, targets);
};

const invokeSkipperMake = async (context: vscode.ExtensionContext, targets: string[]) => {
	const target = await vscode.window.showQuickPick(targets);
    if (target !== undefined) {
		context.workspaceState.update('lastTarget', target);
		sendTextsToTerminal([
			`cd ${getWorkspaceFolder()}`,
			`skipper make ${target}`
		  ]);
    }
};

// Get a list of targets
const findMakeTargets = (context: vscode.ExtensionContext) => {
	let wsFolder = getWorkspaceFolder();
	if (!wsFolder) {
		return [];
	}
	let targets = context.workspaceState.get<string[]>("targets_" + wsFolder);
	if (!targets) {
		// This is approximately the Bash completion sequence run to get make targets.
		const bashCompletion = `make -pRrq : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($1 !~ "^[#.]") {print $1}}' | egrep -v '^[^[:alnum:]]' | sort | xargs`;
		let res = execSync(bashCompletion, {cwd: wsFolder});
		targets = res.toString().split(" ");
		context.workspaceState.update('targets', targets);
	}

	let lastTarget = context.workspaceState.get<string>("lastTarget");
	if (lastTarget) {
		const index = targets.indexOf(lastTarget);
		if (index !== -1) {
			targets.splice(index, 1);
		}
		return [lastTarget].concat(targets);
	}

	return targets;
};

const sendTextToTerminal = async (text: string) => {
	if (ensureTerminalExists()) {
	  const terminal = await selectTerminal();
  
	  if (terminal) {
		terminal.show();
		terminal.sendText(text);
	  }
	}
};

const sendTextsToTerminal = async (texts: string[]) => {
	for (let i = 0; i < texts.length; i++) {
		sendTextToTerminal(texts[i]);
	}
};

const getWorkspaceFolder = () => {
	if (vscode.window.activeTextEditor) {
		let filePath = path.dirname(vscode.window.activeTextEditor.document.fileName);
		let workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			return "";
		}
		let wsFolder = workspaceFolders?.find(folder => filePath.indexOf(folder.uri.path) >= 0);
		if (!wsFolder) {
			return "";
		}
		return wsFolder.uri.path;
	}
	return "";
};

// This method is called when your extension is deactivated
export function deactivate() {}
