<template>
    <UContainer class="bg-stone-800 py-8 max-w-none">
        <UCard :ui="{ body: { base: 'flex' } }">
            <div class="hidden bg-no-repeat bg-cover bg-center  lg:block lg:w-1/2  bg-[url('/login.avif')]">
            </div>
            <div class="w-full lg:w-1/2 flex justify-center items-center bg-white flex-col gap-4 tracking-wider">
                <UForm  :validate="validate" :state="state" @submit="onSubmit" @error="onError">
                    <div class="flex flex-col gap-4">
                        <div class="max-w-[250px] text-center text-xl font-semibold">Join Anikitsu for Free Anime Streaming</div>
                        <UButton label="Continue with Google" size="lg" class="flex justify-center font-bold leading-7 text-black tracking-wider" 
                            variant="outline" icon="i-mdi-google" @click="siginWithGoogle" :disabled="true"/>
                        <span class="mx-auto">or</span>
                        <UFormGroup name="name" v-if="isSignIn">
                            <UInput v-model="state.name" placeholder="Name" color="blue" size="lg" icon="i-mdi-user"
                                :trailing="true" :ui="{ placeholder: 'tracking-widest', base: 'tracking-widest' }" />
                        </UFormGroup>
                        <UFormGroup name="email" :ui="{ error: 'mt-1' }">
                            <UInput v-model="state.email" placeholder="you@example.com" color="blue" size="lg"
                                icon="i-mdi-email" :trailing="true"
                                :ui="{ placeholder: 'tracking-widest', base: 'tracking-widest' }" />
                        </UFormGroup>
                        <UFormGroup name="password" :ui="{ error: 'mt-1' }">
                            <UInput v-model="state.password" placeholder="Password" color="blue" size="lg" type="password"
                                icon="i-mdi-lock" :trailing="true"
                                :ui="{ placeholder: 'tracking-widest', base: 'tracking-widest' }" />
                        </UFormGroup>
                        <UFormGroup name="confirmPassword" v-if="isSignIn" :ui="{ error: 'mt-1' }">
                            <UInput v-model="state.confirmPassword" placeholder="ConfirmPassword" color="blue" size="lg"
                                type="password" icon="i-mdi-lock" :trailing="true"
                                :ui="{ placeholder: 'tracking-widest', base: 'tracking-widest' }" />
                        </UFormGroup>
                    </div>
                    <UButton class="bg-black hover:bg-black font-bold tracking-widest w-44 text-center flex justify-center mt-6 mx-auto"
                        size="xl" v-if="isSignIn" type="submit" label="Create account" />
                    <UButton class="bg-black hover:bg-black tracking-widest mx-auto w-44 text-center flex justify-center mt-6 font-bold"
                        size="xl" v-else type="submit" label="Let's Go" />
                    <div v-if="isSignIn" class="mt-2 flex justify-center gap-1">
                        If Already Signed In
                        <span class="underline text-[blue] hover:text-[blue] cursor-pointer"
                            @click="() => (isSignIn = false)">LogIn</span>
                    </div>
                    <div class="mt-2 flex justify-center gap-1" v-else>
                        If Not Signed In
                        <span class="underline text-[blue] hover:text-[blue] cursor-pointer" @click="() => (isSignIn = true)">
                            SignIn</span>
                    </div>
                </UForm>
            </div>
        </UCard>
    </UContainer>
</template>
<script setup>
const toast = useToast()
const isSignIn = ref(false);
const state = ref({
    name: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
})

const authStore = useAuthStore();
const router = useRouter();

const onError = async (event) => {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
const validate = () => {
    const errors = []
    if (!state.value.email || !state.value.email.includes('@gmail.com')) errors.push({ path: 'email', message: 'Valid Email Required' })
    if (!state.value.password || state.value.password.length < 8) errors.push({ path: 'password', message: 'Must be at least 8 characters' })
    if (isSignIn.value && (!state.value.confirmPassword || state.value.confirmPassword !== state.value.password)) errors.push({ path: 'confirmPassword', message: 'password mismatch' })
    return errors
}

const onSubmit = async (event) => {
    const authentication = isSignIn.value ? authStore.signIn : authStore.logIn;
    const user = await authentication(event.data);
    if (user.status === 200) {
        router.push("/");
    }
    toast.add({ title : user.message})
}
const siginWithGoogle = async()=>{
    const user = await authStore.googleSigin();
    if (user.status === 200) {
        router.push("/");
    }
    toast.add({ title : user.message})
}
</script>