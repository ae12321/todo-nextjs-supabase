// 状態管理
import { create } from 'zustand'

type EditedTask = {
  id: string
  titie: string | null
}
type LoginUser = {
  id: string | undefined
  email: string | undefined
}
type State = {
  editedTask: EditedTask
  updateeditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
  loginUser: LoginUser
  updateLoginUser: (payload: LoginUser) => void
  resetLoginUser: () => void
}

const useStore = create<State>((set) => {
  return {
    editedTask: { id: '', titie: '' },
    updateeditedTask: (payload) => {
      set({
        editedTask: payload,
      })
    },
    resetEditedTask: () => set({ editedTask: { id: '', titie: '' } }),
    loginUser: { id: '', email: '' },
    updateLoginUser: (payload) => {
      set({
        loginUser: payload,
      })
    },
    resetLoginUser: () => set({ loginUser: { id: '', email: '' } }),
  }
})
export default useStore
