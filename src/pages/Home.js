import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    navigate('/login'); // Redirect to the login page
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchProducts = async () => {
      const token = localStorage.getItem('jwtToken');
      console.log(token, 'kokok');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/product', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const result = await response.json();
          
          if (response.ok) {
            setProducts(result.products); // Assuming the API response contains a "products" field
          } else {
            toast.error(result.message || 'Failed to fetch products');
            if (response.status === 401) { // Unauthorized
              handleLogout();
            }
          }
        } catch (error) {
          toast.error('An error occurred while fetching products');
          console.error('An error occurred while fetching products:', error);
        }
      } else {
        toast.error('No JWT token found. Please log in again.');
        handleLogout();
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      
      <h2>Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products available or failed to fetch products.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
