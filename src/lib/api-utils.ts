export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND_ERROR: 'Resource not found.',
  UNAUTHORIZED_ERROR: 'Unauthorized. Please login to continue.',
  BAD_REQUEST_ERROR: 'Invalid request. Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
};

export const handleApiError = (error: any) => {
  if (error.message.includes('Network Error')) {
    return API_ERROR_MESSAGES.NETWORK_ERROR;
  }
  if (error.message.includes('timeout')) {
    return API_ERROR_MESSAGES.TIMEOUT_ERROR;
  }
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return API_ERROR_MESSAGES.BAD_REQUEST_ERROR;
      case 401:
        return API_ERROR_MESSAGES.UNAUTHORIZED_ERROR;
      case 404:
        return API_ERROR_MESSAGES.NOT_FOUND_ERROR;
      case 500:
        return API_ERROR_MESSAGES.SERVER_ERROR;
      default:
        return API_ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }
  return API_ERROR_MESSAGES.UNKNOWN_ERROR;
};

export const createApiSlice = (api: any) => {
  return {
    reducer: api.reducer,
    middleware: (getDefaultMiddleware: any) => 
      getDefaultMiddleware()
        .concat(api.middleware)
        .concat(
          (_storeAPI: any) => (next: any) => (action: any) => {
            if (action.type.includes('/fulfilled')) {
              // Handle successful API calls
            } else if (action.type.includes('/rejected')) {
              // Handle API errors
              const error = action.payload;
              const errorMessage = handleApiError(error);
              // You can add additional error handling logic here
              console.error('API Error:', errorMessage, error);
            }
            return next(action);
          }
        ),
  };
};