"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

/**
 * @swagger
 * /v1/api/user/signup:
 *   post:
 *     summary: Tạo người dùng mới
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
router.post("/user/signup", accessController.signUp);

module.exports = router;
