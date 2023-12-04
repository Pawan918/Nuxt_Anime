<template>
    <div class="pt-6 px-6 bg-[#1b1a1a]">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 ">
            <div v-for="data in data.results" class="cursor-pointer">
                <Card :data="data" class="h-72"/>
            </div>
        </div>
    </div>
</template>
<script setup>
const  {data}  = await useFetch('https://api-amvstrm.nyt92.eu.org/api/v2/trending');
console.log(data)
</script>