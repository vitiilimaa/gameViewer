import "../styles/pages/Categories.css";
import { useState, useEffect, useContext } from "react";
import { Carousel, Button, TextInput, CustomModal } from "../components";
import data from "../../mock/db.json";
import validateFields from "../helpers/validateFields";
import {
  addCategory,
  editCategory,
  deleteCategory,
} from "../services/categoryApiServices";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../contexts/UserContext";

const Categories = () => {
  const { loggedUser } = useContext(UserContext);
  const [selectedButton, setSelectedButton] = useState(data.categories[0].name);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [fields, setFields] = useState({
    category: {
      id: data.categories[0].id,
      value: data.categories[0].name,
      onError: null,
      errorMessage: "",
    },
  });

  useEffect(() => {
    const action = modalTitle.split(" ")[0];
    if (action === "EDITAR" || action === "REMOVER") {
      setFields((prevState) => ({
        ...prevState,
        category: {
          id: fields.category.id,
          value: fields.category.value,
        },
      }));
    } else {
      clearFields();
    }
  }, [showModal]);

  const fieldsValidation = (field, newValue) => {
    const { existError, message } = validateFields(field, newValue);

    setFields((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value: newValue,
        onError: existError,
        errorMessage: message,
      },
    }));
  };

  const handleModal = (title, show) => {
    const obj = data.categories.find((cat) => cat.name === selectedButton);

    setModalTitle(title);
    setShowModal(show);
    setFields((prevState) => ({
      category: { ...prevState.category, id: obj.id, value: obj.name },
    }));
  };

  const clearFields = () => {
    Object.keys(fields).map((field) =>
      setFields((prevState) => ({
        ...prevState,
        [field]: {
          id: null,
          value: "",
          onError: null,
          errorMessage: "",
        },
      }))
    );
  };

  const addOrEditCategoryElement = () => {
    return (
      <>
        <TextInput
          id="category"
          title="Categoria"
          value={fields.category.value || ""}
          isValidate={!fields.category.onError}
          errorMessage={fields.category.errorMessage}
          onChangeValue={(newValue) => fieldsValidation("category", newValue)}
        />
      </>
    );
  };

  const removeCategoryElement = () => {
    return (
      <span>
        Você deseja remover a categoria{" "}
        <strong>{selectedButton?.toUpperCase()}</strong>?
      </span>
    );
  };

  const handleClickSaveButton = () => {
    if (fields.category.onError) {
      Object.keys(fields).map((field) => {
        fieldsValidation(field, fields[field].value);
      });
    } else {
      const obj = {
        id: modalTitle === "ADICIONAR CATEGORIA" ? null : fields.category.id,
        name: fields.category.value?.toUpperCase(),
      };

      if (modalTitle === "ADICIONAR CATEGORIA") {
        addCategory(obj);
        setSelectedButton(obj.name)
      } else if (modalTitle === `EDITAR ${selectedButton?.toUpperCase()}`) {
        editCategory(obj);
        setSelectedButton(obj.name);
      } else {
        deleteCategory(obj.id);
        setSelectedButton(data?.categories[0].name);
      }
      setShowModal(false);
    }
  };

  const selectedButtonStyle = {
    backgroundImage:
      "linear-gradient(to bottom, rgb(255, 255, 255), rgb(255, 255, 255), rgb(136, 136, 136))",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
  };

  return (
    <div className="categories-container">
      <CustomModal
        title={modalTitle}
        showModal={showModal}
        onHide={() => setShowModal(false)}
        body={
          modalTitle === "ADICIONAR CATEGORIA"
            ? addOrEditCategoryElement()
            : modalTitle === `EDITAR ${selectedButton?.toUpperCase()}`
            ? addOrEditCategoryElement()
            : removeCategoryElement()
        }
        footer={
          <>
            <Button
              buttonStyle={{ padding: "10px 30px", fontSize: 16 }}
              title="Cancelar"
              onClick={() => setShowModal(false)}
            />
            <Button
              buttonStyle={{
                backgroundImage:
                  "linear-gradient(rgb(57 243 0), rgb(57 171 0), rgb(5 117 0))",
                padding: "10px 30px",
                fontSize: 16,
              }}
              title="Salvar"
              onClick={() => handleClickSaveButton()}
            />
          </>
        }
      />
      <div className="container-categories-text px-3 text-center">
        <span style={{ fontSize: 36 }} className="normal-text fw-bold">
          ABAIXO ESTÃO LISTADOS{" "}
        </span>{" "}
        <span style={{ fontSize: 36 }} className="featured-text fw-bold">
          OS MELHORES JOGOS{" "}
        </span>{" "}
        <span style={{ fontSize: 36 }} className="normal-text fw-bold">
          DE CADA CATEGORIA
        </span>{" "}
      </div>
      <div className="d-flex gap-3 mt-5 flex-wrap px-3 justify-content-center align-items-center">
        {data.categories.map((category, key) => (
          <Button
            key={key}
            title={category.name}
            onClick={() => setSelectedButton(category.name)}
            buttonStyle={
              selectedButton !== category.name ? selectedButtonStyle : null
            }
            buttonTextStyle={
              selectedButton !== category.name ? selectedButtonStyle : null
            }
            buttonHoverStyle={{ transition: 0.2 }}
          />
        ))}
        {loggedUser && (
          <Dropdown>
            <Dropdown.Toggle style={selectedButtonStyle}>
              <span className="btn-text">CATEGORIA</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleModal("ADICIONAR CATEGORIA", true)}
              >
                <FontAwesomeIcon className="me-2" icon={faPlus} />
                Adicionar
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleModal(`EDITAR ${selectedButton?.toUpperCase()}`, true);
                }}
              >
                <FontAwesomeIcon className="me-2" icon={faPenToSquare} />
                Editar
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  handleModal(`REMOVER ${selectedButton?.toUpperCase()}`, true);
                }}
              >
                <FontAwesomeIcon className="me-2" icon={faTrash} />
                Remover
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      <Carousel
        images={data.images.filter(
          (image, _) => image.category === selectedButton
        )}
        addClassContainer="w-100 px-3 my-5"
        currentCategory={selectedButton}
        loggedUser={loggedUser}
      />
    </div>
  );
};

export default Categories;
