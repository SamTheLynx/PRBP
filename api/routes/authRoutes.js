const express = require('express');
const { adminSignup, adminLogin ,updateAdminProfile} = require('../controllers/adminController');
const { createSubadmin, updateSubadminProfile, deleteSubadmin,getSubadminsList } = require('../controllers/subAdminController');
const authenticate = require('../middleware/authenticate')
const roleMiddleware = require('../middleware/roleMiddleware')
const router = express.Router();

router.post('/admin/Signup', adminSignup);
router.post('/admin/Login', adminLogin);
router.put('/admin/update-profile', authenticate, roleMiddleware(['admin']) , updateAdminProfile); // New route to update admin profile

router.post('/admin/create-subadmin', authenticate, roleMiddleware(['admin']), createSubadmin);
router.delete('/admin/delete-subadmin/:id', authenticate, roleMiddleware(['admin']), deleteSubadmin);
router.get('/subadmins',authenticate, roleMiddleware(['admin']), getSubadminsList);
router.put('/admin/update-subadmin/:id', authenticate, roleMiddleware(['subadmin', 'admin']), updateSubadminProfile);

module.exports = router;
