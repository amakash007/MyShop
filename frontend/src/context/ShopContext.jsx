import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const deliveryFee = 10;
    const backendUrl = "https://myshop-29wz.onrender.com"; 

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [productList, setProductList] = useState([]); 
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    // Add to Cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            return toast.error("Please select a size");
        }

        let cartData = { ...cartItems };
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                console.error(error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
    };

    // Get total cart count
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, item) => {
            return total + Object.values(item).reduce((sum, qty) => sum + qty, 0);
        }, 0);
    };

    // Update Cart Quantity
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = { ...cartItems };
        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
            cartData[itemId][size] = quantity;
            setCartItems(cartData);

            if (token) {
                try {
                    await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
                } catch (error) {
                    console.error(error.response?.data || error.message);
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            }
        }
    };

    // Get Cart Amount
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const itemInfo = productList.find((product) => product._id === itemId);
            if (itemInfo) {
                total += Object.values(sizes).reduce((sum, qty) => sum + itemInfo.price * qty, 0);
            }
            return total;
        }, 0);
    };

    // Fetch Products from Backend
    const getProductData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProductList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to load products");
        }
    };

    // Fetch User Cart Data
    const getUserCart = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to load cart");
        }
    };

    // Fetch Products on Load
    useEffect(() => {
        getProductData();
    }, []);

    // Load User Cart if Token Exists
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!token && storedToken) {
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, [token]);

    const value = {
        products: productList, // Fixed conflict
        currency,
        deliveryFee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
