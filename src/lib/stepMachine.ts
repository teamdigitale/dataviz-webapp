import { createMachine } from 'xstate';
const toggleMachine = createMachine({
  id: 'steps',
  initial: 'idle',
  states: {
    idle: {
      on: { NEXT: 'input' },
    },
    input: {
      on: { NEXT: 'selection', PREV: 'idle' },
    },
    selection: { on: { NEXT: 'config', PREV: 'input' } },
    config: { on: { NEXT: 'done', PREV: 'selection' } },
    done: { on: { NEXT: 'idle', PREV: 'config' } },
  },
});
export default toggleMachine;
