import Link from "next/link";
import { IoClose } from "react-icons/io5";

export const ErrorModal = () => (
  <div className="fixed top-0 left-0 z-50 bg-zinc-900 w-full h-screen overflow-auto grid place-items-center">
    <div className="bg-rose-600 px-4 text-rose-100 rounded-md py-6 border-2 border-rose-400 opacity-80 text-lg">
      Houve um erro ao tentar encontrar o item que você deseja editar, tente
      novamente!
    </div>

    <Link
      href="?"
      className="bg-zinc-600 px-3 p-2 rounded-md text-white flex items-center gap-2 text-lg"
    >
      <IoClose />
      <span>Close</span>
    </Link>
  </div>
);
