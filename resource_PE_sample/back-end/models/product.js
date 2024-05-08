import mongoose, {Schema} from "mongoose";

// Image object schema
const imageSchema = new Schema({
    "url":{
        type: String
    },
    "caption": {
        type: String
    }
},
    {
        timestamps: true
    }
);

// Comment object schema
const commentSchema = new Schema({
    "rate": {
        type: Number,
        min: 1,
        max: 5
    },
    "text":{
        type:String
    },
    "author":{
        type:String
    }
},{
    timestamps:true
});

// Product object schema
const productSchema = new Schema({
    "name": {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        unique: [true, 'Product name is unique value']
    },
    "price": {
        type: Number,
        default: 0,
        validate(value){
            if(value<0) throw new Error("Price must be a number and greater than or equal zero");
        }
    },
    "description":{
        type: String,
        required: true
    },
    "images": [imageSchema],
    "comments": [commentSchema],
    "category": {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
},{
    timestamps: true
});

// Create Product model mapping DB
const Products = mongoose.model("Products", productSchema);
// Export model
export default Products;
