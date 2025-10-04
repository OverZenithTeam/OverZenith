import { useEffect, useState } from "react";

type Skin = "Colombia" | "España" | "Venezuela" | "42";

export const Astronaut = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Astronaut");
  const [skin, setSkin] = useState<Skin>("Colombia");

  // Cerrar con ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Imagen según skin
  const skinSrc =
    {
      Colombia: "/images/colombia.png",
      España: "/images/españa.png",
      Venezuela: "/images/venezuela.png",
      "42": "/images/nombre.png",
    }[skin] ?? "/images/skins/astronaut-classic.png";

  const handleSave = () => {
    // Aquí puedes levantar el estado al padre / guardar en contexto
    console.log({ name, skin });
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón en header */}
      <div className="absolute right-4 top-[20px] pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="focus:outline-none"
        >
          <img
            src="/images/boton.png"
            alt="Open astronaut modal"
            className="h-[80px] w-auto transform rotate-12 hover:rotate-0 hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="astronaut-modal-title"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />

			<div
			className="relative rounded-2xl shadow-2xl w-full max-w-5xl mx-4 overflow-hidden"
			style={{ backgroundColor: "#282c34", color: "white" }}
			onClick={(e) => e.stopPropagation()}
			>
			{/* Header modal */}
			<div className="flex items-center justify-between px-6 py-4 border-b border-gray-600">
				<h2 id="astronaut-modal-title" className="text-xl font-bold">
				Customize your Astronaut
				</h2>
				<button
				type="button"
				onClick={() => setIsOpen(false)}
				className="p-2 rounded-md hover:bg-gray-700"
				aria-label="Close"
				>
				✕
				</button>
			</div>

			{/* Grid columnas */}
			<div className="grid grid-cols-1 md:grid-cols-5">
				{/* Izquierda (preview) */}
				<div
				className="md:col-span-3 p-6 flex items-center justify-center"
				style={{ backgroundColor: "#282c34" }}
				>
				<div className="relative w-full max-w-md aspect-square">
					<img
					src={skinSrc}
					alt={`Astronaut ${skin}`}
					className="absolute inset-0 m-auto max-h-full max-w-full drop-shadow-xl"
					/>
					<div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-black/60 text-white text-sm font-bold">
					{name || "Astronaut"}
					</div>
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
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full rounded-lg px-3 py-2 outline-none"
					style={{ backgroundColor: "#3a3f47", color: "white" }}
					placeholder="Type a name"
					/>
				</div>

				{/* Skin */}
				<div>
					<span className="block text-sm font-medium mb-2">Skin</span>
					<div className="flex gap-2">
					{(["Colombia", "España", "Venezuela", "42"] as Skin[]).map((s) => (
						<button
						type="button"
						key={s}
						onClick={() => setSkin(s)}
						className={`flex-1 rounded-lg border px-3 py-2 capitalize font-bold transition ${
							skin === s
							? "border-white text-white"
							: "border-gray-500 text-gray-300 hover:border-white"
						}`}
						aria-pressed={skin === s}
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
					className="flex-1 border border-white text-white font-bold px-4 py-2 rounded-lg hover:bg-white hover:text-[#282c34] transition"
					>
					Save
					</button>
					<button
					type="button"
					onClick={() => {
						setName("Astronaut");
						setSkin("classic");
					}}
					className="px-4 py-2 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#282c34] transition"
					>
					Reset
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
