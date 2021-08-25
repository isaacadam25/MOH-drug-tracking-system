import http from "../services/httpService";
import { apiUrl } from "../config.json";

export const distributionReports = (batchNo, token) => {
  return http.get(`${apiUrl}/report/transaction/distribution/${batchNo}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const expiredTrends = (year, token) => {
  return http.get(`${apiUrl}/report/batch/track/expire-trends/${year}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const lostDrugReports = (token) => {
  return http.get(`${apiUrl}/report/batch/track/lost`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const totalRegistered = (token) => {
  return http.get(`${apiUrl}/report/batch/total/registered`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const totalUsedDrugs = (token) => {
  return http.get(`${apiUrl}/report/batch/total/used`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const totalLostDrugs = (token) => {
  return http.get(`${apiUrl}/report/batch/total/lost`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const getBatches = (token) => {
  return http.get(`${apiUrl}/stock/batches/approved`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const traceBatch = (batch, token) => {
  return http.get(`${apiUrl}/report/batch/trace/${batch}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
