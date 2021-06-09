import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ExternalId, Service, Tank } from "src/app/models/station.class";

@Component({
    selector: 'app-externalid-modal',
    templateUrl: './externalid-modal.component.html',
})
export class ExternalIdModalComponent implements OnInit {

    tableTitles = ['Navn', 'Fra Dato', 'Til Dato', 'Beskrivelse', 'Operations'];

    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: {
            'keyword': string,
            'tanks': Tank[]
        }) {


    }

    ngOnInit() {
        console.log(this.data.tanks);
    }
}

