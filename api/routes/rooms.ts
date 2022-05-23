import express, { Request, Response } from 'express';
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} from '../controllers/roomController';

import { verifyAdmin } from '../utils/verify';

const router = express.Router();

//CREATE
router.post('/:hotelid', verifyAdmin, createRoom);

//UPDATE
router.put('/:id', verifyAdmin, updateRoom);

//DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

//GET
router.get('/:id', getRoom);

//GET ALL
router.get('/', getAllRooms);

export default router;
