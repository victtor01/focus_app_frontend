import { ITask } from "@/interfaces/ITask";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

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

export const useTasks = () => {
  return {
    useAllTasks,
  };
};
