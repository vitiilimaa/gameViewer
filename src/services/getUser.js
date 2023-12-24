import { toast } from "react-toastify";

const getUser = async (obj) => {
  try {
    const url = "http://localhost:3000/users";
    const users = await fetch(url).then((response) => response.json());

    return users.find(
      (user) =>
        user.email === obj.email.value && user.password === obj.password.value
    );
  } catch {
    toast.error("Erro ao tentar logar.");
    return false;
  }
};

export default getUser;
