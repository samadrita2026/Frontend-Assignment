import { useState } from "react";
import "../App.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1999,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1799,
    category: "Fashion",
  },
  {
    id: 4,
    name: "Backpack",
    price: 999,
    category: "Accessories",
  },
  {
    id: 5,
    name: "Cotton T-Shirt",
    price: 699,
    category: "Fashion",
  },
  {
    id: 6,
    name: "Water Bottle",
    price: 499,
    category: "Accessories",
  },
];

const GST_RATE = 18;

const coupons: {
  [key: string]: number;
} = {
  SAVE10: 10,
  SAVE20: 20,
  SHOP15: 15,
};

function Header({ cartCount }: { cartCount: number }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">ShopCart</div>

        <nav className="navbar">
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cartCount})</a>
        </nav>
      </div>
    </header>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  return (
    <div className="product-card">
      <div className="product-image">
        🛍️
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p className="product-price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <button
          className="btn"
          onClick={() => onAdd(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h3>{item.name}</h3>

        <p>
          ₹{item.price.toLocaleString("en-IN")} each
        </p>
      </div>

      <div className="quantity-control">
        <button onClick={() => onDecrease(item.id)}>
          −
        </button>

        <span>{item.quantity}</span>

        <button onClick={() => onIncrease(item.id)}>
          +
        </button>
      </div>

      <div className="cart-item-total">
        <strong>
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </strong>
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
}

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  discountRate,
  couponMessage,
}: {
  cart: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  onApplyCoupon: () => void;
  discountRate: number;
  couponMessage: string;
}) {
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const discount = subtotal * (discountRate / 100);

  const amountAfterDiscount = subtotal - discount;

  const gst = amountAfterDiscount * (GST_RATE / 100);

  const grandTotal = amountAfterDiscount + gst;

  return (
    <section className="section" id="cart">
      <div className="container">

        <div className="section-title">
          <h2>Shopping Cart</h2>
          <p>Review your selected products</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart card">
            <h3>Your cart is empty</h3>
            <p>
              Add some products to your cart to continue.
            </p>
          </div>
        ) : (
          <div className="cart-layout">

            <div className="cart-items card">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                />
              ))}
            </div>

            <div className="cart-summary card">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>
                  ₹{subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="coupon-section">
                <h3>Apply Coupon</h3>

                <div className="coupon-input">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(
                        e.target.value.toUpperCase()
                      )
                    }
                  />

                  <button
                    className="btn"
                    onClick={onApplyCoupon}
                  >
                    Apply
                  </button>
                </div>

                {couponMessage && (
                  <p className="coupon-message">
                    {couponMessage}
                  </p>
                )}
              </div>

              <div className="summary-row">
                <span>
                  Discount ({discountRate}%)
                </span>

                <strong className="discount">
                  - ₹{discount.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <div className="summary-row">
                <span>GST ({GST_RATE}%)</span>

                <strong>
                  ₹{gst.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Grand Total</span>

                <strong>
                  ₹{grandTotal.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [couponCode, setCouponCode] =
    useState("");

  const [discountRate, setDiscountRate] =
    useState(0);

  const [couponMessage, setCouponMessage] =
    useState("");

  // Add product to cart
  const addToCart = (product: Product) => {
    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase quantity
  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (id: number) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  // Apply coupon
  const applyCoupon = () => {
    const discount = coupons[couponCode];

    if (discount) {
      setDiscountRate(discount);

      setCouponMessage(
        `Coupon applied! You received ${discount}% discount.`
      );
    } else {
      setDiscountRate(0);

      setCouponMessage(
        "Invalid coupon code. Try SAVE10, SAVE20 or SHOP15."
      );
    }
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Header cartCount={cartCount} />

      <main>

        <section className="hero">
          <div className="hero-content">

            <h1>
              Online <span>Shopping Cart</span>
            </h1>

            <p>
              Browse products, add them to your cart,
              apply coupons and calculate your final bill.
            </p>

          </div>
        </section>

        <section className="section" id="products">
          <div className="container">

            <div className="section-title">
              <h2>Products</h2>
              <p>Choose products you want to purchase</p>
            </div>

            <div className="product-grid">

              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                />
              ))}

            </div>

          </div>
        </section>

        <Cart
          cart={cart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeItem}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          onApplyCoupon={applyCoupon}
          discountRate={discountRate}
          couponMessage={couponMessage}
        />

      </main>

      <footer className="footer">
        <p>© 2026 ShopCart</p>
      </footer>
    </>
  );
}

export default App;