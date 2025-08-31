Smart E-Commerce Platform
This is a full-stack eCommerce web application with a personalized recommendation system, built using Spring Boot (Java), PostgreSQL, and React. The platform allows users to browse products, manage carts, place orders, and receive smart product suggestions based on their activity.

Features
User management: Signup, login, and JWT-based authentication.
Product and category management: Browse products by category, view details.
Shopping cart and orders: Add products to cart, place orders, view order history.
Address management: Users can manage multiple shipping addresses.
Recommendation system: Suggests products based on user interactions (views and purchases).
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
Order & OrderItem	User orders and their products	Order: N:1 User, 1:N OrderItems; OrderItem: N:1 Product
Address	Shipping addresses	N:1 User
InteractionLog	Tracks user actions for recommendations	N:1 User, N:1 Product
Database ER Diagram
        User
        ----
        id
        name
        email
        password
        role
        | 1
        | 
        N
      Orders
        ----
        id
        totalPrice
        orderDate
        | N
        |
        1
      OrderItems
        ----
        id
        quantity
        price
        | N
        |
        1
      Product
        ----
        id
        name
        description
        price
        stock
        imageUrl
        | N
        |
        1
      Category
        ----
        id
        name

User → CartItems (1:N) → Product  
User → Address (1:N)  
InteractionLog → User & Product (N:1 each)

Getting Started
Backend

Navigate to backend:
cd ecommerce-backend

Configure PostgreSQL in application.properties.
# ===============================
# Database Configuration
# ===============================
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.datasource.driver-class-name=org.postgresql.Driver

# ===============================
# JPA / Hibernate Configuration
# ===============================
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# ===============================
# Server Port (Optional)
# ===============================
server.port=8080

# ===============================
# Logging
# ===============================
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE


Build and run the application:
./mvnw spring-boot:run

Test APIs using Postman.

Frontend

Navigate to frontend:
cd ecommerce-frontend

Install dependencies:
npm install

Start the React app:
npm run dev

The app runs on http://localhost:5137.

Why This Project?

Demonstrates full-stack development skills for a fresher.
Implements secure authentication and RESTful API design.
Shows understanding of relational databases, JPA entities, and backend/frontend integration.
Highlights recommendation system implementation for better user experience.
