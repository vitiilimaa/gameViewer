import "../styles/pages/Home.css";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container justify-content-center">
      <div className="container-text px-3 text-center">
        <p>BEM-VINDO AO NOSSO MUNDO</p>
        <span className="normal-text fw-bold">VISUALIZE OS </span>
        <span className="featured-text fw-bold">MELHORES JOGOS </span>
        <span className="normal-text fw-bold">DE TODOS OS TEMPOS</span>
        <p>(NA MINHA OPINIÃO)</p>
        <Button
          title="VEJA AQUI"
          fontSize={20}
          onClick={() => navigate("/categorias")}
          addClassContainer="mt-5"
          addClassButton="px-5"
        />
      </div>
    </div>
  );
};

export default Home;
