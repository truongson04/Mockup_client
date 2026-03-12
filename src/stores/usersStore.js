import { defineStore } from "pinia";
import { computed, ref } from "vue";
import userData from "../assets/dummy_data/userData.json";

const useUsersStore = defineStore('users', () => {
   
    const initialUsers = userData.default || userData;
    const userList = ref(initialUsers || []);

  
    
    return { userList };
});

export default useUsersStore;