import { defineStore } from "pinia"
import { ref } from "vue"

 const useUIStore = defineStore('UI', ()=>{
      const isLoading = ref(false);
      return{
        isLoading
      }

 }


)
export default useUIStore