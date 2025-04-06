import { modal } from "@/components/modal-container";

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

function CreateTask() {
  return (
    <modal.background >
      <modal.form className="p-4 rounded-md max-w-[30rem] my-[10rem]">
        <modal.header className="p-0" title="Criar nova task" />
        <FormCreateTask />
      </modal.form>
    </modal.background>
  );
}

export { CreateTask };
