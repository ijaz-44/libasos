export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error) return fallback;

  if (typeof error === "string") {
    return error;
  }

  const apiMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.data?.message;

  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage;
  }

  if (Array.isArray(error?.response?.data?.errors) && error.response.data.errors.length > 0) {
    const firstError = error.response.data.errors[0];
    if (typeof firstError === "string") return firstError;
    if (firstError?.message) return firstError.message;
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return error.message;
  }

  return fallback;
}