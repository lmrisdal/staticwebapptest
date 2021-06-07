import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Tank } from "src/app/models/station.class";

@Component({
    selector: 'app-tank-modal',
    templateUrl: './tank-modal.component.html',
})
export class TankModalComponent implements OnInit {

    tableTitles = ['Navn', 'Fra Dato', 'Til Dato', 'Beskrivelse', 'Operations'];

    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: {
            'keyword': string,
            'tank': Tank
        }) {


    }

    ngOnInit() {
        console.log(this.data.tank);
    }


}

