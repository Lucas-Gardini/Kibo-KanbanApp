import { getUser } from "../plugins/firebase/auth";

let user = null;

export default defineNuxtRouteMiddleware((to, from) => {
	user = getUser();
	if (user || to.path === "/dashboard/login" || to.path === "/") {
		return true;
	} else {
		return navigateTo("/dashboard/login");
	}
});
