import { getUser } from "../plugins/firebase/auth";

export default defineNuxtRouteMiddleware((to, from) => {
	if (getUser() || to.path === "/dashboard/login" || to.path === "/") {
		return true;
	} else {
		return navigateTo("/dashboard/login");
	}
});
