# Gembase DML Editor Extension for Visual Studio Code

This extension provides Syntax highlighting and Snippets for Gembase DML (Data Manipulation Language).

# Features
Syntax highligting and auto-complete using snippets for most DML code blocks, forms, expressions, statements, and functions.  Use the tab key to auto-complete or jump between tab-stops.

Note: Syntax colorization should work on most themes.  It was tested againt the default Visual Studio Code light and dark themes: Dark+ (default dark) and Light+ (Default Light.  Some color themes like "Dark (Visual Studio) and "Light (Visaul Studio)" don't include colorizing for things like variables.  This is intended behavior as it's a design decision by the theme author to leave out colorization for such.

# Warning
This extension is in alpha.  It may generate bad code that doesn't compile.  Standard precautions apply (use this extension in a test environment before using it in production, make sure you have backups and version control on your code, etc.)

## Issues and Contributions
If you find any issues or have feature requests report them here:

https://gitlab.com/ross-sig/vscode-gembase-dml/issues

If you'd like to make any contributions create a pull request.

https://gitlab.com/ross-sig/vscode-gembase-dml.git

# Installing

This plugin can be found on the Visual Studio Marketplace:

https://marketplace.visualstudio.com/items?itemName=litehouse.dml

To use it, first install Visual Studio Code: https://code.visualstudio.com/

Then isntall the DML extension by opening Visual Studio Code and type \[Ctrl+P\] "ext install dml" \[enter\]

# Screenshots

![Screenshot](https://gitlab.com/ross-sig/vscode-gembase-dml/raw/master/dml_editor.gif "DML Edior Screenshot")


