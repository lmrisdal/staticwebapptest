import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './models/message.class';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'yx-stations';

    constructor(private http: HttpClient) {
        this.loadData();
    }

    public async getMessage(): Promise<Message> {
        try {
            return await this.http.get<Message>('/api/message').toPromise();
        } catch (e) {
            throw e;
        }
    }

    async loadData() {
        const message = await this.getMessage();
        console.log(message);
    }
}
