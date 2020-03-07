import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	jsonForm = this.fb.group({
		inputJson: [''],
	})

	constructor(private fb: FormBuilder) {}

	title = 'JsonPrinterPrettiffy';

	setJson;
	stringfyJson: string = '';

	jsonPrettified: string = 'Teste 1';
	jsonPrettifiedColored: string = 'Teste 2'

	ngOnInit() {}

	prettify(){
		this.setJson = JSON.parse(`${this.jsonForm.controls.inputJson.value}`);
		this.stringfyJson = JSON.stringify(this.setJson, undefined, 4);
		this.jsonPrettified = this.syntaxHighlight(this.stringfyJson);
		this.output(this.syntaxHighlight(this.stringfyJson))
		console.log(this.jsonForm.controls.inputJson.value);
	}

	syntaxHighlight(json) {
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			let cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
	}
	output(res) {
		document.querySelector('#preJson').innerHTML = res;
	}
}
