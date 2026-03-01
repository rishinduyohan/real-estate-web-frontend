# Real Estate Web Platform

![Real Estate Hero Image](https://res.cloudinary.com/dbndqriih/image/upload/v1772384872/Screenshot_2026-03-01_223045_doyffh.png)
![Real Estate login Image](https://res.cloudinary.com/dbndqriih/image/upload/v1772384869/Screenshot_2026-03-01_223106_duguc5.png)

Welcome to the **Real Estate Web Platform**! 🏢 This is a full-stack, comprehensive web application designed to connect property owners, customers, and administrators seamlessly. Built with a modern, responsive UI and a robust Spring Boot backend, the platform enables frictionless property listings, inquiries, dynamic user management, and booking features.

---

## ✨ Features

- **Dynamic User Management**: Dedicated roles and isolated state views for **Admins**, **Owners**, and **Customers**. Fully integrated CRUD operations with dynamic modals and tables.

- **Property Listing & Management**: Beautiful, responsive property displays using Tailwind CSS. Owners can confidently manage their portfolios.

- **Advanced Inquiry System**: Robust logic ensuring owners manage inquiries for their properties while handling requests efficiently. 

- **Booking & Calendar System**: Interactive interfaces for managing viewings and property reservations.

- **Account & Profile Settings**: Users can manage personal information (Name, Email, Phone, Location) and upload profile avatars with a seamless UI.

- **Secure Authentication**: Robust role-based access control and login status verifications powered by JWT.

---

## 🛠️ Technology Stack

### Front-end ⚛️
- **Framework**: Angular 19
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide Angular
- **Testing**: Jasmine & Karma
- **Build**: Angular CLI

### Back-end ☕
- **Framework**: Spring Boot 3.5.9
- **Security**: Spring Security + JSON Web Tokens (JJWT 0.12.6)
- **Database**: PostgreSQL (Driver 42.7.8)
- **ORM**: Spring Data JPA
- **Utilities**: Lombok, MapStruct (1.6.3)

---

## 📸 Screenshots

### Modern Admin & User Dashboard
> *A clean, functional user interface where admins and owners interact with their data.*
![Real Estate Dashboard Image](https://res.cloudinary.com/dbndqriih/image/upload/v1772384869/Screenshot_2026-03-01_223451_fphnqn.png)

### Minimalistic Property Cards
> *Elegant listing views allowing customers to make quick decisions.*
![Property Listings](https://res.cloudinary.com/dbndqriih/image/upload/v1772384873/Screenshot_2026-03-01_223245_da8ipu.png)

### Inquaries
> *Elegant listing views allowing customers to make quick decisions.*
![Inquiry](https://res.cloudinary.com/dbndqriih/image/upload/v1772384867/Screenshot_2026-03-01_223401_bxv0yc.png)

### User Management
> *In admin role he can manage users and see top user.*
![User Management](https://res.cloudinary.com/dbndqriih/image/upload/v1772384869/Screenshot_2026-03-01_223520_p6msim.png)


*(Note: Replace the placeholder images above with your actual app screenshots inside a `/docs` or `/public` folder!)*

---

## 🏗️ Project Structure

The project is structured into two main monorepo-style directories:

```text
real-estate-web/
├── back-end/
│   └── real-estate-management-backend/    # Spring Boot Java Backend
│       ├── pom.xml
│       └── src/main/java/com/pvt/ecom/...
└── front-end/
    └── real-estate-web-frontend/         # Angular + Tailwind Frontend
        ├── package.json
        └── src/app/...
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### 1. Prerequisites
- **Node.js** (v18+ recommended) and **npm**
- **Java Development Kit (JDK) 25** (as defined in `pom.xml`)
- **Maven**
- **PostgreSQL** installed and running

### 2. Database Configuration
Create a PostgreSQL database for the project. Configure your credentials inside the backend's `application.properties` or `application.yml` file:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_db_name
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### 3. Running the Backend
Navigate to the backend directory and run the Spring Boot application:
```bash
cd back-end/real-estate-management-backend
mvn clean install
mvn spring-boot:run
```
*The API will start running (default usually `http://localhost:8080`).*

### 4. Running the Frontend
Navigate to the frontend directory, install dependencies, and start the Angular development server:
```bash
cd front-end/real-estate-web-frontend/real-estate-web-frontend
npm install
npm run start
```
*Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any of the source files.*

---

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---