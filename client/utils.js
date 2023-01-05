let SERVER_URL = "https://aiartanything.onrender.com/";
let LOCAL_SERVER_URL = "http://127.0.0.1:7000/";

function generateUID() {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);
  const finalUID = head + tail;
  return finalUID;
}

function selectRandomFromArray(arr) {
  const arrLength = arr.length;
  const selectedItem = arr[Math.floor(Math.random() * arrLength)];
  return selectedItem;
}

export { SERVER_URL, LOCAL_SERVER_URL, generateUID, selectRandomFromArray };
