# Smart E-Commerce Platform

A full-stack eCommerce web application with a personalized recommendation system. Built using **Spring Boot (Java), PostgreSQL, and React**, this platform allows users to browse products, manage carts, place orders, and receive product suggestions based on their activity.

---

## Features
  
  - **User Management:** Signup, login, and JWT-based authentication.  
  - **Product & Category Management:** Browse products by category and view details.  
  - **Shopping Cart & Orders:** Add products to cart, place orders, view order history.  
  - **Address Management:** Manage multiple shipping addresses.  
  - **Recommendation System:** Suggests products based on user interactions (views and purchases).  
  - **Responsive UI:** Modern React frontend with mobile-friendly design.

---

## Tech Stack

  | Layer           | Technology                                   |
  |-----------------|----------------------------------------------|
  | Backend         | Java, Spring Boot, Spring Data JPA, Hibernate |
  | Database        | PostgreSQL                                   |
  | Frontend        | React, Tailwind CSS                          |
  | Authentication  | JWT                                          |
  | Testing         | Postman for API endpoints                     |

---

## Backend Models

  | Model            | Description                                     | Relationships |
  |------------------|-------------------------------------------------|---------------|
  | **User**         | Stores user info and authentication             | 1:N Orders, 1:N CartItems, 1:N Addresses, 1:N InteractionLogs |
  | **Product**      | Product catalog with stock, price, description | N:1 Category, 1:N CartItems, 1:N OrderItems, 1:N InteractionLogs |
  | **Category**     | Product categories                              | 1:N Products   |
  | **CartItem**     | Items in a user's cart                           | N:1 User, N:1 Product |
  | **Order**        | User orders                                     | N:1 User, 1:N OrderItems |
  | **OrderItem**    | Products in an order                             | N:1 Product, N:1 Order |
  | **Address**      | Shipping addresses                               | N:1 User       |
  | **InteractionLog** | Tracks user actions for recommendations       | N:1 User, N:1 Product |

---

## Database ER Diagram (Simplified)

ER diagram :

<img width="536" height="324" alt="image" src="https://github.com/user-attachments/assets/e885fce9-2a1b-4c42-9850-dce3798f711f" />


## Getting Started

### Backend

1. Navigate to the backend folder:

  bash
  cd ecommerce-backend

2. Configure PostgreSQL in application.properties:

  properties
  spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db<br>
  spring.datasource.username=your_db_username<br>
  spring.datasource.password=your_db_password<br>
  spring.datasource.driver-class-name=org.postgresql.Driver<br>
  
  spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect<br>
  spring.jpa.hibernate.ddl-auto=update<br>
  spring.jpa.show-sql=true<br>
  spring.jpa.properties.hibernate.format_sql=true<br>
  
  server.port=8080<br>
  
  logging.level.org.hibernate.SQL=DEBUG<br>
  logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE<br>

3. Build and run the backend:

  bash<br>
  ./mvnw spring-boot:run<br>

4. Test APIs using Postman.

### Frontend

1. Navigate to the frontend folder:

  bash<br>
  cd ecommerce-frontend<br>
2.Install dependencies:

  bash<br>
  npm install<br>
3. Start the React app:

  bash<br>
  npm run dev<br>
  
4. Open http://localhost:5137 in your browser.


## Why This Project?
  - Demonstrates full-stack development skills for a fresher.
  
  - Implements secure authentication and RESTful API design.
  
  - Shows understanding of relational databases, JPA entities, and frontend-backend integration.
  
  - Highlights recommendation system implementation for enhanced user experience.
  
  - Ideal for portfolio showcase and interviews.
