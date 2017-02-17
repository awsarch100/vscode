/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import 'vs/css!../browser/media/exceptionWidget';
import * as nls from 'vs/nls';
import { ZoneWidget } from 'vs/editor/contrib/zoneWidget/browser/zoneWidget';
import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { IContextViewService } from 'vs/platform/contextview/browser/contextView';
import { IDebugService } from 'vs/workbench/parts/debug/common/debug';
import * as strings from 'vs/base/common/strings';

import * as dom from 'vs/base/browser/dom';

export class ExceptionWidget extends ZoneWidget {


	constructor(editor: ICodeEditor, private lineNumber: number,
		@IContextViewService private contextViewService: IContextViewService,
		@IDebugService private debugService: IDebugService
	) {
		super(editor, { showFrame: true, showArrow: false, frameWidth: 1 });

		this.create();
	}

	protected _fillContainer(container: HTMLElement): void {
		dom.addClass(container, 'exception-widget monaco-editor-background');

		const thread = this.debugService.getViewModel().focusedThread;
		if (thread && thread.stoppedDetails) {
			const exceptionThrown = nls.localize('exceptionThrown', "Exception occured: {0}", thread.stoppedDetails.text);
			container.textContent = exceptionThrown;
		}
	}

	protected _doLayout(heightInPixel: number, widthInPixel: number): void {
		var height = Math.ceil(this.editor.getConfiguration().lineHeight * 1.2);
		this.container.style.height = strings.format('{0}px', height);
		this.container.style.lineHeight = this.container.style.height;
	}
}
