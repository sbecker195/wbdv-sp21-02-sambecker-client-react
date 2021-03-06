const initialState = {
  modules: []
}

const moduleReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'CREATE_MODULE':
      return {
        ...state,
        modules: [
            ...state.modules,
            action.module
            ]
      }
    case 'FIND_MODULES_FOR_COURSE':
      return {
        ...state,
        modules: action.modules
      }
    case 'FIND_MODULE':
      return state
    case 'UPDATE_MODULE':
      return {
        ...state,
        modules: state.modules.map(module => {
          if (module._id === action.moduleToUpdate._id) {
            return action.moduleToUpdate
          } else {
            return module
          }
        })
      }
    case 'DELETE_MODULE':
      return {
        ...state,
        modules: state.modules.filter(module => {
          return module._id !== action.moduleToDelete._id;
        })
      }
    default:
      return state
  }
}

export default moduleReducer
