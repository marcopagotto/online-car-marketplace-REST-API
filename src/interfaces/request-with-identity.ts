import express from 'express'

export interface RequestWithIdentity extends express.Request {
  identity: any[];
}