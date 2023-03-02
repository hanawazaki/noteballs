import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        {
          id: "id1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,suscipit neque optio similique beatae dolore ducimus voluptatum illo libero officia id, ab culpa asperiores error.",
        },
        {
          id: "id2",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        }
      ]
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    addNote(newNoteContent) {
      let currDate = new Date().getTime(),
        id = currDate.toString();

      let note = {
        id,
        content: newNoteContent,
      };

      this.notes.unshift(note);
    },
    deleteNote(idToDelete) {
      this.notes = this.notes.filter((note) => note.id !== idToDelete);
    },
    updateNote(id, content) {
      let index = this.notes.findIndex(note => note.id === id)

      this.notes[index].content = content
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id)[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharCount: (state) => {
      let count = 0;
      state.notes.forEach(note => {
        count += note.content.length
      })

      return count
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoreNotes, import.meta.hot))
}
