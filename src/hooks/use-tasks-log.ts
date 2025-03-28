import { ITaskLog } from "@/interfaces/ITaskLog";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

const useGetTaskLogByDate = (date: string) => {
  const { data: tasks, isLoading } = useQuery<ITaskLog[]>({
    queryKey: ["tasks-log", date],
    queryFn: async () => (await api.get(`/tasks-log/${date}`))?.data,
  });

  return {
    tasks,
    isLoading,
  };
};

export const useTasksLog = () => {
  return {
    useGetTaskLogByDate,
  };
};
