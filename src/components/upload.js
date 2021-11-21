import axios from "axios";

const upload = (data) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGYzNTQwOTM5OGMwNTVGYTc3OTk4ODRFZWU0NWEwQjVjZTFCREE4OEYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MzcxOTUyNDE3MzAsIm5hbWUiOiJmcmVlLWZpbGUtc3RvcmUifQ.JL3F5ls1L7ErT3PGEWfw-O9ytJOG84PfFS8Ar98G9f4";
  var config = {
    method: "post",
    url: "https://api.web3.storage/upload",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    data: data,
  };

  console.log("uploading: ", data)

  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        return resolve(response.data.cid);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export default upload;
