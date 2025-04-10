const {Router} = require('express');
const routeController = require('../controllers/routeController')
const router = Router();

router.post('/feedback', routeController.feedback_post);
router.get('/user/:id', routeController.userfeedback_get);
router.put("/user/:id/feedback/:index", routeController.userfeedback_update);

// Delete a specific feedback for a user
router.delete("/user/:id/feedback/:index", routeController.userfeedback_delete);
 

module.exports = router;