// See also https://code.visualstudio.com/api/references/vscode-api
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dmlSymbolProvider = require("./dmlSymbolProvider.js");

function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider([
        { language: 'dml', pattern: '**/*.{dml}' },
        { language: 'dml', scheme: 'untitled' },
    ], new dmlSymbolProvider.DmlDocumentSymbolProvider()));
}

exports.activate = activate;

function deactivate() {
}

exports.deactivate = deactivate;
