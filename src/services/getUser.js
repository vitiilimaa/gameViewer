import { toast } from "react-toastify";
import axios from "axios";

const getUser = async (obj) => {
  try {
    const url = "http://localhost:3000/users";
    const users = await axios.get(url).then((response) => response.data);
    const user = users.find(
      (user) =>
        user.email === obj.email.value && user.password === obj.password.value
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login efetuado com sucesso.");
      return user;
    } else {
      toast.error("Email e/ou senha incorretos.");
      return false;
    }

  } catch {
    toast.error("Erro ao tentar logar.");
    return false;
  }
};

export default getUser;
