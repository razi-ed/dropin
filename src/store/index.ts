import { create } from 'zustand'
import { createBearSlice, type BearSlice } from './link'

export const useBoundStore = create<BearSlice>()((...a) => ({
  ...createBearSlice(...a),
}))