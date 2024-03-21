import express from 'express';
const router = express.Router();
import { 
    servertest,
    getmessages,
    submitmessage,
    deleteAllMessages
 } from '../controllers/dbopers.js';

router.get('/', servertest);
router.get('/getmessages', getmessages); 
router.get('/delete', deleteAllMessages);
router.post('/submitmessage', submitmessage);

export default router;