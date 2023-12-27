import { atom } from 'jotai';
import { atomWithImmer } from 'jotai-immer';
const mangaAtomObj = atomWithImmer({ a: 1 });
const countAtom = atom<number>(0);
export { countAtom, mangaAtomObj };
