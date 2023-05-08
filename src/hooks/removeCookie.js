//import { Cookie } from "@mui/icons-material";
import Cookie from "js-cookie";

const removeCookie=(cookiename)=>{
   Cookie.remove(cookiename);
};

export default removeCookie;