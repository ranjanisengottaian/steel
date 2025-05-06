// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import './Cart.css';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { token } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate(); // ✅ useNavigate must be inside component

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/cart', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(res.data);
//     } catch (err) {
//       console.error('Error loading cart:', err);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchCart();
//   }, [token]);

//   const updateQuantity = async (itemId, type) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/cart/update/${itemId}`,
//         { type },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchCart();
//     } catch (err) {
//       console.error('Error updating quantity:', err);
//     }
//   };

//   const removeItem = async (itemId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/cart/delete/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchCart();
//     } catch (err) {
//       console.error('Error removing item:', err);
//     }
//   };

//   const getTotal = () => {
//     return cartItems.reduce(
//       (sum, item) => sum + item.quantity * (item.productId.price || 0),
//       0
//     );
//   };

//   const goToCheckout = () => {
//     navigate('/checkout'); // ✅ Redirect to checkout page
//   };

//   return (
//     <div className="cart-container">
//       <h2 className="cart-title">🛒 Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p className="empty-message">Your cart is empty.</p>
//       ) : (
//         <>
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div key={item._id} className="cart-item">
//                 <img
//                   src={item.productId.imageUrl ? item.productId.imageUrl : '/img/default-product.jpg'}
//                   alt={item.productId.name}
//                   className="cart-item-image"
//                 />
//                 <div className="cart-item-details">
//                   <h4>{item.productId.name}</h4>
//                   <p>Price: ₹{item.productId.price}</p>
//                   <div className="quantity-controls">
//                     <button onClick={() => updateQuantity(item._id, 'decrease')}>−</button>
//                     <span>{item.quantity}</span>
//                     <button onClick={() => updateQuantity(item._id, 'increase')}>+</button>
//                   </div>
//                   <p>Total: ₹{item.quantity * item.productId.price}</p>
//                   <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="cart-total">
//             <h3>Total Amount: ₹{getTotal()}</h3>
//             <button
//               className="checkout-btn"
//               onClick={goToCheckout}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error('Error loading cart:', err);
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const updateQuantity = async (itemId, type) => {
    try {
      await axios.put(
        `http://localhost:5000/api/cart/update/${itemId}`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/delete/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity * (item.productId.price || 0),
      0
    );
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h2>Shopping cart</h2>
        
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item-row" key={item._id}>
                <img
                  src={item.productId.imageUrl || '/img/default-product.jpg'}
                  alt={item.productId.name}
                  className="cart-image"
                />
                <div className="cart-details">
                  <div className="cart-product-title">{item.productId.name}</div>
                  <div className="cart-subtext">
                    {item.productId.category} 
                  </div>
                </div>
                <div className="cart-quantity">
                  <button onClick={() => updateQuantity(item._id, 'decrease')}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 'increase')}>+</button>
                </div>
                <div className="cart-price">₹{(item.productId.price * item.quantity).toFixed(2)}</div>
                <div className="cart-delete" onClick={() => removeItem(item._id)}>🗑️</div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="discount-area">
              <input type="text" placeholder="discount code/gift card" />
              <button>Apply</button>
            </div>
            <div className="checkout-area">
              <div className="cart-total">
                <strong>Total: ₹{getTotal().toFixed(2)}</strong>
              </div>
              <button className="proceed-btn" onClick={goToCheckout}>
                Proceed to Pay
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

