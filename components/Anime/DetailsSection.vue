<template>
    <div class="text-white flex mt-4 gap-8">
        <NuxtImg :src="animeInfo?.coverImage?.large" alt="Card" class="h-56" />
        <div class="">
            <div class="text-xl">{{ truncate(animeInfo.title.english || animeInfo.title.userPreferred ||
                animeInfo.title.romaji, 35) }}</div>
            <div class="text-sm flex gap-2 mt-2 text-gray-500">
                <span class="bg-[red] px-1 py-0.5 rounded-md text-white">{{ animeInfo?.format }}</span>
                <span class="border-[1px] px-2 rounded-sm">PG 13</span>
                <span class="border-[1px] px-2 rounded-sm">HD</span>
                <span class="bg-black flex gap-4 px-2">
                    <span>{{ animeInfo?.nextair.episode || '?'  }}</span>
                    <span>{{ parseInt(animeInfo?.episodes)-1 || '?' }}</span>
                </span>
            </div>
            <div class="block md:flex gap-10 ">
                <div class="flex flex-col gap-2">
                    <div>
                        <span class="w-24 inline-block">Type : </span>
                        <span>{{ animeInfo?.format || '?' }} </span>
                    </div>
                    <div class="" >
                        <span class="w-24 inline-block">Premeried : </span>
                        <span>{{ animeInfo?.season || '?' }} {{ animeInfo?.year || '?' }} </span>
                    </div>
                    <div>   
                        <span class="w-24 inline-block">Status : </span>
                        <span>{{ animeInfo?.status || '?' }} </span>
                    </div>
                    <div>
                        <span class="w-24 inline-block">Duration : </span>
                        <span>{{ animeInfo?.duration || '?' }} min </span>
                    </div>
                    <div>
                        <span class="w-20 inline-block">Studios : </span>
                        <span v-for="(data) in animeInfo.studios">{{ data?.name}}, </span>
                    </div>
                </div>
                <div>Hell</div>
            </div>
        </div>
    </div>
</template>
<script setup>
const route = useRoute()
const id = route.params.id;
const { data: animeInfo } = await useFetch(`https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`);
console.log(animeInfo.value);
</script>