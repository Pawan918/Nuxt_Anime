<template>
    <UCard :ui="{body : {padding : 'px-0 py-0 sm:p-0'},ring : 'ring-0'}" class=" relative bg-[#1b1a1a] text-white" @click="cardHandler">
        <NuxtImg :src="data?.coverImage.extraLarge" class="min-w-full  max-h-60 overflow-hidden rounded-md" alt="Card Image"/>
        <p class="pt-0 text-sm text-center font-medium tracking-wider"> 
            {{truncate(data.title.english || data.title.userPreferred || data.title.romaji ,35)}}
        </p>
        <div class="absolute top-0 right-0 bg-red-500 rounded-md min-w-[30px] text-center font-semibold text-sm px-1">{{ data?.format || data?.type }}</div>
    </UCard>
    
</template>
<script setup>
const { data } = defineProps(['data'])
const router = useRouter()
const cardHandler = async()=>{

    // console.log(Infodata)
    // console.log(cardInfo)
    router.push(`/anime/${data.id}`)
}
</script>