"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandler } = require("../../utils");
const { authentication } = require("../../auth/authUtils");
const router = express.Router();

/**
 * @swagger
 * /v1/api/user/signup:
 *   post:
 *     summary: Create User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Le Quoc Anh
 *               email:
 *                 type: string
 *                 example: quocanh@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               elo:
 *                 type: number
 *                 example: 1200
 *     responses:
 *       201:
 *         description: Tạo user thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 */
router.post("/user/signup", asyncHandler(accessController.signUp));

/**
 * @swagger
 * /v1/api/user/login:
 *   post:
 *     summary: Login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: quocanh@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login Success
 *       401:
 *         description: Invalid email or password
 */
router.post("/user/login", asyncHandler(accessController.login));

router.use(authentication);
/**
 * @swagger
 * /v1/api/user/logout:
 *   delete:
 *     summary: Logout
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *         clientId: []
 *     responses:
 *       200:
 *         description: Lougout success
 */
router.delete("/user/logout", asyncHandler(accessController.logout));

module.exports = router;
