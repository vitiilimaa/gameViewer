import "../styles/pages/Categories.css";
import { useState } from "react";
import { Carousel, Button, TextInput, CustomModal } from "../components";
import data from "../../mock/db.json";

const Categories = () => {
  const [selectedButton, setSelectedButton] = useState(data.categories[0].name);
  const [showModal, setShowModal] = useState(false);
  const [fields, setFields] = useState({
    description: {
      value: "",
      onError: null,
      errorMessage: "",
    },
    url: {
      value: "",
      onError: null,
      errorMessage: "",
    },
  });

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
      <CustomModal title="ADICIONAR IMAGEM" showModal={showModal}>
        {" "}
        <TextInput
          id="description"
          title="Jogo"
          value={fields.description.value}
          isValidate={!fields.description.onError}
          errorMessage={fields.description.errorMessage}
          onChangeValue={(newValue) =>
            fieldsValidation("description", newValue)
          }
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
          value={fields.url.value}
          isValidate={!fields.url.onError}
          errorMessage={fields.url.errorMessage}
          onChangeValue={(newValue) => fieldsValidation("url", newValue)}
        />
      </CustomModal>
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
        <Button title="+ ADICIONAR" onClick={() => setShowModal(true)} />
      </div>
      <Carousel
        images={data.images.filter(
          (image, _) => image.category === selectedButton
        )}
        addClassContainer="w-100 px-3 my-5"
        currentCategory={selectedButton}
      />
    </div>
  );
};

export default Categories;
