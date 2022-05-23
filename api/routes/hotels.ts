import { verifyAdmin } from './../utils/verify';
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
} from '../controllers/hotelController';
import express from 'express';

const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.put('/:id', verifyAdmin, updateHotel);

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

//GET
router.get('find/:id', getHotel);

//GET ALL
router.get('/', getAllHotels);

router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

export default router;
