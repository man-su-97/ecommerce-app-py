import productImg from "../assets/demo-product.jpeg";
import DeleteIcon from "../components/DeleteIcon";

function Cart() {
  const price = 15;
  const quantity = 2;
  const total = price * quantity;
  const address = "West Bengal";
  return (
    <div className="px-40 flex">
      <main className="w-1/2 flex flex-col">
        <h1>My Cart</h1>
        <hr className="border-t-2 border-black-300 my-4" />

        <div className="flex items-center justify-around">
          <div>
            <img src={productImg} alt="product" />
          </div>
          <div>
            <h2>Product Name</h2>
            <p>{`₹${price}`}</p>
          </div>
          <div>
            <div className="flex border-black border">
              <button className="px-1" onClick={() => quantity}>
                -
              </button>
              <p className="px-3">{quantity}</p>
              <button className="px-1" onClick={() => quantity}>
                +
              </button>
            </div>
            <p>{quantity}</p>
          </div>
          <div>
            <button>
              <DeleteIcon />
            </button>
          </div>
        </div>
        <hr className="border-t-2 border-black-300 my-4" />
      </main>
      <aside className="w-1/2 flex flex-col">
        <h2>Order Summary</h2>
        <div className="my-10">
          <hr className="border-t-2 border-black-300 my-4" />
          <p>Subtotal: ₹{price * quantity}</p>
          <p>Delivery: ₹50</p>
          <p>{address}</p>
          <hr className="border-t-2 border-black-300 my-4" />
        </div>
        <div className="flex flex-col justify-between items-start">
          <p>Total ₹{total}</p>
          <button className="text-white bg-[#5E5E4A] px-10">Checkout</button>
        </div>
      </aside>
    </div>
  );
}

export default Cart;
