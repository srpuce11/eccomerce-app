import { useNavigate } from "react-router-dom";
import SliderHome from "../components/SliderCard/SliderHome";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <SliderHome></SliderHome>
    </>
  );
};
