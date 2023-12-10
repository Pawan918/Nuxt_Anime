<template>
    <div class="bg-[#1b1a1a] px-6 pt-5">
        <ClientOnly>
            <VideoPlayer :src="src" class="mb-5"/>
        </ClientOnly>  
        <USelect v-model="selectValue" :options="selectOption" class="w-44 text-white mb-5" color="rose" variant="outline" option-attribute="name"/>
        <div class="flex gap-3 flex-wrap w-3/5">
            <div v-for="(episode, index) in currentEpisodes" :key="index">
                <UButton :label="`${index + 1}`" variant="outline" @click="changeEpisode(episode.id)" color="rose" class="w-12 flex justify-center items-center"/>
            </div>
        </div> 
        <div class="text-white flex mt-4 gap-8">
            <NuxtImg :src="animeInfo?.coverImage?.large" alt="Card" class="h-56"/>
            <div class="">
                <div class="text-xl">{{truncate(animeInfo.title.english || animeInfo.title.userPreferred || animeInfo.title.romaji ,35)}}</div>
                <div class="text-sm flex gap-2 mt-2 text-gray-500">
                    <span class="bg-[red] px-1 py-0.5 rounded-md text-white">{{ animeInfo?.format }}</span>
                    <span class="border-[1px] px-2">PG 13</span>
                    <span class="border-[1px] px-2">HD</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const route = useRoute()
const id = route.params.id;
const { data: animeInfo } = await useFetch(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`)
const { data: animeEpisodes } = await useFetch(`https://api-amvstrm.nyt92.eu.org/api/v2/episode/${id}`);
const src = ref('how')
const selectValue = ref(1)

const loop = (times)=>{
    const arr = [];
    [...Array(times)].forEach((item , i)=>{
        arr.push({
            name : `${i*100} - ${(i+1)*100}`,
            value : i,
        })
    })
    return arr;
}
const selectOption = computed(()=>{
    const value =  Math.ceil(animeEpisodes.value.episodes.length / 100);
    const arr = loop(value);
    return arr;
})
const currentEpisodes = computed(()=>{
    let arr = [];
    console.log('hello');
    for(let i=(selectValue.value*100);i<((selectValue.value + 1)*100);i++){
        arr.push(animeEpisodes.value.episodes[i])
    }
    return arr;
})
console.log(selectValue.value);
console.log(currentEpisodes.value);
// console.log(selectOption.value)
// console.log(animeInfo)
// console.log(animeEpisodes.value.episodes[0])
const changeEpisode = (episode) => {

}
</script>