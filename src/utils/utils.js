/**
 * Wrapper functon that adds timeout handling for fetch api
 * 
 * @param {function} fetchFunc 
 * @param {any} data 
 * @param {number} timeout 
 */
export const fetchWithTimeout = (fetchFunc, data, timeout) => {
  return Promise.race([
    fetchFunc(data),
    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
  ]);
}
