import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Service } from "src/app/models/station.class";

@Component({
    selector: 'app-service-modal',
    templateUrl: './service-modal.component.html',
})
export class ServiceModalComponent implements OnInit {

    tableTitles = ['Navn', 'Fra Dato', 'Til Dato', 'Beskrivelse', 'Operations'];

    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: {
            'keyword': string,
            'service': string,
        }) {


    }

    ngOnInit() {
        console.log(this.data.service);
    }

    test(test: string) {
        console.log(test);
    }

}

