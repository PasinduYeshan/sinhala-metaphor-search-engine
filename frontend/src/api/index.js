import axios from "axios";
import store from "src/store";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { thunks } from "src/store";

/**
 * Setup Axios
 */
const BASE_URL_REMOTE = "";
const BASE_URL_LOCAL = "http://localhost:8000";

axios.defaults.baseURL = BASE_URL_LOCAL;

// Register access token with axios
export const registerAccessToken = (token, history, dispatch) => {
  if (token) {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      toast.error("Your session has expired, please login again", {});
      toast.success("You will be redirect to Login page", { delay: 300 });
      dispatch(thunks.user.userLogout());
      setTimeout(() => {
        history.replace("/login");
        return;
      }, 2000);
      return false;
    }
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    return true;
  } else {
    toast.error("Your session has expired, please login again");
    toast.success("You will be redirect to Login page", { delay: 300 });
    dispatch(thunks.user.userLogout());
    setTimeout(() => {
      history.replace("/login");
      return;
    }, 2000);
    return false;
  }
};

/**
 * Convert Axios Response into
 *      status: http status code
 *      message: message from backend api
 * @param res
 */
function readStatus(res) {
  if (!res || !res.status) {
    return {
      status: 408,
      message: "Check your internet connection",
    };
  } else if (!res.data.message) {
    return {
      status: res.status,
      message: "Something went wrong",
    };
  }
  return {
    status: res.status,
    message: res.data.message,
  };
}

/**
 * Resolve Axios Response
 * @param axiosRes
 * @param options
 */
async function ajaxResolver(axiosRes, options = null) {
  try {
    const res = await axiosRes;
    if (options && options.fullBody)
      return { ...readStatus(res), data: res.data };
    else return { ...readStatus(res), data: res.data.data };
  } catch (e) {
    console.log("Axios error", e);
    if (e.response) {
      return { ...readStatus(e.response), data: null };
    } else if (e.request) {
      return { ...readStatus(e.request), data: null };
    } else {
      return { ...readStatus(e), data: null };
    }
  }
}

const formDataConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export default {
  query: {
    async search(queryData) {
      return ajaxResolver(axios.post("/api/songs/", queryData));
    },
  },
  meta: {
    async data() {
      return ajaxResolver(axios.get("/api/meta/aggregation"));
    },
  },
};
