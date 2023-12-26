import { toast } from "react-toastify";
import axios from "axios";

const addImage = async (obj) => {
  try {
    const url = `http://localhost:3000/images`;
    await axios.post(url, obj).then((response) => response.data);
    toast.success("Imagem adicionada com sucesso.");
  } catch {
    toast.error("Erro ao tentar adicionar imagem.");
    return false;
  }
};

const editImage = async (obj) => {
  try {
    const url = `http://localhost:3000/images/${obj.id}`;
    await axios.put(url, obj).then((response) => response.data);
    toast.success("Imagem editada com sucesso.");
  } catch {
    toast.error("Erro ao tentar editar imagem.");
    return false;
  }
};

const deleteImage = async (id) => {
  try {
    const url = `http://localhost:3000/images/${id}`;
    await axios.delete(url).then((response) => response.data);
    toast.success("Imagem deletada com sucesso.");
  } catch {
    toast.error("Erro ao tentar deletar imagem.");
    return false;
  }
};

export { addImage, editImage, deleteImage };
