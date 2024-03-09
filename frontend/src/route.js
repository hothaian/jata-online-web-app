// route.js

const API_BASE_URL = 'http://localhost:8080/api';

const API_ROUTES = {
  BASE: API_BASE_URL,

  ADDRESS: {
    CREATE: `${API_BASE_URL}/address`,
    FIND_ALL: `${API_BASE_URL}/address`,
    FIND_ONE: `${API_BASE_URL}/address/:id`,
    UPDATE: `${API_BASE_URL}/address/:id`,
    DELETE: `${API_BASE_URL}/address/:id`,
    DELETE_ALL: `${API_BASE_URL}/address`,
  },

  CATEGORY: {
    // Add category routes here
  },

  COMMENT: {
    // Add comment routes here
  },

  CUSTOM: {
    // Add custom routes here
  },

  ORDER: {
    // Add order routes here
  },

  REPORT: {
    ORDER_BY_CATEGORY: `${API_BASE_URL}/report/order-by-category`,
    TOP_BUYER: `${API_BASE_URL}/report/top-buyer`,
    // Add other report routes here
  },

  SELLPOST: {
    // Add sellpost routes here
  },

  USER: {
    DETAILS: `${API_BASE_URL}/user/details`,
    // Add other user routes here
  },
};

export { API_ROUTES };
