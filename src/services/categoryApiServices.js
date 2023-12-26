import { toast } from "react-toastify";
import axios from "axios";

const addCategory = async (obj) => {
  try {
    const url = `http://localhost:3000/categories`;
    await axios.post(url, obj).then((response) => response.data);
    toast.success("Categoria adicionada com sucesso.");
  } catch {
    toast.error("Erro ao tentar adicionar categoria.");
    return false;
  }
};

const editCategory = async (obj) => {
  try {
    const url = `http://localhost:3000/categories/${obj.id}`;
    await axios.put(url, obj).then((response) => response.data);
    toast.success("Categoria editada com sucesso.");
  } catch {
    toast.error("Erro ao tentar editar categoria.");
    return false;
  }
};

const deleteCategory = async (id) => {
  try {
    const url = `http://localhost:3000/categories/${id}`;
    await axios.delete(url).then((response) => response.data);
    toast.success("Categoria deletada com sucesso.");
  } catch {
    toast.error("Erro ao tentar deletar categoria.");
    return false;
  }
};

export { addCategory, editCategory, deleteCategory };
