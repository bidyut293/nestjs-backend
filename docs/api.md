 ## Authentication APIs
 - **POST /auth/register**
   - Description: Register a new user.
   - Body: `{ email: string, password: string, role: string }`
   - Response: User object
 - **POST /auth/login**
   - Description: Login and get JWT token.
   - Body: `{ email: string, password: string }`
   - Response: `{ accessToken: string }`
 - **POST /auth/logout**
   - Description: Logout (client-side token invalidation).
   - Response: `{ message: string }`

 ## User Management APIs (Admin Only)
 - **GET /users**
   - Description: List all users.
   - Response: Array of user objects
 - **PATCH /users/:id/role**
   - Description: Update user role.
   - Body: `{ role: string }`
   - Response: Updated user object

 ## Document Management APIs
 - **POST /documents**
   - Description: Create a new document.
   - Body: `{ title: string, content: string }`
   - Response: Document object
 - **GET /documents**
   - Description: List documents (admin sees all, others see own).
   - Response: Array of document objects
 - **GET /documents/:id**
   - Description: Get a specific document.
   - Response: Document object
 - **PATCH /documents/:id**
   - Description: Update a document.
   - Body: `{ title: string, content: string }`
   - Response: Updated document object
 - **DELETE /documents/:id**
   - Description: Delete a document.
   - Response: None

 ## Ingestion APIs
 - **POST /ingestion/:id**
   - Description: Trigger ingestion for a document (admin/editor only).
   - Response: Ingestion response from Python backend
 - **GET /ingestion/status/:id**
   - Description: Get ingestion status.
   - Response: Status response from Python backend