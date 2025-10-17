<!-- ## Screenshots:

### Homepage:
![Home Page](frontend/public/e1.png)

### Product Listing:
![Product Listing](frontend/public/e2.png)



# E-Commerce Website Application

This is a full-stack e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack. The application includes user authentication, product listings, a cart system, and payment integration using Razorpay and Stripe. 

## Features:
- **User Registration and Login**: Users can sign up, log in, and securely store passwords using JWT authentication.
- **Product Listing**: Products are displayed dynamically with options to filter and search.
- **Cart Management**: Users can add items to the cart and proceed to checkout.
- **Payment Integration**: Payments are processed using Razorpay and Stripe.
- **Admin Panel**: Admins can manage products, view orders, and handle user accounts.
- **Cloudinary**: For storing and serving product images.


## Technology Stack:
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Payment Gateway**: Razorpay, Stripe
- **Authentication**: JWT, Bcrypt
- **Image Hosting**: Cloudinary


## Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/Afzal-Mia/MyShop.git
   ```

2. Install dependencies for both frontend and backend:

   - For **backend**:
     ```bash
     cd backend
     npm install
     ```

   - For **frontend**:
     ```bash
     cd frontend
     npm install
     ```

3. Create a `.env` file in the backend folder and add the following environment variables:

   ```bash
   RAZORPAY_KEY_ID=<your_razorpay_key_id>
   RAZORPAY_KEY_SECRET=<your_razorpay_key_secret>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   JWT_SECRET=<your_jwt_secret_key>
   ADMIN_EMAIL=Your_email
   ADMIN_PASSWORD=Your_password
   MONGODB_URI=<your_mongodb_connection_uri>
   CLOUDINARY_NAME=<your_cloudinary_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_SECRET_KEY=<your_cloudinary_secret_key>
   ```

4. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

5. Start the frontend server:
   ```bash
   cd frontend
   npm start
   ```

## Environment Variables

Ensure to set up the following environment variables in your `.env` file:

- **RAZORPAY_KEY_ID**: Your Razorpay public key.
- **RAZORPAY_KEY_SECRET**: Your Razorpay secret key.
- **STRIPE_SECRET_KEY**: Your Stripe secret key.
- **JWT_SECRET**: Secret key for JWT authentication.
- **ADMIN_EMAIL**: Admin email (used for login).
- **ADMIN_PASSWORD**: Admin password (used for login).
- **MONGODB_URI**: MongoDB connection URI for the database.
- **CLOUDINARY_NAME**: Your Cloudinary cloud name.
- **CLOUDINARY_API_KEY**: Your Cloudinary API key.
- **CLOUDINARY_SECRET_KEY**: Your Cloudinary secret key.

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments:
- [Razorpay](https://razorpay.com) for the payment gateway.
- [Stripe](https://stripe.com) for the payment gateway.
- [Cloudinary](https://cloudinary.com) for image hosting.

---

For any issues or feedback, feel free to reach out to me via email: mohammedafzal1213@gmail.com.

#mern
#ecommerce
#nodejs
#reactjs
#open_source
#context_Api
#payment-gateway
#razor_Pay