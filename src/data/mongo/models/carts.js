import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

cartSchema.pre('find', function () {
  this.populate('product_id');
});

cartSchema.pre('findOne', function () {
  this.populate('product_id');
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
