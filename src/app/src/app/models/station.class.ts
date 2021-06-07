export class Station {
    id: number;
    siteId: number;
    name: string;
    displayName: string;
    branch: string;
    region: string;
    phone: string;
    email: string;
    owner: string;
    // geoposition: GeoPosition;
    location: Location;
    type: string;
    address: Address;
    responsible: string;
    services: string[];
    // externalIds: ExternalId[];
    tanks: Tank[];

    constructor() {
        this.id = 0;
        this.siteId = 0;
        this.name = '';
        this.displayName = ''
        this.branch = '';
        this.owner = '';
        this.region = '';
        this.phone = '';
        this.email = '';
        // this.geoposition = new GeoPosition();
        this.location = new Location();
        this.type = '';
        this.responsible = '';
        this.address = new Address();
        this.services = [];
        // this.externalIds = [];
        this.tanks = [];
    }
}

export class Location {
    type: string;
    coordinates: number[];

    constructor() {
        this.type = '';
        this.coordinates = [];
    }
}

export class Address {
    street: string;
    postalCode: number;
    city: string;
    countryIsoTwoLetter: string;
    countryIsoThreeLetter: string;
    country: string;
    constructor() {
        this.street = '';
        this.postalCode = 0;
        this.city = '';
        this.countryIsoTwoLetter = '';
        this.countryIsoThreeLetter = '';
        this.country = '';
    }
}

export class Service {
    name: string;
    fromDate: Date;
    toDate: Date;
    description: string;

    constructor() {
        this.name = '';
        this.fromDate = new Date();
        this.toDate = new Date();
        this.description = '';
    }
}

export class GeoPosition {
    width: number;
    length: number;

    constructor() {
        this.width = 0;
        this.length = 0;
    }
}

export class ExternalId {
    partner: string;
    system: string;
    id: string;

    constructor() {
        this.partner = '';
        this.system = '';
        this.id = '';
    }
}

export class Tank {
    id: number;
    tankGroupId: number;
    fuelProductId: number;
    fuelProductSkanolProductId: number;
    fuelProductName: string;
    name: string;
    Auto: string;
    Capasity: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.tankGroupId = 0;
        this.fuelProductId = 0;
        this.fuelProductSkanolProductId = 0;
        this.fuelProductName = '';
        this.Auto = 'On';
        this.Capasity = 0;
    }
}