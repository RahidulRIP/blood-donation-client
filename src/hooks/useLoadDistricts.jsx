import { useQuery } from "@tanstack/react-query";

const useLoadDistricts = () => {
  const { data: districtsData = [] } = useQuery({
    queryKey: ["districtsData"],
    queryFn: async () => {
      const res = await fetch("/districts.json");
      const data = await res.json();
      return data;
    },
  });
  return districtsData;
};

export default useLoadDistricts;
