export class Restaurant {
    constructor(
        public image:String,
        public restaurantName: String,
        public userRating: {},
        public location: String,
        public menu: [],
        public ownerId: String,
        public totalRating: Number,
        public contactNumber:Number,
        public items:[]
    ) { }
}