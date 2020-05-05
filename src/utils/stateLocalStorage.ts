const STATE_VAR_NAME = 'state';

export function loadState(): any {
  try {
    const serializedState = localStorage.getItem(STATE_VAR_NAME);
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (e) {
    console.error(e);
  }
}

export function saveState(state: any) {
  localStorage.setItem(STATE_VAR_NAME, JSON.stringify(state));
}
