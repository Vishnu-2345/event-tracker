const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');

// Note: We haven't created authController yet; we'll create it next.
// For now, we'll define the routes and then create the controller.

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

module.exports = router;