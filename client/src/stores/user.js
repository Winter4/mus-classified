import { defineStore } from "pinia";
import router from '@/router';
import apiRequest from '@/helpers/apiRequest';

const baseUrl = `${import.meta.env.VITE_API_URL}/api`;

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    users: [],
  }),

  actions: {
    async register(email, phoneNumber, password, firstName, lastName, city) {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phoneNumber, password, firstName, lastName, city }),
      });
      
      if (res.ok != true) {
        if (res.status == 400) {
          alert("Какая-то ошибка!");
        }
      }
      else {
        const user = await res.json();
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }

      return false;
    },
    async authorize(username, password) {
      const res = await fetch(`${baseUrl}/users/authorize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok != true) {
        if (res.status == 400) {
          alert("Какая-то ошибка!");
        }
        else if (res.status == 401) {
          alert("Неверные данные!");
        }
      }
      else {
        const user = await res.json();
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }

      return false;
    },
    exit() {
      this.user = null;
      localStorage.removeItem('user');
      router.push({ name: 'main' });
    },
    async getAll(offset = 0, count = 20, role = -1) {
      let response = await apiRequest(
        "/users/getAll?" + new URLSearchParams({ offset, count, role }), 
        { method: 'GET', }
      );

      this.users = await response.json();
    },
    async editAdmin(id, role) {
      await apiRequest(
        "/users/editAdmin", 
        { 
          method: 'POST', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, role }),
        }
      );
    },
    async removeAdmin(id) {
      await apiRequest(
        "/users/removeAdmin",
        { 
          method: 'DELETE', 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
    },
  },
});