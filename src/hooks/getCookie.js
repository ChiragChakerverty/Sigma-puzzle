//import { Cookie } from "@mui/icons-material";
import Cookie from "js-cookie";

const getCookie=(cookiename)=>{
   return Cookie.get(cookiename);
};

export default getCookie;