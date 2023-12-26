import { useEffect, useState, useContext } from "react";
import "../styles/components/Carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import { TextInput, CustomModal, Button } from "./";
import { addImage, editImage, deleteImage } from "../services/imageApiServices";
import validateFields from "../helpers/validateFields";
import { UserContext } from "../contexts/UserContext";

const Carousel = ({
  images,
  addClassCarousel = "",
  addClassContainer = "",
  currentCategory,
}) => {
  const { loggedUser } = useContext(UserContext);
  const [counter, setCounter] = useState(1);
  const [prevCategory, setPrevCategory] = useState(currentCategory);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedSlide, setSelectedSlide] = useState({});
  const [fields, setFields] = useState({
    title: {
      value: "",
      onError: null,
      errorMessage: "",
    },
    description: {
      value: "",
      onError: null,
      errorMessage: "",
    },
    src: {
      value: "",
      onError: null,
      errorMessage: "",
    },
  });

  useEffect(() => {
    const action = modalTitle.split(" ")[0];

    if (action === "EDITAR" || action === "REMOVER") {
      Object.keys(selectedSlide).forEach((currentSlide) => {
        Object.keys(fields).forEach((field) => {
          if (currentSlide === field) {
            fieldsValidation(currentSlide, selectedSlide[currentSlide]);
          }
        });
      });
    } else {
      clearFields();
    }
  }, [showModal]);

  useEffect(() => {
    if (currentCategory !== prevCategory) {
      setCounter(1);
    }

    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide) => {
      const numeroDoSlide = parseInt(slide.id.split("slide-")[1]);
      if (counter === 1 || counter === numeroDoSlide) {
        document.getElementById(`slide-${numeroDoSlide}`).style.marginLeft =
          counter === 1 ? 0 * 25 + "%" : -25 + "%";
      }

      if (counter === numeroDoSlide) {
        document.getElementById(`radio${numeroDoSlide}`).checked = true;
        document.querySelector(
          `label[for="radio${numeroDoSlide}"]`
        ).style.backgroundColor = "#fff";
      } else {
        document.getElementById(`radio${numeroDoSlide}`).checked = false;
        document.querySelector(
          `label[for="radio${numeroDoSlide}"]`
        ).style.backgroundColor = "transparent";
      }
    });
    setPrevCategory(currentCategory);

    const intervalId = setInterval(() => {
      nextImage();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [counter]);

  const nextImage = () => {
    if (counter === images.length) setCounter(1);
    else setCounter((prevCounter) => ++prevCounter);
  };

  const handleModal = (title, show, obj = {}) => {
    setModalTitle(title);
    setShowModal(show);
    setSelectedSlide(obj);
  };

  const clearFields = () => {
    Object.keys(fields).map((field) =>
      setFields((prevState) => ({
        ...prevState,
        [field]: {
          value: "",
          onError: null,
          errorMessage: "",
        },
      }))
    );
  };

  const fieldsValidation = (field, newValue) => {
    const { existError, message } = validateFields(field, newValue);

    setFields((prevState) => ({
      ...prevState,
      [field]: {
        value: newValue,
        onError: existError,
        errorMessage: message,
      },
    }));
  };

  const addOrEditGameElement = () => {
    return (
      <>
        <TextInput
          id="title"
          title="Jogo"
          value={fields.title.value}
          isValidate={!fields.title.onError}
          errorMessage={fields.title.errorMessage}
          onChangeValue={(newValue) => fieldsValidation("title", newValue)}
        />
        <TextInput
          id="description"
          title="Descrição"
          addClassToContainer="mt-4"
          value={fields.description.value}
          isValidate={!fields.description.onError}
          errorMessage={fields.description.errorMessage}
          onChangeValue={(newValue) =>
            fieldsValidation("description", newValue)
          }
        />
        <TextInput
          id="url"
          title="URL"
          addClassToContainer="mt-4"
          value={fields.src.value}
          isValidate={!fields.src.onError}
          errorMessage={fields.src.errorMessage}
          onChangeValue={(newValue) => fieldsValidation("src", newValue)}
        />
      </>
    );
  };

  const removeGameElement = () => {
    return (
      <span>
        Você deseja remover o jogo <strong>{selectedSlide.title}</strong>?
      </span>
    );
  };

  const handleClickSaveButton = () => {
    if (
      modalTitle === `REMOVER ${selectedSlide.title?.toUpperCase()}` ||
      (fields.title.onError === false &&
        fields.description.onError === false &&
        fields.src.onError === false)
    ) {
      const obj = {
        id:
          modalTitle === `EDITAR ${selectedSlide.title?.toUpperCase()}`
            ? selectedSlide?.id
            : null,
        title: fields.title.value,
        description: fields.description.value,
        src: fields.src.value,
        category: currentCategory,
        alt: fields.title.value,
      };

      if (modalTitle === "ADICIONAR JOGO") addImage(obj);
      else if (modalTitle === `EDITAR ${selectedSlide.title?.toUpperCase()}`)
        editImage(obj);
      else deleteImage(selectedSlide.id);
      setShowModal(false);
    } else {
      Object.keys(fields).map((field) => {
        fieldsValidation(field, fields[field].value);
      });
    }
  };

  return (
    <div
      className={`carousel-container d-flex justify-content-center ${addClassContainer}`}
    >
      <CustomModal
        title={modalTitle}
        showModal={showModal}
        onHide={() => setShowModal(false)}
        body={
          modalTitle === "ADICIONAR JOGO"
            ? addOrEditGameElement()
            : modalTitle === `EDITAR ${selectedSlide.title?.toUpperCase()}`
            ? addOrEditGameElement()
            : removeGameElement()
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
      <div
        className={`carousel ${addClassCarousel} ${
          images.length === 0
            ? "d-flex justify-content-center align-items-center"
            : ""
        }`}
      >
        {images.length > 0 ? (
          <>
            <div className="slides">
              {images.map((_, key) => (
                <input
                  key={key + 1}
                  type="radio"
                  name="radio-btn"
                  id={`radio${key + 1}`}
                  checked={counter === key + 1}
                  onChange={() => setCounter(key + 1)}
                />
              ))}
              {images.map((image, key) => (
                <div key={key + 1} id={`slide-${key + 1}`} className="slide">
                  <div className="carousel-text">
                    {loggedUser?.name && (
                      <>
                        <Dropdown className="float-end ms-4">
                          <Dropdown.Toggle
                            style={{ fontSize: 14, padding: "8px 20px" }}
                            className="fw-normal"
                            variant="success"
                            id="dropdown-basic"
                          >
                            Ações
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                handleModal("ADICIONAR JOGO", true, image);
                              }}
                            >
                              <FontAwesomeIcon className="me-2" icon={faPlus} />
                              Adicionar jogo
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                handleModal(
                                  `EDITAR ${image.title?.toUpperCase()}`,
                                  true,
                                  image
                                );
                              }}
                            >
                              <FontAwesomeIcon
                                className="me-2"
                                icon={faPenToSquare}
                              />
                              Editar
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                handleModal(
                                  `REMOVER ${image.title?.toUpperCase()}`,
                                  true,
                                  image
                                );
                              }}
                            >
                              <FontAwesomeIcon
                                className="me-2"
                                icon={faTrash}
                              />
                              Remover
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </>
                    )}
                    <h1 className="featured-text limited-text">
                      {image.title}
                    </h1>
                    <hr />
                    <p style={{ margin: 0 }}>{image.description}</p>
                  </div>
                  <img
                    style={{ color: "#fff" }}
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
              ))}
              <div className="navigation-auto">
                {images.map((_, key) => (
                  <div key={key + 1} className={`auto-btn${key + 1}`} />
                ))}
              </div>
            </div>
            <div className="manual-navigation">
              {images.map((_, key) => (
                <label
                  key={key}
                  htmlFor={`radio${key + 1}`}
                  className="manual-btn"
                />
              ))}
            </div>
          </>
        ) : (
          <Button
            title="+ ADICIONAR"
            onClick={() => {
              handleModal("ADICIONAR JOGO", true);
              addOrEditGameElement();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Carousel;
