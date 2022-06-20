<script setup>
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Card from "primevue/card";
import Button from "primevue/button";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Divider from "primevue/divider";

/* 
Copyright (c) 2022 by Goodkatz (https://codepen.io/goodkatz/pen/LYPGxQz)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const responsive = ref(false);
const user = ref(null);
const password = ref(null);

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
</script>

<template>
	<div style="overflow: hidden; max-height: 100vh">
		<div class="header">
			<div class="inner-header flex">
				<Splitter :gutter-size="0" style="height: auto; margin: 25px" :layout="responsive ? 'vertical' : 'horizontal'">
					<SplitterPanel :size="65" v-if="!responsive">
						<Card class="auth-card">
							<template #content>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam
								deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
								quas!
							</template>
						</Card>
					</SplitterPanel>
					<SplitterPanel :size="35">
						<Card class="auth-card">
							<template #header>
								<Image src="logo/png/black_nobackground.png" alt="Image Text" imageStyle="height: 50px; width: 50px" />
							</template>
							<template #content>
								<span class="p-input-icon-left" style="margin-bottom: 20px">
									<i class="pi pi-envelope" />
									<InputText style="width: 100%" type="text" v-model="user" placeholder="Email" />
								</span>

								<Password
									v-model="password"
									promptLabel="Digite sua senha"
									weakLabel="Fraca"
									mediumLabel="Mediana"
									strongLabel="Forte"
									toggleMask
									placeholder="Senha"
									input-style="width: 100%"
								>
									<template #footer>
										<Divider />
										<p class="mt-2">Para uma senha mais segura:</p>
										<ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
											<li>Um caractere minúsculo</li>
											<li>Um caractere maiúsculo</li>
											<li>Um número</li>
											<li>Pelo menos 8 caracteres</li>
										</ul>
									</template>
								</Password>
								<Button
									class="p-button-raised"
									style="margin-top: 25px; background-color: #14b8a6; border: 1px solid #14b8a6"
									label="Entrar ou Cadastrar"
									icon="pi pi-check"
									iconPos="right"
								/>
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

		<div class="content flex">
			<p>
				Fundo: Goodkatz | Aplicação:
				<a style="color: #333333 !important" href="https://www.linkedin.com/in/lucasgardini/" target="_blank">Lucas Gardini Dias</a>
			</p>
		</div>
	</div>
</template>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);

p {
	font-family: "Lato", sans-serif;
	letter-spacing: 1px;
	font-size: 14px;
	color: #333333;
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
.header {
	position: relative;
	text-align: center;
	background: linear-gradient(60deg, #14b8a6 0%, #14b8a6 100%);
	color: white;
}
.logo {
	width: 50px;
	fill: white;
	padding-right: 15px;
	display: inline-block;
	vertical-align: middle;
}

.inner-header {
	height: 65vh;
	width: 100%;
	margin: 0;
	padding: 0;
}

.flex {
	/*Flexbox for containers*/
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.waves {
	position: relative;
	width: 100%;
	height: 15vh;
	margin-bottom: -7px; /*Fix for safari gap*/
	min-height: 100px;
	max-height: 150px;
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
/*Shrinking for mobile*/
@media (max-width: 768px) {
	.waves {
		height: 40px;
		min-height: 40px;
	}
	.content {
		height: 30vh;
	}
	h1 {
		font-size: 24px;
	}
}
</style>
