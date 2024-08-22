import { Types } from "mongoose";

interface Producer {
  _id: Types.ObjectId;
  name: string;
}

interface Director {
  _id: Types.ObjectId;
  fullname: string;
}

interface Star {
  _id: Types.ObjectId;
  fullname: string;
}

export interface PopulatedMovie {
  _id: Types.ObjectId;
  title: string;
  release: Date;
  description: string;
  producer: Producer;
  director: Director;
  genres: string[];
  stars: Star[];
}
