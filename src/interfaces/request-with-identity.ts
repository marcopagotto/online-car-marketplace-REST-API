import express from 'express';
import mongoose from 'mongoose';

export interface RequestWithIdentity extends express.Request {
  identity: any[];
}

export interface Car {
  _id: mongoose.Types.ObjectId;
  make: string;
  model: string;
  year: number;
}
