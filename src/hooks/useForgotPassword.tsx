import { useState } from "react";

const useForgotPassword = () => {
  const [message, setMessage] = useState("");
  return { message, setMessage };
};

export default useForgotPassword;
