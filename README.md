Smart E-Commerce Platform

A full-stack eCommerce web application with a personalized recommendation system. Built using Spring Boot (Java), PostgreSQL, and React, this platform allows users to browse products, manage carts, place orders, and receive smart product suggestions based on their activity.

Features

User Management: Signup, login, and JWT-based authentication.

Product & Category Management: Browse products by category and view details.

Shopping Cart & Orders: Add products to cart, place orders, view order history.

Address Management: Users can manage multiple shipping addresses.

Recommendation System: Suggests products based on user interactions (views and purchases).

Responsive UI: Modern React frontend with mobile-friendly design.

Tech Stack
Layer	Technology
Backend	Java, Spring Boot, Spring Data JPA, Hibernate
Database	PostgreSQL
Frontend	React, Tailwind CSS
Authentication	JWT
Testing	Postman for API endpoints
Backend Models
Model	Description	Relationships
User	Stores user information and authentication	1:N Orders, 1:N CartItems, 1:N Addresses
Product	Product catalog with stock, price, description	N:1 Category, 1:N CartItems, 1:N OrderItems
Category	Product categories	1:N Products
CartItem	Items added to a user’s cart	N:1 User, N:1 Product
Order	User orders	N:1 User, 1:N OrderItems
OrderItem	Products inside orders	N:1 Product, N:1 Order
Address	Shipping addresses	N:1 User
InteractionLog	Tracks user actions for recommendations	N:1 User, N:1 Product
Database ER Diagram (Simplified)
<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/130bdfdf-9e3f-4f67-a28a-8c789f24401c" />



Note: InteractionLog captures each user’s product view or purchase to feed the recommendation engine.

Getting Started
Backend

Navigate to the backend folder:

cd ecommerce-backend


Configure PostgreSQL in application.properties:

spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server Port (Optional)
server.port=8080

# Logging
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE


Build and run the backend:

./mvnw spring-boot:run


Test APIs using Postman.

Frontend

Navigate to the frontend folder:

cd ecommerce-frontend


Install dependencies:

npm install


Start the React app:

npm run dev


Open http://localhost:5137
 in your browser.

Why This Project?

Demonstrates full-stack development skills for a fresher.

Implements secure authentication and RESTful API design.

Shows understanding of relational databases, JPA entities, and backend/frontend integration.

Highlights recommendation system implementation for better user experience.

Perfect for portfolio showcase and interviews.
