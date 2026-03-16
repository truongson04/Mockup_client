import { defineStore } from "pinia";
import { computed, ref, toRaw } from "vue";
import userData from "../assets/dummy_data/userData.json";

const useUsersStore = defineStore("users", () => {
  const initialUsers = userData.default || userData;
  const userList = ref(initialUsers || []);
  const currentFilter = ref(toRaw(userList.value) || []);
  const countryList = computed(() => {
    return userList.value.reduce((accumulator, user) => {
      const countryTag = user.tags?.find((tag) =>
        tag.startsWith("Nationality_"),
      );

      if (
        countryTag &&
        !accumulator.includes(countryTag.replace("Nationality_", ""))
      ) {
        accumulator.push(countryTag.replace("Nationality_", ""));
      }

      return accumulator;
    }, []);
  });

  const companyList = computed(() => {
    return userList.value.reduce((accumulator, user) => {
      const companyTag = user.tags?.find((tag) => tag.startsWith("Company_"));

      if (
        companyTag &&
        !accumulator.includes(companyTag.replace("Company_", ""))
      ) {
        accumulator.push(companyTag.replace("Company_", ""));
      }

      return accumulator;
    }, []);
  });
  const totalUsers = computed(() => userList.value.length);

  const genderStats = computed(() => {
    const stats = { male: 0, female: 0 };
    userList.value.forEach((user) => {
      const genderTag = user.tags?.find((tag) => tag.startsWith("Gender_"));
      if (genderTag === "Gender_Male") stats.male++;
      if (genderTag === "Gender_Female") stats.female++;
    });
    return stats;
  });

  const nationalityStats = computed(() => {
    const stats = {};
    userList.value.forEach((user) => {
      const natTag = user.tags?.find((tag) => tag.startsWith("Nationality_"));
      if (natTag) {
        const country = natTag.replace("Nationality_", "");
        stats[country] = (stats[country] || 0) + 1;
      }
    });

    const getCountryName = (code) => {
      const names = {
        VN: "ベトナム",
        US: "アメリカ合衆国",
        KR: "韓国",
        JP: "日本",
        CN: "中国",
        FR: "フランス",
        DE: "ドイツ",
        IN: "インド",
        AU: "オーストラリア",
        GB: "イギリス",
        TH: "タイ",
        SG: "シンガポール",
        MY: "マレーシア",
        ID: "インドネシア",
        PH: "フィリピン",
        CA: "カナダ",
        BR: "ブラジル",
        MX: "メキシコ",
        RU: "ロシア",
        ES: "スペイン",
        IT: "イタリア",
        NL: "オランダ",
        SE: "スウェーデン",
        NO: "ノルウェー",
        DK: "デンマーク",
        FI: "フィンランド",
        CH: "スイス",
        AT: "オーストリア",
        BE: "ベルギー",
        PL: "ポーランド",
        CZ: "チェコ",
        HU: "ハンガリー",
        RO: "ルーマニア",
        TR: "トルコ",
        SA: "サウジアラビア",
        AE: "アラブ首長国連邦",
        IL: "イスラエル",
        ZA: "南アフリカ",
        EG: "エジプト",
        NG: "ナイジェリア",
        KE: "ケニア",
        AR: "アルゼンチン",
        CL: "チリ",
        CO: "コロンビア",
        PE: "ペルー",
        NZ: "ニュージーランド",
      };

      return names[code] || code;
    };

    return Object.entries(stats).map(([country, count]) => ({
      id: country,
      country: getCountryName(country),
      count,
    }));
  });
  const setFilteredUsers = (userList) => {
    currentFilter.value = userList;
  };

  return {
    userList,
    countryList,
    companyList,
    totalUsers,
    genderStats,
    nationalityStats,
    setFilteredUsers,
    currentFilter,
  };
});
export default useUsersStore;
