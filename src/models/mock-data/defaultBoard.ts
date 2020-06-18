import { nanoid } from "nanoid"
import { Board } from "../BoardClass";
export const defaultBoard = new Board({title: 'Empty Board', sessionId: nanoid(), boardId: nanoid(), lists: [] })