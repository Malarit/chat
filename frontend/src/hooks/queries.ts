import { AxiosResponse } from "axios";
import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "react-query";
import axi from "../services/requests/requests";

type mutationOption = Omit<
  UseMutationOptions<any, any, any, any>,
  "mutationFn"
>;

function mutation<T>(
  fn: (obj: T) => Promise<AxiosResponse<any, any>>,
  option?: mutationOption
) {
  return useMutation({
    mutationFn: (obj: T) => fn(obj),
    ...option,
  });
}

export const useQueryUser = (userId: number | undefined) => {
  return useQuery(
    ["user", userId],
    () => {
      if (userId) return axi.get.user(userId);
    },
    {
      retry: () => !userId,
      refetchOnWindowFocus: false,
    }
  );
};

export const useMutationAuthorization = (option: mutationOption) => {
  return mutation(axi.post.authorization, option);
};

export const useMutationRegistration = (option: mutationOption) => {
  return mutation(axi.post.registration, option);
};
