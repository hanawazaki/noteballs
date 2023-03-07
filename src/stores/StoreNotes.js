import { defineStore, acceptHMRUpdate } from 'pinia'
import { db } from '../firebase';
import {
  collection, getDocs, query, onSnapshot,
  doc, setDoc, deleteDoc, updateDoc, orderBy, addDoc
} from 'firebase/firestore';
import { useStoreAuth } from './storeAuth';

let notesCollectionRef
let notesCollectionQuery

let getNotesSnapshot

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        // {
        //   id: "id1",
        //   content:
        //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,suscipit neque optio similique beatae dolore ducimus voluptatum illo libero officia id, ab culpa asperiores error.",
        // },
        // {
        //   id: "id2",
        //   content: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        // }
      ],
      loading: false
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();

      notesCollectionRef = collection(db, "users", storeAuth.user.id, "notes");
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))

      this.getNotes()
    },
    async getNotes() {
      // const q = query(collection(db, "notes"));
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      //   let note = {
      //     id: doc.id,
      //     content: doc.data().content
      //   }
      //   this.notes.push(note)
      // });
      this.loading = false

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        });

        this.notes = notes
        this.loading = true
      }, error => {
        console.log('error.message: ', error.message)
      });

      // later on
      // unsub()
    },
    async addNote(newNoteContent) {
      let currDate = new Date().getTime(),
        date = currDate.toString();

      // let note = {
      //   id,
      //   content: newNoteContent,
      // };

      // this.notes.unshift(note);

      // await add(doc(notesCollectionRef, id), {
      //   id,
      //   content: newNoteContent
      // })

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date
      })
    },
    async deleteNote(idToDelete) {
      // this.notes = this.notes.filter((note) => note.id !== idToDelete);
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      // let index = this.notes.findIndex(note => note.id === id)
      // this.notes[index].content = content

      await updateDoc(doc(notesCollectionRef, id), {
        content
      });
    },
    clearNotes() {
      this.notes = []
      if (getNotesSnapshot) getNotesSnapshot() //unsubscribe from all listener

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
