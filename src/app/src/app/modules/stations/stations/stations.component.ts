import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Service, Station } from 'src/app/models/station.class';
import { EditStationComponent } from '../edit-station/edit-station.component';

@Component({
    selector: 'app-stations',
    templateUrl: './stations.component.html',
    styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
    stationDetails: Station[];
    service: Service[];

    tableTitles = ['Chain', 'Region', 'Stasjon', 'Type', 'Adresse', 'Sted', 'Responsible', 'Operasjoner'];
    stationOverview: Station[] = [{
        "id": 332,
        "siteId": 10400332,
        "name": "YX-Mones",
        "displayName": "YX Mones",
        "branch": "YX",
        "region": "Sør",
        "type": "Drivstoff",
        "phone": "38 26 49 00",
        "email": "mones@st.yx.no",
        "owner": "Vidar Bergheim",
        "responsible": "Vidar Bergheim",
        "address": {
            "street": "Skogsfjordveien 148",
            "postalCode": 4513,
            "city": "Mandal",
            "countryIsoTwoLetter": "NOR",
            "countryIsoThreeLetter": "NOR",
            "country": "Norge"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                7.4334901009825884,
                58.03952402813606
            ]
        },
        "services": [
            "95 Blyfri",
            "Diesel",
            "YX Butikk"
        ],
        "tanks": [
            {
                "id": 1,
                "name": "Tank A1",
                "tankGroupId": 1,
                "fuelProductId": 99004,
                "fuelProductSkanolProductId": 2017800,
                "fuelProductName": "Diesel",
                "Capasity": 20000,
                "Auto": "on"
            },
            {
                "id": 2,
                "name": "Tank A2",
                "tankGroupId": 1,
                "fuelProductId": 99004,
                "fuelProductSkanolProductId": 2017800,
                "fuelProductName": "Diesel",
                "Capasity": 25000,
                "Auto": "on"
            },
            {
                "id": 3,
                "name": "Tank B1",
                "tankGroupId": 2,
                "fuelProductId": 99001,
                "fuelProductSkanolProductId": 2013200,
                "fuelProductName": "95 Blyfri",
                "Capasity": 25000,
                "Auto": "on"
            },
            {
                "id": 4,
                "name": "Tank A3",
                "tankGroupId": 1,
                "fuelProductId": 99004,
                "fuelProductSkanolProductId": 2017800,
                "fuelProductName": "Diesel",
                "Capasity": 10000,
                "Auto": "on"
            }
        ]
    },
    {
        "id": 353,
        "siteId": 10400353,
        "name": "YX-Stord",
        "displayName": "YX Stord",
        "branch": "YX",
        "region": "Vest",
        "type": "Drivstoff",
        "phone": "53 41 26 70",
        "email": "stord@st.yx.no",
        "owner": "Haldis Aase",
        "responsible": "Glenn Aase",
        "address": {
            "street": "Rundehaugen 15",
            "postalCode": 5412,
            "city": "Stord",
            "countryIsoTwoLetter": "NOR",
            "countryIsoThreeLetter": "NOR",
            "country": "Norge"
        },
        "location": {
            "type": "Point",
            "coordinates": [
                5.4568209757864174,
                59.763506521788514
            ]
        },
        "services": [
            "98 Blyfri",
            "95 Blyfri",
            "Diesel",
            "Bilvask",
            "7-eleven"
        ],
        "tanks": [
            {
                "id": 1,
                "name": "Tank A1",
                "tankGroupId": 1,
                "fuelProductId": 99004,
                "fuelProductSkanolProductId": 2017800,
                "fuelProductName": "Diesel",
                "Capasity": 15000,
                "Auto": "on"
            },
            {
                "id": 2,
                "name": "Tank C1",
                "tankGroupId": 3,
                "fuelProductId": 99005,
                "fuelProductSkanolProductId": 2013100,
                "fuelProductName": "98 Blyfri",
                "Capasity": 20000,
                "Auto": "on"
            },
            {
                "id": 3,
                "name": "Tank B1",
                "tankGroupId": 2,
                "fuelProductId": 99001,
                "fuelProductSkanolProductId": 2013200,
                "fuelProductName": "95 Blyfri",
                "Capasity": 30000,
                "Auto": "on"
            },
            {
                "id": 4,
                "name": "Tank A2",
                "tankGroupId": 1,
                "fuelProductId": 99004,
                "fuelProductSkanolProductId": 2017800,
                "fuelProductName": "Diesel",
                "Capasity": 30000,
                "Auto": "on"
            }
        ]
        //     id: '123',
        //     chain: 'YX',
        //     region: 'Øst',
        //     station: 1235678,
        //     postNumber: 1234,
        //     country: 'Norge',
        //     landlinePhone: 12345678,
        //     mobilePhone: 74859365,
        //     email: 'eksempel@yx.no',
        //     geoposition: { 'width': 1234, 'length': 1234 },
        //     type: 'Full Service',
        //     address: 'Nittedalsveien 1',
        //     place: 'Nittedal',
        //     responsible: 'Ola Jensen',
        //     services: [{
        //         name: 'Luft',
        //         fromDate: new Date(),
        //         toDate: new Date(),
        //         description: 'Dekkluft'
        //     },
        //     {
        //         name: 'Vann',
        //         fromDate: new Date(),
        //         toDate: new Date(),
        //         description: 'Drikkevann'
        //     }, {
        //         name: 'Personbilvask',
        //         fromDate: new Date(),
        //         toDate: new Date(),
        //         description: 'Vask av personbil'
        //     }],
        //     externalIds: [{
        //         partner: 'YX',
        //         system: 'Visma',
        //         id: '12345678',
        //     },
        //     {
        //         partner: 'PayEx',
        //         system: 'PaymentCards',
        //         id: '54545412345445678',
        //     }],
        //     tanks: [{
        //         tankId: '123',
        //         name: 'Tank A1',
        //         capacity: '1000 L',
        //         group: 'A',
        //         product: '95-Bensin',
        //         autoCount: false,
        //         noDip: true,
        //         comment: 'Ok',
        //     },
        //     {
        //         tankId: '123',
        //         name: 'Tank A2',
        //         capacity: '2000 L',
        //         group: 'A',
        //         product: 'Diesel',
        //         autoCount: false,
        //         noDip: true,
        //         comment: 'Ok',
        //     },
        //     {
        //         tankId: '123',
        //         name: 'AdBlue',
        //         capacity: '500 L',
        //         group: 'B',
        //         product: 'AdBlue',
        //         autoCount: false,
        //         noDip: false,
        //         comment: 'Ok',
        //     },
        //     {
        //         tankId: '123',
        //         name: 'Tank A3',
        //         capacity: '2000 L',
        //         group: 'B',
        //         product: '95-Blyfri',
        //         autoCount: true,
        //         noDip: false,
        //         comment: 'I Uorden',
        //     }],
        // },
        // {
        //     id: '123',
        //     chain: 'YX',
        //     region: 'Sør',
        //     station: 87654321,
        //     postNumber: 4321,
        //     country: 'Norge',
        //     landlinePhone: 12345678,
        //     mobilePhone: 74859465,
        //     email: 'eksempel2@yx.no',
        //     geoposition: { 'width': 4321, 'length': 4444 },
        //     type: 'Truck',
        //     address: 'Arendalsveien 2',
        //     place: 'Arendal',
        //     responsible: 'Petra Olsen',
        //     services: [{
        //         name: 'Luft',
        //         fromDate: new Date(),
        //         toDate: new Date(),
        //         description: 'Dekkluft'
        //     },
        //     {
        //         name: 'Vann',
        //         fromDate: new Date(),
        //         toDate: new Date(),
        //         description: 'Drikkevann'
        //     }, {
        //         name: 'Personbilvask',
        //         fromDate: new Date(),
        //         toDate: new Date(),
        //         description: 'Vask av personbil'
        //     }],
        //     externalIds: [{
        //         partner: 'YX',
        //         system: 'Visma',
        //         id: '12345678',
        //     },
        //     {
        //         partner: 'PayEx',
        //         system: 'PaymentCards',
        //         id: '54545412345445678',
        //     }],
        //     tanks: [{
        //         tankId: '123',
        //         name: 'Tank A1',
        //         capacity: '1000 L',
        //         group: 'A',
        //         product: '95-Bensin',
        //         autoCount: false,
        //         noDip: true,
        //         comment: 'Ok',
        //     },
        //     {
        //         tankId: '123',
        //         name: 'Tank A2',
        //         capacity: '2000 L',
        //         group: 'A',
        //         product: 'Diesel',
        //         autoCount: false,
        //         noDip: true,
        //         comment: 'Ok',
        //     },
        //     {
        //         tankId: '123',
        //         name: 'AdBlue',
        //         capacity: '500 L',
        //         group: 'B',
        //         product: 'AdBlue',
        //         autoCount: false,
        //         noDip: false,
        //         comment: 'Ok',
        //     },
        //     {
        //         tankId: '123',
        //         name: 'Tank A3',
        //         capacity: '2000 L',
        //         group: 'B',
        //         product: '95-Blyfri',
        //         autoCount: true,
        //         noDip: false,
        //         comment: 'I Uorden',
        //     }],
    }]
    constructor(
        public dialog: MatDialog
    ) {
        this.stationDetails = [];
        this.service = [];
    }

    ngOnInit() {
        for (let station of this.stationOverview) {
            this.stationDetails.push(station);
        }

        console.log(this.stationDetails);
    }


    editStation(keyword: string, station?: Station) {
        console.log(station);
        const savedStation: any = [];
        this.stationDetails.forEach(val => savedStation.push(Object.assign({}, val)));
        if (keyword === 'add') {
            station = new Station();
            station.id = 123;
            station.branch = 'YX';
            this.stationDetails.push(station);
            this.stationDetails = [...this.stationDetails];
        }
        const dialogRef = this.dialog.open(EditStationComponent, {
            data: {
                'station': station,
                'keyword': keyword,
            },
            panelClass: 'custom-modalbox'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'close') {
                console.log(savedStation);
                this.stationDetails = savedStation;
            }
        });
    }

    tankDetailsOpen(keyword: string, stationDetail: any) {
        console.log(stationDetail);
        // const dialogRef = this.dialog.open(TankDetailsModalComponent, {
        //   data: {
        //     'keyword': keyword,
        //     'tanks': stationDetail.tanks
        //   }
        // })
    }
}
