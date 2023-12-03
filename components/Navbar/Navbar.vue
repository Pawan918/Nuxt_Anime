<template>
   <div class="h-16 bg-black text-white flex justify-end items-center gap-4 px-6">
    <UButton color="red" variant="solid" label="Login" size="md" v-if="!isLoggedIn" @click="loginHandler"/>
    <NavbarProfile v-else/>
   </div>
</template>
<script setup >
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const { isLoggedIn } = storeToRefs(userStore)
const loginHandler = ()=>{
  router.push('/login');
}

</script>