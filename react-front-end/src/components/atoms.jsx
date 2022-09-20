import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key: 'profile', // this key is using to store data in local storage
    storage: localStorage, // configurate which stroage will be used to store the data
  })
const profileState = atom({
  key: "profileState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default profileState;