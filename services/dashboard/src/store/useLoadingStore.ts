import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const loadingState = {
  loading: false,
  setLoading: (_state: boolean) => {
    return
  },
}

typeof loadingState

type LoadingState = typeof loadingState

export const useLoadingStore = create<LoadingState>()(
  devtools((set) => ({
    loading: false,
    setLoading: (stateInput) => {
      set((state) => ({ ...state, loading: stateInput }))
      return
    },
  }))
)
