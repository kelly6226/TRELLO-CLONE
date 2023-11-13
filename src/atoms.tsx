import { atom, selector } from "recoil";

export const todoState = atom({
  key: "toDO",
  default: ["a", "b", "c", "d", "e", "f"],
});
