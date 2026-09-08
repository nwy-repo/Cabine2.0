import { useNavigate } from "react-router-dom";

export default function BackLink({ to, label = "Retour", className = "" }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className={`text-[15px] underline cursor-pointer opacity-90 hover:opacity-100 ${className}`}
    >
      {label}
    </button>
  );
}
