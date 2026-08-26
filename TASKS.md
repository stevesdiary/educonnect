# EduConnect — Improvement Task List

## Task 1 — Fix Critical Security Issues ✅
- [x] Move Paystack secret key to `.env` as `PAYSTACK_SECRET_KEY`; fix `'Bearer SECRET_KEY'` string to `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
- [x] Move hardcoded SMTP user `80de56001@smtp-brevo.com` in `emailService.js` to `.env` as `SMTP_USER`
- [x] Add `.env.example` to the repo documenting all required environment variables

## Task 2 — Fix App Boot / Runtime Crashes ✅
- [x] Replace `app.listen` with `server.listen` in `app.js` so Socket.io works on the same server instance
- [x] Call `setupChatSocket(io)` in `app.js` — it is imported but never invoked
- [x] Restore `eventBus.js` (uncomment and fix) or remove the `eventBus.emit('question.posted', ...)` call in `questionService.js` to prevent a crash
- [x] Rewrite `uploadService.js` to use CommonJS `require` — the `import` statement crashes in this project

## Task 3 — Fix Service Layer Bugs
- [ ] Remove `res` usage from `userService.update` — return plain `{ status, message, data }` objects like every other service method
- [ ] Remove the duplicate `deleteQuestion` definition in `questionService.js`; fix the second one which references an undefined `deleteQuestion` variable
- [ ] Add `const { Op } = require('sequelize')` to `questionService.js` and `answerService.js`
- [ ] Fix `answerService.getOne` — change `Answer.findOne({payload})` to `Answer.findOne({ where: { id: payload } })`
- [ ] Fix `answerService.getAnswers` — correct the inverted status/message logic and remove the unreachable `!answers` check after the `.length` check
- [ ] Fix `questionService.oneQuestion` — `findOne` returns `null` or an object, not an array; replace `question.length === 0` with `!question`

## Task 4 — Fix Controller Logic Errors
- [ ] Fix `userController.updateUser` — the condition `if (!(name || username || phone))` is inverted; update should run when fields ARE provided
- [ ] Fix `questionController.updateQuestion` — remove the copied `first_name / last_name` check; implement a proper ownership check (`question.user_id === req.user.id`)
- [ ] Fix `subjectController.createSubject` — `subjectSchema` is the full validator export object; destructure correctly: `const { subjectSchema } = require('../validator/validator')`
- [ ] Fix `userController.verifyEmail` — the catch block is empty; add a proper error response
- [ ] Fix `userController.verifyEmail` — `storedCode` is referenced from outer scope; declare it locally inside `verifyEmail`

## Task 5 — Fix Middleware Issues
- [ ] Fix `errorHandler.js` — change signature from `(req, res, next)` to `(err, req, res, next)` so Express treats it as an error-handling middleware and `err` is defined
- [ ] Register `errorHandler` in `app.js` after all routes
- [ ] Fix `authentication.js` — catch JWT-specific errors (`JsonWebTokenError`, `TokenExpiredError`) and return 401, not 500

## Task 6 — Clean Up & Consolidate
- [ ] Remove `loginRoute.js` or mount it in `app.js` — it is currently dead code (never registered)
- [ ] Remove the raw `pg.Pool` connection from `dbConfig.js`; the app uses only Sequelize via `models/index.js`
- [ ] Move `nodemon` out of `dependencies` — it belongs only in `devDependencies`
- [ ] Remove unused imports from controllers: `bcrypt` and `Op` in `questionController`, `answerController`, and `subjectController`; `express` in `passwordResetController`
- [ ] Implement `chatController.js` and add chat routes to `app.js`
- [ ] Standardise HTTP status codes across all services: `201` for resource creation, `200` for successful reads/updates, `404` for not found

## Task 7 — Validator Fixes
- [ ] Add `role` and `subscribed` fields to `createUserSchema` — the controller destructures them from the validated value but the schema does not declare them
- [ ] Add `file_url` to `answerSchema` — the controller sends it in the payload but the schema does not allow it, causing validation to strip or reject it
- [ ] Rename `passwordResetSchema` or `resetPasswordSchema` — both exist and the naming collision causes the wrong one to be exported/imported
