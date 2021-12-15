// See also https://code.visualstudio.com/api/references/vscode-api
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");

class DmlDocumentSymbolProvider {

	addNode(r, d, s, e, nn, ns, np) {
		const si = new vscode.SymbolInformation(nn, ns, np, new vscode.Location(d.uri, new vscode.Range(new vscode.Position(s, 0), new vscode.Position(e, 0))));
		r.push(si);
	}

	provideDocumentSymbols(document, token) {
		const result = [];

		// Forms
		const formBRegex = /^[ \t]*(MENU_|PROCEDURE_|QUERY_|REPORT_|TABLE_)*FORM[ \t]*([a-zA-Z0-9_]+)/;
		const formERegex = /^[ \t]*END_FORM/;
		const formSymbol = vscode.SymbolKind.Class;
		let curFormStart = 0;
		let curFormName = null;

		// Blocks
		const blockBRegex = /^[ \t]*BEGIN_BLOCK[ \t]*(\/DISPLAY_ONLY)*[ \t]*([a-zA-Z0-9_]+)/;
		const blockERegex = /^[ \t]*END_BLOCK/;
		const blockSymbol = vscode.SymbolKind.Function;
		let curBlockStart = 0;
		let curBlockName = null;

		// Check each line
		for (let line = 0; line < document.lineCount; line++) {
			const { text } = document.lineAt(line);

			// Find Form Begin
			const formBMatched = text.match(formBRegex);
			if (formBMatched) {
				// Do we have a Form without Form End?
				if (curFormName != null) {
					// Do we have a Block without Block End?
					if (curBlockName != null) {
						this.addNode(result,document,curBlockStart,line,curBlockName,blockSymbol,curFormName);
						curBlockName = null;
					}
					this.addNode(result,document,curFormStart,line,curFormName,formSymbol,'');
				}
				curFormStart = line;
				curFormName = formBMatched[2];
				continue;
			}

			// Only proceed if we have a form
			if (curFormName != null) {
				// Find Block Begin
				const blockBMatched = text.match(blockBRegex);
				if (blockBMatched) {
					// Do we have a Block without Block End?
					if (curBlockName != null) {
						this.addNode(result,document,curBlockStart,line,curBlockName,blockSymbol,curFormName);
					}
					curBlockStart = line;
					curBlockName = blockBMatched[2];
					continue;
				}

				// Only proceed if we have a block
				if (curBlockName != null) {
					// Find Block End
					const blockEMatched = text.match(blockERegex);
					if (blockEMatched) {
						this.addNode(result,document,curBlockStart,line,curBlockName,blockSymbol,curFormName);
						curBlockName = null;
						continue;
					}
				}

				// Find Form End
				const formEMatched = text.match(formERegex);
				if (formEMatched) {
					// Do we have a Block without Block End?
					if (curBlockName != null) {
						this.addNode(result,document,curBlockStart,line,curBlockName,blockSymbol,curFormName);
						curBlockName = null;
					}
					this.addNode(result,document,curFormStart,line,curFormName,formSymbol,'');
					curFormName = null;
					continue;
				}
			}

		}

		// Do we have a form?
		if (curFormName != null) {
			// Do we have a block?
			if (curBlockName != null) {
				this.addNode(result,document,curBlockStart,line,curBlockName,blockSymbol,curFormName);
			}
			this.addNode(result,document,curFormStart,document.lineCount -1,curFormName,formSymbol,'');
		}
		return result;
	}
}
exports.DmlDocumentSymbolProvider = DmlDocumentSymbolProvider;
