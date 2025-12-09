import { useQuery } from "@tanstack/react-query";

const useLoadUpazilas = () => {
  const { data: upazilas = [] } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await fetch("/upazilas.json");
      const data = await res.json();
      return data;
    },
  });

  return upazilas;
};

export default useLoadUpazilas;
