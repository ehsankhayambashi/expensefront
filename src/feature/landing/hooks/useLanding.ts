import { useRouter } from "next/navigation";

export const useLanding = () => {
  const router = useRouter();
  return {
    router,
  };
};
