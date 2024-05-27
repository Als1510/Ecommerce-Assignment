# E-commerce Store

This project is an e-commerce store that allows clients to add items to their cart and checkout to successfully place an order. The store has an admin panel to manage discount codes and view statistics.

## Features

- User registration and login
- Add items to the cart
- Checkout with optional discount code
- Admin panel to generate discount codes and view statistics
- Every nth order gets a coupon code for a 10% discount
- Role-based access control for admin and normal users

## Technologies Used

- **Backend:** Node.js, Express.js, JWT for authentication
- **Frontend:** Angular, Angular Material
- **Styling:** CSS

## Installation

Follow the steps below to set up and run the project:

### Prerequisites

- Node.js (v12 or higher)
- Angular CLI

### Backend Setup

1. Navigate to the `server` directory:
    ```bash
    cd server
    ```
2. Install backend dependencies:
    ```bash
    npm install
    ```
3. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `client` directory:
    ```bash
    cd client
    ```
2. Install frontend dependencies:
    ```bash
    npm install
    ```
3. Start the frontend server:
    ```bash
    ng serve -o
    ```

## Running the Project

1. **Start the backend server**: Follow the steps in the Backend Setup section.
2. **Start the frontend server**: Follow the steps in the Frontend Setup section.
3. The application will automatically open in your default web browser.

## Application Pages

- **Login Page**: Allows users to login to the application.
- **Register Page**: Allows new users to register.

## User Roles

### Admin

- **Username:** `admin`
- **Password:** `admin`
- Can access the `/admin` route to generate discount codes and view statistics.

### Normal User

- Users who register through the register page are considered normal users.
- Can add items to the cart, apply discount codes, and proceed to checkout.

## Usage

### Admin

1. **Login**: Use the admin credentials to log in.
2. **Admin Panel**: Navigate to the `/admin` route to access the admin panel.
3. **Generate Discount Code**: Generate new discount codes.
4. **View Statistics**: View total items purchased, total purchase amount, list of discount codes, and total discount amount.

### Normal User

1. **Register**: Go to the register page to create a new account.
2. **Login**: Use your credentials to log in.
3. **Add Items to Cart**: Add items to your cart.
4. **Checkout**: Apply a discount code (if available) and proceed to checkout.

## API Endpoints

### User Endpoints

- **POST** `/register`: Register a new user.
- **POST** `/login`: Login a user and return a JWT token.
- **POST** `/user/add-to-cart`: Add an item to the cart.
- **POST** `/user/checkout`: Checkout and place an order.
- **POST** `/user/validate-discount`: Validate a discount code.

### Admin Endpoints

- **GET** `/admin/generate-discount`: Generate a new discount code.
- **GET** `/admin/stats`: Retrieve statistics.