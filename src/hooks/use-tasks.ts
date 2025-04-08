import { ITask } from "@/interfaces/ITask";
import { queryClient } from "@/providers/query-client";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useAllTasks = () => {
  const { data: tasks, isLoading } = useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: async () => (await api.get("/tasks"))?.data,
  });

  return {
    tasks,
    isLoading,
  };
};

const useFindById = (taskId: string) => {
  const { data: task, isLoading } = useQuery<ITask>({
    queryKey: ["tasks", taskId],
    queryFn: async () => (await api.get(`/tasks/${taskId}`))?.data,
  });

  return {
    task,
    isLoading,
  };
};

const deleteTask = async (taskId: string) => {
  try {
    await api.delete(`/tasks/${taskId}`);
    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    toast.success("deleted");
  } catch (err: unknown) {
    toast.error("error trying delete task!");
    console.log(err);
  }
};

export const useTasks = () => {
  return {
    useAllTasks,
    useFindById,
    deleteTask,
  };
};
