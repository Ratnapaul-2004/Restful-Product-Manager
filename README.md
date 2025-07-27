# RESTful Product Manager

A simple RESTful API with a lightweight web interface to manage products, built using **Node.js**, **Express**, **MongoDB**, **EJS**, and **Bootstrap**.

## Features

- ✅ Full **CRUD** operations on products

- 🌐 RESTful **API endpoints** 

- 🎨 Beautiful **UI using EJS + Bootstrap 5**
  
- 🗄️ **MongoDB** with Mongoose ODM

- 🔁 **Method override** for PUT and DELETE via HTML forms

- 🔐 **JWT-based user authentication**  

- 👤 **Login, Register & Logout** functionality

- 🛡️ **Protected routes** using middleware

- 🖼️ **Product image upload** and display

- ⚠️ Graceful **error handling** and fallbacks

## Project Structure
<pre lang="markdown"><code> 
``` 
Rest_API/
├── models/
│   ├── product.js
│   └── user.js
├── routes/
│   ├── productRoutes.js
│   └── authRoutes.js
├── middleware/
│   ├── authMiddleware.js
|   └── errorHandler.js        ← centralized error handling mechanism
├── views/
│   ├── addProduct.ejs
│   └── editProduct.ejs
│   └── listProducts.ejs
|   └── error.ejs            
│   └── login.ejs
│   └── register.ejs
│   └── viewProduct.ejs
├── public/
│   └── uploads/               ← stores product images
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── server.js
```</code></pre>


## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap 5
- method-override
- dotenv
- jsonwebtoken (JWT)
- bcryptjs
- cookie-parser

## Here are few glimpses of the project

- Registration Page

<img width="1920" height="1015" alt="Registration Page" src="https://github.com/user-attachments/assets/9700d146-506f-4912-b5da-28d8034b58f2" />


- Login Page

<img width="1920" height="1018" alt="Login Page" src="https://github.com/user-attachments/assets/051d27ea-4620-4274-ad16-b8eb3bb2d9ac" />


- Add Product Page

<img width="1920" height="1017" alt="Product_Add" src="https://github.com/user-attachments/assets/97235aad-f881-4fa1-bba7-b8c9c4d8141c" />


- Product Page

<img width="1920" height="1016" alt="Products" src="https://github.com/user-attachments/assets/78829a62-f682-4e65-bb18-e2d51abc9bf4" />


- Product Detail Page

<img width="1920" height="1015" alt="Product_Detail" src="https://github.com/user-attachments/assets/3cacadad-f122-4477-87d4-8a7a449e2b41" />


- Edit Product Page

<img width="1920" height="1019" alt="Product_Edit" src="https://github.com/user-attachments/assets/997183b7-b66d-4e1e-9ad5-e90d2e296898" />

## Future Enhancements

- ✅ QR Code scanner for barcode input

- ✅ Pagination and search

- ✅ Export product list as PDF or Excel

- ✅ Admin dashboard with analytics

## 🙌 Thank You!

Hope you enjoyed the application! Feel free to fork and enhance it further.

✨ Made with love and Express.js 💚
