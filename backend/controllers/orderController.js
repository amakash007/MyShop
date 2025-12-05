// import { currency } from '../../admin/src/App.jsx';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay'
// GLOBAL VARIABLES
const currency = "inr"
const deliveryCharge = 10

// GATEWAY INITiAILISE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// PLACING ORDERS USING COD METHOD
const placeOrder = async(req, res) => {
    try{
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: "ORDER PLACED"})

    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// PLACING ORDERS USING RAZORPAY METHOD
const placeOrderRazorpay = async(req,res)=>{
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "RAZORPAY",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options ={
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.json({success: false, message: error})
            }
            res.json({success: true, order})
        })
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// VERIFY RAZORPAY METHOD
const verifyRazorpay = async(req,res) => {
    try {
        const { userId, razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        // console.log(orderInfo);
        if(orderInfo.status === "paid"){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.json({success: true, message: "PAYMENT SUCCESSFUL"});
        } else{
            res.json({success: false, message: "PAYMENT FAILED"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// PLACING ORDERS USING STRIPE METHOD
const placeOrderStripe = async(req,res)=>{
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "STRIPE",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "DELIVERY CHARGES"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        })

        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// vERIFY STRIPE METHOD
const verifyStripe = async(req, res) => {
    const {orderId, success, userId} = req.body;
    try {
        if(success === true){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData: {}});
            res.json({success: true});
        } else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// ALL ORDERS DATA FOR ADMIN PANEL
const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders});
    } catch (error) {
        console.log();
        res.json({success: false, message: error.message});
    }
}

// USER ORDER DATA FOR FRONTEND
const userOrders = async(req,res )=> {
    try{
        const {userId} = req.body;
        const orders = await orderModel.find({ userId})
        res.json({success: true, orders})
    } catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// UPDATE ORDER STATUS FROM ADMIN PANEL 
const updateStatus = async(req,res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: "STATUS UPDATED"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { placeOrder, placeOrderRazorpay, allOrders, userOrders, updateStatus, placeOrderStripe, verifyStripe, verifyRazorpay };