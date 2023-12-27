import "../styles/pages/Categories.css";
import { useState, useEffect, useContext, useRef } from "react";
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
  faUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../contexts/UserContext";
import { editImage } from "../services/imageApiServices";

const Categories = () => {
  const { loggedUser } = useContext(UserContext);
  const [selectedButton, setSelectedButton] = useState(data.categories[0].name);
  const [showModal, setShowModal] = useState(false);
  const [categoryImages, setCategoryImages] = useState(
    data.images.filter((img) => img.category === selectedButton?.toUpperCase())
  );
  const dragCategoryImages = useRef(0);
  const draggedOverCategoryImages = useRef(0);
  const [modalTitle, setModalTitle] = useState("");
  const [fields, setFields] = useState({
    category: {
      id: data.categories[0].id,
      value: data.categories[0].name,
      onError: null,
      errorMessage: "",
    },
  });
  const isAddModal = modalTitle === "ADICIONAR CATEGORIA" ? true : false;
  const isEditModal =
    modalTitle === `EDITAR ${selectedButton?.toUpperCase()}` ? true : false;

  useEffect(() => {
    const action = showModal ? modalTitle.split(" ")[0] : "";
    if (action !== "ADICIONAR") {
      fieldsValidation("category", fields.category.value);
      setCategoryImages(
        data.images
          .filter((img) => img.category === selectedButton?.toUpperCase())
          .slice()
          .sort((a, b) => a.order - b.order)
      );
    } else {
      clearFields();
    }
  }, [showModal, selectedButton]);

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

  const handleSort = () => {
    const categoryImagesClone = [...categoryImages];
    const temp = categoryImagesClone[dragCategoryImages.current];
    categoryImagesClone[dragCategoryImages.current] =
      categoryImagesClone[draggedOverCategoryImages.current];
    categoryImagesClone[draggedOverCategoryImages.current] = temp;
    setCategoryImages(() => {
      const updatedArray = categoryImagesClone.map((item, index) => ({
        ...item,
        order: index + 1,
      }));

      return updatedArray;
    });
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
        {isEditModal && (
          <div className="mt-4" style={{ cursor: "context-menu" }}>
            <span className="fw-bold">JOGOS DA CATEGORIA:</span>
            {categoryImages.map((img, key) => (
              <div
                className="mt-2"
                style={{
                  border: "1px solid black",
                  padding: 10,
                }}
                key={key}
                draggable
                onDragStart={() => (dragCategoryImages.current = key)}
                onDragEnter={() => (draggedOverCategoryImages.current = key)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                {key + 1} - {img?.title.toUpperCase()}
                <FontAwesomeIcon
                  style={{
                    cursor: "pointer",
                    marginBottom: 2,
                    color: "#e11414",
                  }}
                  className="ms-1"
                  fontSize={12}
                  icon={faUpDownLeftRight}
                />
              </div>
            ))}
          </div>
        )}
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
    if (fields.category.onError === false) {
      const obj = {
        id: isAddModal ? null : fields.category.id,
        name: fields.category.value?.toUpperCase(),
      };

      if (isAddModal) {
        addCategory(obj);
        setSelectedButton(obj.name);
        setCategoryImages([]);
      } else if (isEditModal) {
        editCategory(obj);
        categoryImages.forEach((img) => {
          const objImage = Object.assign(img, {
            category: fields.category.value,
          });
          editImage(objImage, false);
        });
        setSelectedButton(obj.name);
      } else {
        deleteCategory(obj?.id);
        setSelectedButton(data?.categories[0].name);
      }
      setShowModal(false);
    } else {
      Object.keys(fields).map((field) => {
        fieldsValidation(field, fields[field].value);
      });
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
          isAddModal
            ? addOrEditCategoryElement()
            : isEditModal
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
      <div className="container-categories-text text-center">
        <span style={{ fontSize: 36 }} className="normal-text fw-bold">
          ABAIXO ESTÃO LISTADOS{" "}
        </span>
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
        {loggedUser?.name && (
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
        images={categoryImages}
        addClassContainer="w-100 px-3 my-5"
        currentCategory={selectedButton}
      />
    </div>
  );
};

export default Categories;
