const reducer = (state, action) => {
  if (action.type === "HANDLE_CHANGE") {
    return { ...state, [action.payload.name]: action.payload.value };
  }

  if (action.type === "CREATE_JOB_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type == "SETUP_USER") {
    return {
      ...state,
      loading: false,
      // alertText: action.payload.alertText,
    };
  }

  // if (action.type == "CLEAR_TOAST_MESSAGE") {
  //   return { ...state, successMessage: "" };
  // }

  // if (action.type === "SUCCESS_VALUES") {
  //   return {
  //     ...state,
  //     showAlert: true,
  //     isLoading: false,
  //     alertType: "Success",
  //     alertText: "Succesffully created...",
  //   };
  // }
  if (action.type === "SETUP") {
    return { ...state, user: action.payload.user };
  }
  if (action.type === "GET_TODOS_SUCCESS") {
    return { ...state, todos: action.payload.todos };
  }

  if (action.type === "CLEAR_USER") {
    return { ...state, user: "" };
  }

  if (action.type === "SHOW_ALERT") {
    return {
      ...state,
      showAlert: true,
      alertText: action.payload.alertText,
      alertType: action.payload.alertType,
    };
  }

  if (action.type === "CLEAR_ALERT") {
    return { ...state, showAlert: false, alertText: "", alertType: "" };
  }

  if (action.type === "EDIT_TODO_BEGIN") {
    return { ...state, isLoading: true, id: action.payload.id };
  }
  if (action.type === "EDIT_FETCH") {
    return {
      ...state,
      title: action.payload.title,
      description: action.payload.description,
      priority: action.payload.priority,
    };
  }
  if (action.type === "EDIT_FETCH_SUCCESS") {
    return { ...state, isLoading: false };
  }

  if (action.type === "CLEAR_VALUES") {
    const initialState = {
      title: "",
      description: "",
      priorityOptions: ["low", "medium", "high"],
      priority: "low",
      isCompleted: false,
      completeOptions: [true, false],
      // alertType: "",
      // alertText: "",
      // showAlert: false,
      isLoading: false,
    };
    return {
      ...state,
      ...initialState,
    };
  }
  // Always return state for any unhandled actions.
};

export default reducer;
