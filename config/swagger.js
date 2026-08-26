const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EduConnect API',
      version: '1.0.0',
      description: 'REST API for EduConnect — a peer learning platform for students.',
    },
    servers: [
      { url: 'http://localhost:5200', description: 'Local development server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // ── User ──────────────────────────────────────────────
        RegisterRequest: {
          type: 'object',
          required: ['name', 'username', 'email', 'password', 'confirm_password', 'gender'],
          properties: {
            name:             { type: 'string', example: 'Ada Okafor' },
            username:         { type: 'string', example: 'ada_okafor' },
            email:            { type: 'string', format: 'email', example: 'ada@example.com' },
            password:         { type: 'string', format: 'password', example: 'Secret@123' },
            confirm_password: { type: 'string', format: 'password', example: 'Secret@123' },
            gender:           { type: 'string', enum: ['male', 'female'], example: 'female' },
            phone:            { type: 'string', example: '08012345678' },
            birthdate:        { type: 'string', format: 'date', example: '2005-04-12' },
            profile_picture:  { type: 'string', format: 'uri', example: 'https://example.com/pic.jpg' },
            role:             { type: 'string', example: 'student' },
            subscribed:       { type: 'boolean', example: false },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'ada@example.com' },
            password: { type: 'string', format: 'password', example: 'Secret@123' },
          },
        },
        UpdateUserRequest: {
          type: 'object',
          required: ['name', 'username', 'email', 'subscribed'],
          properties: {
            name:            { type: 'string', example: 'Ada Okafor' },
            username:        { type: 'string', example: 'ada_okafor' },
            email:           { type: 'string', format: 'email', example: 'ada@example.com' },
            phone:           { type: 'string', example: '08012345678' },
            profile_picture: { type: 'string', example: 'https://example.com/pic.jpg' },
            birthdate:       { type: 'string', format: 'date', example: '2005-04-12' },
            subscribed:      { type: 'boolean', example: true },
          },
        },
        // ── Subject ───────────────────────────────────────────
        SubjectRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Mathematics' },
          },
        },
        // ── Question ──────────────────────────────────────────
        QuestionRequest: {
          type: 'object',
          required: ['topic', 'content', 'subject'],
          properties: {
            topic:   { type: 'string', example: 'Quadratic Equations' },
            content: { type: 'string', example: 'How do I solve x² + 5x + 6 = 0?' },
            subject: { type: 'string', example: 'Mathematics' },
            fileUrl: { type: 'string', format: 'uri', example: 'https://cloudinary.com/file.png' },
          },
        },
        // ── Answer ────────────────────────────────────────────
        AnswerRequest: {
          type: 'object',
          required: ['content'],
          properties: {
            content:  { type: 'string', example: 'Factor the equation: (x+2)(x+3) = 0, so x = -2 or x = -3.' },
            file_url: { type: 'string', format: 'uri', example: 'https://cloudinary.com/file.png' },
          },
        },
        // ── Password Reset ────────────────────────────────────
        PasswordResetRequest: {
          type: 'object',
          required: ['email', 'password', 'confirmPassword'],
          properties: {
            email:           { type: 'string', format: 'email', example: 'ada@example.com' },
            password:        { type: 'string', format: 'password', example: 'NewSecret@123' },
            confirmPassword: { type: 'string', format: 'password', example: 'NewSecret@123' },
          },
        },
        // ── Generic responses ─────────────────────────────────
        SuccessResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            data:    { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error:   { type: 'string' },
          },
        },
      },
    },
    tags: [
      { name: 'Auth',      description: 'Login, logout, Google OAuth' },
      { name: 'Users',     description: 'User registration, profile, verification' },
      { name: 'Subjects',  description: 'Subject management' },
      { name: 'Questions', description: 'Question posting and retrieval' },
      { name: 'Answers',   description: 'Answer posting and management' },
    ],
    paths: {
      // ── AUTH ──────────────────────────────────────────────────────────────
      '/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
          },
          responses: {
            200: { description: 'Login successful, returns JWT token', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Incorrect password' },
            404: { description: 'Email not registered' },
            500: { description: 'Server error' },
          },
        },
      },
      '/auth/logout': {
        post: {
          tags: ['Auth'],
          summary: 'Logout',
          responses: {
            200: { description: 'Logged out successfully' },
            500: { description: 'Server error' },
          },
        },
      },
      '/auth/google': {
        get: {
          tags: ['Auth'],
          summary: 'Initiate Google OAuth login',
          responses: {
            302: { description: 'Redirects to Google OAuth consent screen' },
          },
        },
      },

      // ── USERS ─────────────────────────────────────────────────────────────
      '/user/register': {
        post: {
          tags: ['Users'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/RegisterRequest' } } },
          },
          responses: {
            201: { description: 'User created, verification email sent', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            400: { description: 'Validation error or email/username already exists' },
            500: { description: 'Server error' },
          },
        },
      },
      '/user/verify-email': {
        post: {
          tags: ['Users'],
          summary: 'Verify email with OTP code',
          parameters: [
            { in: 'query', name: 'email', required: true, schema: { type: 'string' }, example: 'ada@example.com' },
            { in: 'query', name: 'code',  required: true, schema: { type: 'string' }, example: '482910' },
          ],
          responses: {
            200: { description: 'Email verified successfully' },
            400: { description: 'Incorrect verification code' },
            404: { description: 'Code invalid or expired' },
            500: { description: 'Server error' },
          },
        },
      },
      '/user/login': {
        post: {
          tags: ['Users'],
          summary: 'Login (also available at /auth/login)',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
          },
          responses: {
            200: { description: 'Login successful' },
            401: { description: 'Incorrect password' },
            404: { description: 'Email not registered' },
          },
        },
      },
      '/user/logout': {
        post: {
          tags: ['Users'],
          summary: 'Logout (also available at /auth/logout)',
          responses: {
            200: { description: 'Logged out successfully' },
          },
        },
      },
      '/user/allusers': {
        get: {
          tags: ['Users'],
          summary: 'Get all users',
          parameters: [
            { in: 'query', name: 'question', schema: { type: 'string', enum: ['true', 'false'] }, description: 'Include user questions' },
            { in: 'query', name: 'answer',   schema: { type: 'string', enum: ['true', 'false'] }, description: 'Include answers on questions' },
          ],
          responses: {
            200: { description: 'List of users', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            404: { description: 'No users found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/user/getone/{id}': {
        get: {
          tags: ['Users'],
          summary: 'Get a single user by ID',
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          responses: {
            200: { description: 'User found', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            404: { description: 'User not found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/user/update/{id}': {
        patch: {
          tags: ['Users'],
          summary: 'Update user profile',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateUserRequest' } } },
          },
          responses: {
            200: { description: 'Profile updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            400: { description: 'Validation error' },
            401: { description: 'Unauthorized' },
            404: { description: 'User not found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/user/delete/{id}': {
        delete: {
          tags: ['Users'],
          summary: 'Delete a user',
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          responses: {
            200: { description: 'User deleted' },
            404: { description: 'User not found' },
            500: { description: 'Server error' },
          },
        },
      },

      // ── SUBJECTS ──────────────────────────────────────────────────────────
      '/subject/create': {
        post: {
          tags: ['Subjects'],
          summary: 'Create a subject',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/SubjectRequest' } } },
          },
          responses: {
            200: { description: 'Subject created', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            400: { description: 'Validation error or subject already exists' },
            401: { description: 'Unauthorized' },
            500: { description: 'Server error' },
          },
        },
      },
      '/subject/all': {
        get: {
          tags: ['Subjects'],
          summary: 'Get all subjects',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'List of subjects', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized' },
            404: { description: 'No subjects found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/subject/one/{id}': {
        get: {
          tags: ['Subjects'],
          summary: 'Get a subject by ID',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          responses: {
            200: { description: 'Subject found', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized' },
            404: { description: 'Subject not found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/subject/delete/{id}': {
        delete: {
          tags: ['Subjects'],
          summary: 'Delete a subject',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          responses: {
            200: { description: 'Subject deleted' },
            401: { description: 'Unauthorized' },
            404: { description: 'Subject not found' },
            500: { description: 'Server error' },
          },
        },
      },

      // ── QUESTIONS ─────────────────────────────────────────────────────────
      '/question/create': {
        post: {
          tags: ['Questions'],
          summary: 'Post a question',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/QuestionRequest' } } },
          },
          responses: {
            201: { description: 'Question created', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized or email not verified' },
            404: { description: 'Subject not found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/question/get-all': {
        get: {
          tags: ['Questions'],
          summary: 'Get all questions',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'query', name: 'content', schema: { type: 'string' }, description: 'Search questions by content' },
          ],
          responses: {
            200: { description: 'List of questions with answers', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized' },
            404: { description: 'No questions found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/question/get-one/{question_id}': {
        get: {
          tags: ['Questions'],
          summary: 'Get a single question by ID',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'question_id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          responses: {
            200: { description: 'Question found with answers', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized' },
            404: { description: 'Question not found' },
            500: { description: 'Server error' },
          },
        },
      },

      // ── ANSWERS ───────────────────────────────────────────────────────────
      '/answer/create/{question_id}': {
        post: {
          tags: ['Answers'],
          summary: 'Post an answer to a question',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'question_id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AnswerRequest' } } },
          },
          responses: {
            201: { description: 'Answer created', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            400: { description: 'Validation error' },
            401: { description: 'Unauthorized' },
            500: { description: 'Server error' },
          },
        },
      },
      '/answer/allanswers': {
        get: {
          tags: ['Answers'],
          summary: 'Get all answers',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'query', name: 'content', schema: { type: 'string' }, description: 'Search answers by content' },
          ],
          responses: {
            200: { description: 'List of answers', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized' },
            404: { description: 'No answers found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/answer/getone/{id}': {
        get: {
          tags: ['Answers'],
          summary: 'Get a single answer by ID',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          responses: {
            200: { description: 'Answer found', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Unauthorized' },
            404: { description: 'Answer not found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/answer/update/{id}': {
        patch: {
          tags: ['Answers'],
          summary: 'Update an answer (owner only)',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AnswerRequest' } } },
          },
          responses: {
            200: { description: 'Answer updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            400: { description: 'Validation error' },
            401: { description: 'Unauthorized' },
            403: { description: 'Forbidden — not the answer owner' },
            404: { description: 'Answer not found' },
            500: { description: 'Server error' },
          },
        },
      },
      '/answer/deleteanswer/{id}': {
        delete: {
          tags: ['Answers'],
          summary: 'Delete an answer',
          security: [{ bearerAuth: [] }],
          parameters: [
            { in: 'path', name: 'id', required: true, schema: { type: 'integer' }, example: 1 },
          ],
          responses: {
            200: { description: 'Answer deleted' },
            401: { description: 'Unauthorized' },
            404: { description: 'Answer not found' },
            500: { description: 'Server error' },
          },
        },
      },
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
