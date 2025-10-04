import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ASTRONAUT_SKINS, SKIN_OPTIONS } from "../constants";
import type { Skin } from "../types/types";

export const Astronaut = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [savedName, setSavedName] = useLocalStorage("astronaut-name", "Astronaut");
  const [savedSkin, setSavedSkin] = useLocalStorage<Skin>("astronaut-skin", "Default");

  const [tempName, setTempName] = useState(savedName);
  const [tempSkin, setTempSkin] = useState(savedSkin);

  useEffect(() => {
    if (isOpen) {
      setTempName(savedName);
      setTempSkin(savedSkin);
    }
  }, [isOpen, savedName, savedSkin]);

  // Cerrar con ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Imagen según skin (usar siempre la guardada para el botón, temporal solo para el preview del modal)
  const savedSkinData = ASTRONAUT_SKINS.find(s => s.id === savedSkin);
  const buttonSkinSrc = savedSkinData?.image || ASTRONAUT_SKINS[0].image;

  const modalSkinData = ASTRONAUT_SKINS.find(s => s.id === tempSkin);
  const modalSkinSrc = modalSkinData?.image || ASTRONAUT_SKINS[0].image;

  const handleSave = () => {
    // Guardar los valores temporales en localStorage
    setSavedName(tempName);
    setSavedSkin(tempSkin);
    console.log({ name: tempName, skin: tempSkin });
    setIsOpen(false);
  };

  return (
    <>
			<div className="absolute right-16 top-10 pointer-events-auto">
		<style>
			{`
			@keyframes floatInZeroG {
				0%   { transform: translateY(0px) translateX(0px) rotate(12deg); }
				25%  { transform: translateY(-6px) translateX(2px) rotate(10deg); }
				50%  { transform: translateY(-12px) translateX(-1px) rotate(14deg); }
				75%  { transform: translateY(-6px) translateX(1px) rotate(11deg); }
				100% { transform: translateY(0px) translateX(0px) rotate(12deg); }
			}
			.floatInZeroG {
				animation: floatInZeroG 6s ease-in-out infinite;
			}
			`}
		</style>

		<button
			type="button"
			onClick={() => setIsOpen(true)}
			className="focus:outline-none floatInZeroG inline-block"
		>
			<img
			src={buttonSkinSrc}
			alt="Open astronaut modal"
			className="h-20 w-auto hover:scale-110 transition-transform duration-500 ease-out"
			/>
		</button>
		</div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="astronaut-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

			<div
			className="relative rounded-2xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden font-mono bg-slate-800 text-white"
			onClick={(e) => e.stopPropagation()}
			>



			{/* Header modal */}
			<div className="flex items-center justify-between px-6 py-4 border-b border-gray-600">
				<h2 id="astronaut-modal-title" className="text-xl font-mono">
				Customize your Astronaut
				</h2>
				<button
				type="button"
				onClick={() => setIsOpen(false)}
				className="p-2 rounded-md hover:bg-gray-700 transition-colors"
				aria-label="Close"
				>
				✕
				</button>
			</div>

			{/* Grid columnas */}
			<div className="grid grid-cols-1 md:grid-cols-5">
				{/* Izquierda (preview) */}
				<div className="md:col-span-3 p-6 flex items-center justify-center bg-slate-800">
				<div className="relative w-full max-w-md aspect-square">
					<img
						src={modalSkinSrc}
						alt={modalSkinData?.name || "Astronaut"}
						className="absolute inset-0 m-auto max-h-full max-w-full drop-shadow-xl"
					/>
				</div>
				</div>

				{/* Derecha (controles) */}
				<div className="md:col-span-2 p-6 space-y-6">
				{/* Nombre */}
				<div>
					<label
					htmlFor="astro-name"
					className="block text-sm font-medium mb-2"
					>
					Name
					</label>
					<input
					id="astro-name"
					value={tempName}
					onChange={(e) => setTempName(e.target.value)}
					className="w-full rounded-lg px-3 py-2 outline-none bg-slate-700 text-white placeholder-gray-400"
					placeholder="Type a name"
					/>
				</div>

				{/* Skin */}
				<div>
					<span className="block text-sm font-medium mb-2">Skin</span>
					<div className="grid grid-cols-2 gap-2">
					{SKIN_OPTIONS.map((s) => (
						<button
						type="button"
						key={s}
						onClick={() => setTempSkin(s)}
						className={`rounded-lg border px-3 py-2 capitalize font-mono transition text-sm ${
							tempSkin === s
							? "border-white text-white"
							: "border-gray-500 text-gray-300 hover:border-white"
						}`}
						aria-pressed={tempSkin === s}
						>
						{s}
						</button>
					))}
					</div>
				</div>

				{/* Acciones */}
				<div className="flex items-center gap-3 pt-2">
					<button
					type="button"
					onClick={handleSave}
					className="flex-1 border border-white text-white font-mono px-4 py-2 rounded-lg hover:bg-white hover:text-slate-800 transition-colors"
					>
					Save
					</button>
					<button
					type="button"
					onClick={() => setTempSkin("Default")}
					disabled={tempSkin === "Default"}
					className={`px-4 py-2 border font-mono rounded-lg transition-colors ${
						tempSkin === "Default"
							? "border-gray-600 text-gray-500 cursor-not-allowed"
							: "border-white text-white hover:bg-white hover:text-slate-800"
					}`}
					>
					Reset Skin
					</button>
				</div>
				</div>
			</div>
			</div>
          {/* /Contenido */}
        </div>
      )}
    </>
  );
};
