import { modal } from "@/components/modal-container";
import { ReadonlyURLSearchParams } from "next/navigation";

interface ModalProps {
  params: ReadonlyURLSearchParams;
}

const FormCreateTask = () => {
  return (
    <section className="flex flex-col gap-2 mt-5">
      <label htmlFor="">
        <span>
          Nome da task
        </span>
      </label>
    </section>
  );
};

function CreateTask(_: ModalProps) {
  return (
    <modal.background>
      <modal.container className="p-4 rounded-md max-w-[30rem] my-[10rem]">
        <modal.header className="p-0" title="Criar nova task" />
        <FormCreateTask />
      </modal.container>
    </modal.background>
  );
}

export { CreateTask };
