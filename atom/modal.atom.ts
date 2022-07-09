import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const postIdState = atom({
  key: "postIdState",
  default: "id",
})

export const commentIdState = atom({
  key: "commentIdState",
  default: "id",
})