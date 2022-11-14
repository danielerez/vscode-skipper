# Skipper for Visual Studio Code

The Skipper extension provides integration with the Command Palette (Ctrl+Shift+P on Linux/Windows and Cmd+Shift+P on Mac).

This extension relies on the [Skipper](https://github.com/Stratoscale/skipper) tool for invoking commands using the Command Palette.

Note: the illustrations here are based on [assisted-service](https://github.com/openshift/assisted-service) repository. 

## Features

The following command are supported in the Command Palette:

### skipper: make

Displays a list of targets available in the Makefile and invokes the selected target in terminal.
I.e. `skipper make <target>`

<p align="center">
<img src="images/skipper_make.gif" width=75%>
<br/>
<em>(skipper make lint)</em>
</p>

### skipper: make generate

Filters only the `generate-*` targets for easier access.

<p align="center">
<img src="images/skipper_make_generate.gif" width=75%>
<br/>
<em>(skipper make generate-keys)</em>
</p>

### skipper: make unit-test

Invokes `unit-test` target on the package of the opened file.
I.e. `skipper make unit-test TEST=<file_path>`

<p align="center">
<img src="images/skipper_make_unit_test.gif" width=75%>
<br/>
<em>(skipper make unit-test)</em>
</p>

Apply cover profile to show test coverage:

<p align="center">
<img src="images/apply_cover_profile.gif" width=75%>
<br/>
<em>Go Apply Cover Profile</em>
</p>

## Requirements

* [Skipper](https://github.com/Stratoscale/skipper) tool should be available in path.






---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
