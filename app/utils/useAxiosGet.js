import axios from "axios";
import { useState } from "react";

const useAxiosGet = (initialValue) => {
  const [res, setRes] = useState(initialValue || []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getData = (url, cb, errorCb) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (cb) {
          cb && cb(res?.data || res);
        } else {
          setRes(res?.data);
        }

        setLoading(false);
      })
      .catch((err) => {
        setRes(initialValue || []);
        if (errorCb && typeof errorCb === "function") {
          errorCb(err);
        } else {
          setError(err);
        }
        setLoading(false);
      });
  };

  return [res, getData, loading, setRes, error, setLoading];
};

export default useAxiosGet;
