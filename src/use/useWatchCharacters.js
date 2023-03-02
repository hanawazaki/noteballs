import { watch } from 'vue'

export function useWatchCharacters(valToWatch, maxChars = 100) {
  watch(valToWatch, (newValue) => {
    if (newValue.length === maxChars) {
      alert(`only ${maxChars} characters allowed!`);
    }
  });
}