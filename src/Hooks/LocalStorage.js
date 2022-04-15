const getLocalStorageData = (string) => {
  return JSON.parse(localStorage.getItem(string));
};

const setLocalStorageData = (str, dataToBeStored) => {
  const json = JSON.stringify(dataToBeStored);
  localStorage.setItem(str, json);
};

export { getLocalStorageData, setLocalStorageData };
