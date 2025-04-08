import { ICategoryTask } from "@/interfaces/ITask";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data: categories, isLoading } = useQuery<ICategoryTask[]>({
    queryKey: ["categories"],
    queryFn: async () => (await api.get("/categories"))?.data,
  });

		return {
			categories, 
			isLoading
		}
};
