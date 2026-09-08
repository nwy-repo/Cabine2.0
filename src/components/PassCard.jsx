import { formatFcfa } from "../data/passes";

export default function PassCard({ pass, onBuy, accentBg, accentBgHover }) {
  return (
    <div className="flex flex-col justify-between gap-4 bg-white/90 rounded-xl p-4 w-full max-w-xs shadow-lg">
      <div className="text-left">
        <h3 className="font-bold text-lg leading-tight">{pass.name}</h3>
        {pass.data && <p className="text-sm text-neutral-700 mt-1">{pass.data}</p>}
        {pass.validity && <p className="text-xs text-neutral-500">Validité : {pass.validity}</p>}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-lg">{formatFcfa(pass.price)}</span>
        <button
          type="button"
          onClick={() => onBuy(pass)}
          className={`${accentBg} ${accentBgHover} transition text-white font-bold text-sm py-2 px-4 rounded-lg cursor-pointer`}
        >
          Acheter
        </button>
      </div>
    </div>
  );
}
