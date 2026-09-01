import { createSlice, nanoid } from '@reduxjs/toolkit'

/**
 * У вихідному проєкті ControlledForm і UncontrolledForm нічого не
 * зберігали — кожна форма просто викликала alert() зі своїми даними
 * й забувала про них. Спільного стану між компонентами не було
 * взагалі, тож переносити з пропсів нічого — але саме тому це
 * зручне місце показати Redux "з нуля": обидві форми тепер пишуть
 * в один і той самий слайс, а третій компонент (SubmissionsList)
 * читає з нього й одразу бачить надсилання з обох форм одразу.
 */
const initialState = {
  items: [],
}

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: {
      reducer(state, action) {
        state.items.unshift(action.payload)
      },
      prepare({ source, name, email, message }) {
        return {
          payload: {
            id: nanoid(),
            source,
            name,
            email,
            message,
            submittedAt: new Date().toISOString(),
          },
        }
      },
    },
    clearSubmissions(state) {
      state.items = []
    },
  },
})

export const { addSubmission, clearSubmissions } = submissionsSlice.actions
export default submissionsSlice.reducer

// Селектори
export const selectSubmissions = (state) => state.submissions.items
export const selectSubmissionsCount = (state) => state.submissions.items.length
