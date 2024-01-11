import {Component, OnInit} from '@angular/core';
import {HolidaysService} from "../holidays.service";
import {NzTableComponent} from "ng-zorro-antd/table";
import {NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
	selector: 'app-welcome',
	standalone: true,
	templateUrl: './welcome.component.html',
	imports: [
		NzTableComponent,
		NgForOf,
		NzButtonComponent,
		NzInputDirective,
		FormsModule,
		NzRowDirective,
		NzColDirective,
		NzSpinComponent,
		NgIf,
		NzUploadComponent
	],
	styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

	public isLoading = false;
	public saveIsLoading = false;

	public holidays: any[] = [];
	public importedHolidays: any[] = [];

	public year: number = 2024;

	constructor(
		public holidaysService: HolidaysService,
		private msg: NzMessageService
	) {
	}

	ngOnInit() {
	}

	public getFeiertage(): void {
		this.isLoading = true;
		this.holidaysService.getFeiertage(this.year)
			.subscribe(data => {
				this.holidays = data.feiertage;
				this.msg.info('Feiertage wurden geladen')
				console.log(this.holidays);
				this.isLoading = false;
			}, error => {
				this.msg.info('Feiertage konnten nicht geladen werden')
			});
	}

	public setFeiertage(): void {
		this.saveIsLoading = true;
		const feiertageJson = JSON.stringify(this.holidays);
		this.downloadFile(feiertageJson, 'Feiertage')
		this.saveIsLoading = false;
	}

	private downloadFile(content: string, fileName: string): void {
		console.log('download')
		const blob = new Blob([content], {type: 'application/json'});

		const a = document.createElement('a');
		const url = URL.createObjectURL(blob);

		a.href = url;
		a.download = fileName;

		document.body.appendChild(a);
		a.click();

		setTimeout(() => {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}

	public uploadJSON(info: NzUploadChangeParam): void {
		console.log(info);
		if (info.file.status === 'done') {
			this.msg.success(`${info.file.name} wurde erfolgreich hochgeladen.`);

			const reader: FileReader = new FileReader();
			reader.onload = (e: any) => {
				try {
					const importedData = JSON.parse(e.target.result);
					this.importedHolidays = importedData;
				} catch (error) {
					this.msg.error('Fehler');
				}
			};

			reader.readAsText(info.file.originFileObj!);
		} else if (info.file.status === 'error') {
			this.msg.error(`${info.file.name} konnte nicht hochgeladen werden.`);
		}
	}

	public reset(): void {
	    this.holidays = []
	}
}
