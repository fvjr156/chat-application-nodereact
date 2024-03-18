import express from 'express';
const router = express.Router();
import { 
    servertest,
    getmessages,
    submitmessage
 } from '../controllers/dbopers.js';

router.get('/', servertest);
router.get('/getmessages', getmessages); 
router.post('/submitmessage', submitmessage);

export default router;