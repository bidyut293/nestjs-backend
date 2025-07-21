 ## Overview
 This NestJS backend manages user authentication, user roles, document CRUD operations, and triggers document ingestion via a Python backend. It uses TypeScript, TypeORM, PostgreSQL, and JWT for secure, scalable operations.

 ## Database Schema
 - **User**:
   - id: number (Primary Key)
   - email: string (Unique)
   - password: string (Hashed)
   - role: string (admin, editor, viewer)
 - **Document**:
   - id: number (Primary Key)
   - title: string
   - content: text
   - owner: User (Foreign Key)
   - createdAt: Date

 ## Design Decisions
 - **TypeORM**: Chosen for ORM to simplify database interactions and ensure type safety.
 - **JWT Authentication**: Implements secure, stateless authentication with role-based access control.
 - **Microservices**: HTTP client used to communicate with Python backend for ingestion.
 - **Scalability**: TypeORM and PostgreSQL support large datasets (1000+ users, 100000+ documents).
 - **Security**: Passwords hashed with bcrypt, JWT tokens expire after 1 hour.

 ## Non-Functional Aspects
 - **Performance**: Asynchronous API calls and database indexing ensure low latency.
 - **Integrity**: Foreign key constraints maintain data consistency.
 - **Scalability**: Dockerized services and PostgreSQL support high user loads.

 ## Third-Party Libraries
 - **TypeORM**: Handles database operations with type-safe queries.
 - **bcrypt**: Secures password hashing.
 - **@nestjs/jwt**: Manages JWT token generation and validation.
 - **@nestjs/passport**: Implements authentication strategies.