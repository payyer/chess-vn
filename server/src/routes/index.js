const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: API test cần xác thực
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/test", (req, res) => {
  return res.status(200).json({
    text: "Hello world",
  });
});

router.use("/v1/api", require("./access"));

module.exports = router;
