import { defineStore } from "pinia";
import { computed, ref } from "vue";
import userData from "../assets/dummy_data/userData.json";

const useUsersStore = defineStore("users", () => {
  const initialUsers = userData.default || userData;
  const userList = ref(initialUsers || []);
  const countryList = computed(() => {
    return userList.value.reduce((accumulator, user) => {
      return accumulator.push(
        user.tags
          .find((tag) => tag.startsWith("Country_"))
          .replace("Country_", ""),
      );
    }, []);
  });

  return { userList, countryList };
});

export default useUsersStore;
