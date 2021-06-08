import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './models/message.class';
import { Station } from './models/station.class';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'yx-stations';
    scripts: any;
    baseUrl = 'https://12d26a8f-2153-4d4d-ac09-f4b9c72711c8.mock.pstmn.io/stations';

    constructor(private http: HttpClient) {

    }

    public async getMessage(): Promise<Station[]> {
        try {
            return await this.http.get<Station[]>(this.baseUrl).toPromise();
        } catch (e) {
            throw e;
        }
    }

    async loadData() {
        const message = await this.getMessage();
        console.log(message);
    }

}
