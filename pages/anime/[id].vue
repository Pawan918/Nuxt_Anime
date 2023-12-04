<template>
    
</template>
<script setup>
const route = useRoute()
const id = route.params.id;
    const { data : animeInfo } = await useFetch(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`)
    const { data : animeEpisodes } = await useFetch(`https://api-amvstrm.nyt92.eu.org/api/v2/episode/${id}`);
    console.log(animeEpisodes)
    console.log(animeInfo)
</script>