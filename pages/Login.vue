<script setup lang="ts">
import { login, LoginTypes } from "../plugins/firebase/auth";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Card from "primevue/card";
import Button from "primevue/button";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Divider from "primevue/divider";
import ProgressSpinner from "primevue/progressspinner";

const responsive = ref(false);
const user = ref(null);
const password = ref(null);
const loading = ref(false);
const loginValue = ref("");

onMounted(() => {
	checkResponsivity();
	window.addEventListener("resize", checkResponsivity);
});

const checkResponsivity = () => {
	if (window.innerWidth < 728) {
		responsive.value = true;
	} else {
		responsive.value = false;
	}
};

watch(user, () => {
	loginValue.value = "";
});

watch(password, () => {
	loginValue.value = "";
});

const authenticate = async (type: LoginTypes) => {
	switch (type) {
		case "email":
			loading.value = true;
			loginValue.value = await login("email", user.value, password.value);
			console.log(loginValue.value);
			loading.value = false;
			break;

		case "google":
			loading.value = true;
			loginValue.value = await login("google");
			console.log(loginValue.value);
			loading.value = false;
			break;
	}

	if (!loginValue.value.includes("Error")) {
		return navigateTo("/");
	}
};
</script>

<template>
	<div>
		<div class="waves-container">
			<div class="inner-header flex">
				<Splitter :gutter-size="0" style="height: auto; margin: 25px" :layout="responsive ? 'vertical' : 'horizontal'">
					<!-- <SplitterPanel :size="65" v-if="!responsive">
						<Card class="auth-card">
							<template #content>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
								deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
								quas!
							</template>
						</Card>
					</SplitterPanel> -->
					<SplitterPanel :size="50">
						<Card class="auth-card">
							<template #header>
								<Image src="logo/png/black_nobackground.png" alt="Image Text" imageStyle="height: 50px; width: 50px" />
							</template>
							<template #content>
								<ProgressSpinner v-if="loading" />

								<div v-else style="display: flex; flex-direction: column">
									<span class="p-input-icon-left" style="margin-bottom: 20px">
										<i class="pi pi-envelope" />
										<InputText
											style="width: 100%"
											type="text"
											v-model="user"
											placeholder="Email"
											:class="loginValue.includes('invalid-email') || (loginValue.includes('missing-email') && 'p-invalid')"
										/>
									</span>

									<Password
										v-model="password"
										toggleMask
										placeholder="Senha"
										input-style="width: 100%"
										:feedback="false"
										:class="loginValue.includes('wrong-password') && 'p-invalid'"
									/>
									<Button
										class="p-button-raised"
										style="margin-top: 25px; background-color: #14b8a6; border: 1px solid #14b8a6"
										label="Entrar ou Cadastrar"
										icon="pi pi-check"
										iconPos="right"
										@click="authenticate('email')"
									/>
									<Divider align="center"> ou </Divider>
									<Button
										class="p-button-raised"
										style="background-color: #14b8a6; border: 1px solid #14b8a6"
										label="Entrar com google"
										icon="pi pi-google"
										iconPos="right"
										@click="authenticate('google')"
									/>
								</div>
							</template>
						</Card>
					</SplitterPanel>
				</Splitter>
			</div>

			<!--Waves Container-->
			<div>
				<svg
					class="waves"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 24 150 28"
					preserveAspectRatio="none"
					shape-rendering="auto"
				>
					<defs>
						<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
					</defs>
					<g class="parallax">
						<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
						<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
						<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
						<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
					</g>
				</svg>
			</div>
		</div>

		<!-- <div v-if="!responsive" class="content flex">
			<p>
				Fundo: Goodkatz | Aplicação:
				<a style="color: #333333 !important" href="https://www.linkedin.com/in/lucasgardini/" target="_blank">Lucas Gardini Dias</a>
			</p>
		</div> -->
	</div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);

body {
	overflow: hidden;
	background-color: #14b8a6;
}

p {
	font-family: "Lato", sans-serif;
	letter-spacing: 1px;
	font-size: 14px;
	color: #333333;
}

.p-splitter,
.p-card {
	border-radius: 0px;
}

.p-splitter-gutter {
	width: 0px !important;
}

.auth-card {
	display: flex;
	flex-direction: column;
	background-color: #fff;
	/* border-radius: 5px; */
	/* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
	padding: 20px;
	/* margin-bottom: 20px; */
	height: 100%;
}

.auth-card-body {
	display: flex !important;
	flex-direction: row !important;
}
.waves-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	/* width: 100vh; */
	height: 100vh;
	text-align: center;
	background: linear-gradient(60deg, #14b8a6 0%, #14b8a6 100%);
	color: white;
}

@media (max-width: 768px) {
	.waves-container {
		height: 95vh;
	}
}

.logo {
	width: 50px;
	fill: white;
	padding-right: 15px;
	display: inline-block;
	vertical-align: middle;
}

.inner-header {
	position: absolute;
	height: 65vh;
	width: 100%;
	margin: 0;
	margin-bottom: 25px;
	padding: 0;
	z-index: 2;
}

.flex {
	/*Flexbox for containers*/
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.waves {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 25vh;
	z-index: 1;
}

.content {
	position: relative;
	height: 20vh;
	text-align: center;
	background-color: white;
}

/* Animation */

.parallax > use {
	animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
	animation-delay: -2s;
	animation-duration: 7s;
}
.parallax > use:nth-child(2) {
	animation-delay: -3s;
	animation-duration: 10s;
}
.parallax > use:nth-child(3) {
	animation-delay: -4s;
	animation-duration: 13s;
}
.parallax > use:nth-child(4) {
	animation-delay: -5s;
	animation-duration: 20s;
}
@keyframes move-forever {
	0% {
		transform: translate3d(-90px, 0, 0);
	}
	100% {
		transform: translate3d(85px, 0, 0);
	}
}

/* 
Copyright (c) 2022 by Goodkatz (https://codepen.io/goodkatz/pen/LYPGxQz)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
</style>
