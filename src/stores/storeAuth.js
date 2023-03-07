import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { defineStore } from 'pinia'
import { auth } from '../firebase'
import { useStoreNotes } from './StoreNotes'

export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },

  actions: {
    init() {
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          storeNotes.init();
        } else {
          this.user = {}
          this.router.replace('/auth')
          storeNotes.clearNotes()
        }
      })
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredentials) => {
          const user = userCredentials.user
          // console.log('user', user)
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          console.log(errorCode)
          console.log(errorMessage)
        })
    },
    signInUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user
          // console.log('user login', user)
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    signOutUser() {
      signOut(auth)
        .then(() => {
          // console.log('logout')
        })
        .catch((err) => {

        })
    }
  },

})
