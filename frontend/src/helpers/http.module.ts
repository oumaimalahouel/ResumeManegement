import axios from "axios";
import { baseUrl } from "../constats/url.constants";

const httpModule = axios.create({
   baseURL: baseUrl,
});

export default httpModule;