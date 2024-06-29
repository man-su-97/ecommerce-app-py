import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photos: [
      {
        public_id: {
          type: String,
          required: [true, "Please enter Public ID"],
        },
        url: {
          type: String,
          required: [true, "Please enter URL"],
        },
      },
    ],
    price: {
      type: Number,
      required: [true, "Please enter Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter Category"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Please enter Description"],
    },

    ratings: {
      type: Number,
      default: 0,
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "please enter Name"],
//     },
//     photo: {
//       type: String,
//       required: [true, "Please upload photo"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Please enter price"],
//     },
//     description: {
//       type: String,
//       required: [true, "Please enter Description"],
//     },
//     stock: {
//       type: Number,
//       required: [true, "Please enter stock"],
//     },
//     category: {
//       type: String,
//       required: [true, "Please enter category"],
//       trim: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const Product = mongoose.model("Product", productSchema);
