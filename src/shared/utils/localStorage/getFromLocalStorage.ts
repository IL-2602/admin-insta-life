function getFromLocalStorage<T>(key: string, defaultState: T) {
  let state = defaultState

  if (typeof localStorage !== 'undefined') {
    const stateAsString = localStorage.getItem(key)

    if (stateAsString !== null) {
      state = JSON.parse(stateAsString) as T
    }
  }

  return state
}

export default getFromLocalStorage
