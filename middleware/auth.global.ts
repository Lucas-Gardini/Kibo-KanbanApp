import { getUser } from "../plugins/firebase/auth";

export default defineNuxtRouteMiddleware((to, from) => {
	if (getUser() || to.path === "/login") {
		return true;
	} else {
		return navigateTo("/login");
	}
});
