export class Vote {
    constructor(
        public id: string,
        public rating: number,
        public location: {lon: number, lat: number},
        public time: number
    ) {}
}