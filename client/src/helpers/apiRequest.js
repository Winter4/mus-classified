import { useUserStore } from "@/stores/user";

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export default async (input, init = {}) => {
  const userStore = useUserStore();

  if (userStore.user && userStore.user.token) {
    init.headers = init.headers || {};
    init.headers.Authorization = `Bearer ${userStore.user.token}`;
  }

  return fetch(`${baseUrl}${input}`, init)
  .then((response) => {
    if (response.status == 401) userStore.exit();
    return response;
  })
  .catch((error) => {
    console.log(error);
    let a = 1;
  })
}