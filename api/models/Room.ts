import mongoose from 'mongoose';

type Room = {
  number: number;
  unavailableDate: { type: Date }[];
}[];

interface IRoom {
  title: string;
  price: number;
  maxPeople: number;
  distance: string;
  roomNumbers: Room;
  description: string;
}

const RoomSchema = new mongoose.Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: {
      type: [{ number: Number, unavailableDates: { type: [Date] } }],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Room', RoomSchema);
