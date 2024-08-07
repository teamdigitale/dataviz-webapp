import { createMachine } from 'xstate';
const toggleMachine = createMachine({
  id: 'steps',
  initial: 'idle',
  states: {
    idle: {
      on: { NEXT: 'input' },
    },
    input: {
      on: { NEXT: 'config', PREV: 'idle' },
    },
    config: { on: { NEXT: 'done', PREV: 'input' } },
    done: { on: { NEXT: 'idle', PREV: 'config' } },
  },
});
export default toggleMachine;
