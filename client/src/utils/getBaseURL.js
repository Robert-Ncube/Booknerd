export const getBaseURL = () => {
  return "https://booknerd-backend.vercel.app";
};

/*
 * In a production environment, replace 'http://localhost:5000' with https://booknerd-backend.vercel.app, vise versa.
 * This function can be used in multiple places throughout the application.
 * For example, when making API requests, you can use the following syntax:
 * axios.get(`${getBaseURL()}/api/books`)
 *
 * Make sure to replace '/api/books' with the appropriate endpoint for your API.
 */
