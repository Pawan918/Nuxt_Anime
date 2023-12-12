<template>
    <div class="bg-[#1b1a1a] px-6 pt-5 ">
        <ClientOnly>
            <VideoPlayer :episodeId="episodeId" :poster="poster" class="mb-5"/>
        </ClientOnly>  
        <USelect v-model="selectValue" 
            :options="selectOption" 
            class="w-36 text-white mb-5 " 
            color="rose" 
            variant="outline"
            option-attribute="name"
            :ui="{  color:{rose : { outline : 'text-[red] bg-[#2a2a2a] focus:ring-0 dark:focus:ring-0'}},gap:'gap-y-1'}"/>
        <div class="flex gap-3 flex-wrap w-full lg:w-3/5 ">
            <div v-for="(episode, index) in currentEpisodes" :key="index">
                <UButton 
                    :label="`${episode.number}`"
                     variant="outline" 
                     @click="changeEpisode(episode.id)" color="rose" 
                     class="w-12 flex justify-center items-center"
                     />
            </div>
        </div> 
        <AnimeDetailsSection/>
    </div>
</template>
<script setup>
const route = useRoute()
const id = route.params.id;
const selectValue = ref(0)
const episodeId = ref(null)
const poster = ref('')
const { data: animeEpisodes } = await useFetch(`https://api-amvstrm.nyt92.eu.org/api/v2/episode/${id}`);
 episodeId.value = animeEpisodes.value.episodes[0].id
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
const currentEpisodes = ref([]);
watch(selectValue,()=>{
    let arr = [];
    for(let i=(selectValue.value*100);i < animeEpisodes.value.episodes.length && i<(selectValue.value*100)+100 ;i++){
        arr.push(animeEpisodes.value.episodes[i])
    }
    currentEpisodes.value = arr;
},{immediate : true})
const changeEpisode = (episode) => {
    episodeId.value = episode;
}
</script>