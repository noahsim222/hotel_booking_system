import mongoose from 'mongoose';

interface IHotel {
  name: string;
  type: string;
  city: string;
  distance: string;
  photos: string[];
  title: string;
  description: string;
  rating: number;
  rooms?: string[];
  cheapestPrice: number;
  featured: boolean;
}

const HotelSchema = new mongoose.Schema<IHotel>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Hotel', HotelSchema);
