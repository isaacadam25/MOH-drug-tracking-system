import http from "../services/httpService";
import { apiUrl } from "../config.json";

export const getTransactionLog = (token) => {
  return http.get(`${apiUrl}/report/transaction/log`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getSingleTransaction = (id, token) => {
  return http.get(`${apiUrl}/transactions/details/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getDestroyed = (token) => {
  return http.get(`${apiUrl}/report/batch/track/lost-hospital`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
