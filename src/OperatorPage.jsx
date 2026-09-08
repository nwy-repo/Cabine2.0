import { useNavigate, useParams, Navigate } from "react-router-dom";
import { getOperator } from "./data/operators";
import BackLink from "./components/BackLink";
import passInternetIcon from "../images/passi.png";
import passMixIcon from "../images/passm.png";
import transfertIcon from "../images/transf.png";

export default function OperatorPage() {
  const { operatorId } = useParams();
  const navigate = useNavigate();
  const operator = getOperator(operatorId);

  if (!operator) return <Navigate to="/" replace />;

  const titleColor = operator.darkText ? "text-black" : `${operator.accentText}`;

  return (
    <section
      className={`flex flex-col text-center items-center p-4 justify-center min-h-screen gap-16 bg-gradient-to-t ${operator.gradientFrom} ${operator.gradientTo}`}
    >
      <div className="flex flex-col items-center gap-5 mt-20">
        <BackLink to="/" className="text-white" />
        <h1 className={`md:text-6xl text-4xl font-bold ${titleColor}`}>{operator.name}</h1>
        <p className="text-white/90 text-sm md:text-base">{operator.tagline}</p>
      </div>

      <div className="flex md:flex-row flex-col gap-10 pb-10">
        <button
          type="button"
          className="flex text-start items-center cursor-pointer justify-center bg-white/90 hover:bg-white transition w-80 h-25 gap-8 px-4 rounded-lg"
          onClick={() => navigate(`/operateur/${operator.id}/internet`)}
        >
          <img className="md:w-16 w-10" src={passInternetIcon} alt="Pass Internet" />
          <h2 className="font-bold text-xl">Pass Internet</h2>
        </button>

        <button
          type="button"
          className="flex text-start items-center cursor-pointer justify-center bg-white/90 hover:bg-white transition w-80 h-25 gap-8 px-4 rounded-lg"
          onClick={() => navigate(`/operateur/${operator.id}/mix`)}
        >
          <img className="md:w-16 w-10" src={passMixIcon} alt="Pass Mix" />
          <h2 className="font-bold text-xl">Pass Mix</h2>
        </button>

        <button
          type="button"
          className="flex text-start items-center cursor-pointer justify-center bg-white/90 hover:bg-white transition w-80 h-25 gap-8 px-4 rounded-lg"
          onClick={() => navigate(`/operateur/${operator.id}/transfert`)}
        >
          <img className="md:w-16 w-10" src={transfertIcon} alt="Transfert d'unité" />
          <h2 className="font-bold text-xl">Transfert d'unité</h2>
        </button>
      </div>
    </section>
  );
}
