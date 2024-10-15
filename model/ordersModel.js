const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let connect = mongoose.connect(process.env.MONGO_URL);

connect
  .then(() => {
    console.log('connected to database')
  })
  .catch((err) => {
    console.log(`order error ${err}`);
  });

  const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    userName:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }],
    totalPrice:{
        type:Number,
        required:true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryInstructions:{
        type:String,
        default:'Nil'
    },
    status: {
        type: String,
        default:'Pending',
        enum: ['Cancelled','Returned','Delivered','Pending']
    },
    completionDate: {
        type: Date,
    },
    deliveryDate: Date,
    paymentMethod: {
        type: String,
        required:true,
        enum: ['COD', 'Online Payment', 'Wallet Payment']
    },
    paymentStatus:{
        type: String,
        default:'Pending'
    }
}, { timestamps: true });

const OrdersModel = mongoose.model('orders', orderSchema);

module.exports = {OrdersModel};