import * as vscode from "vscode";
import { getOpenAIDescription } from "./openai";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand("explaincode.explainCode", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage("No active editor found.");
            return;
        }

        const selection = editor.selection;
        const selectedCode = editor.document.getText(selection);

        if (!selectedCode) {
            vscode.window.showErrorMessage("No code selected.");
            return;
        }

        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Generating code explanation...",
        }, async () => {
            const prompt = `解释下面这段${editor.document.languageId}代码，将你的解释转化为注释插入到源代码后输出包含注释的源代码：${selectedCode}`;
            const explanation = await getOpenAIDescription(prompt);

            if (!explanation) {
                vscode.window.showErrorMessage("Could not generate an explanation.");
                return;
            }

            editor.edit((editBuilder) => {
                editBuilder.replace(selection, explanation);
            });
        });

    });

    context.subscriptions.push(disposable);
}


export function deactivate() { }
