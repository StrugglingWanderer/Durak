import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { State } from 'types/state';

type UseState = ReturnType<typeof useState<State | undefined>>;

const StateContext = createContext<UseState | []>([]);

export type StateContextLoadedValue = [State, Dispatch<SetStateAction<State>>];
export default StateContext;
