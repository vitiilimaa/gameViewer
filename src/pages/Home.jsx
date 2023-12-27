import "../styles/pages/Home.css";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

const Home = () => {
  const { setLoadingScreen } = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleClickButton = () => {
    setLoadingScreen(true);
    setTimeout(() => {
      navigate("/categorias");
    }, 1000);
  };

  return (
    <div className="home-container pb-5">
      <div className="container-text px-5 text-center">
        <p>BEM-VINDO AO NOSSO MUNDO</p>
        <span className="normal-text fw-bold">VISUALIZE OS </span>
        <span className="featured-text fw-bold">MELHORES JOGOS </span>
        <span className="normal-text fw-bold">DE TODOS OS TEMPOS</span>
        <p>(NA MINHA OPINIÃO)</p>
        <Button
          title="VEJA AQUI"
          fontSize={20}
          onClick={() => handleClickButton()}
          addClassContainer="mt-5"
          addClassButton="px-5"
        />
      </div>
    </div>
  );
};

export default Home;
