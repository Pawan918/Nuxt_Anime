<template>
    <ClientOnly>
        <div class="">
            <h1 class="mt-3 text-xl text-slate-200">More Seasons</h1>
            <div v-for="(relation,index) in animeInfo?.relation" :key="index">
                <span v-if="relation?.type === 'ANIME'">
                    <NuxtImg :src="relation?.coverImage?.medium" alt="episode Image"/>
                </span>
            </div>
        </div>
        <div class="text-white flex mt-4 gap-8">
            <NuxtImg :src="animeInfo?.coverImage?.large" alt="Card" class="h-56" />
            <div>
                <div class="text-xl">
                    {{
                        truncate(
                            animeInfo.title.english ||
                            animeInfo.title.userPreferred ||
                            animeInfo.title.romaji,
                            35
                        )
                    }}
                </div>
                <div class="text-sm flex gap-2 mt-2 text-gray-500">
                    <span class="bg-[red] px-1 py-0.5 rounded-md text-white">{{
                        animeInfo?.format
                    }}</span>
                    <span class="border-[1px] px-2 rounded-sm">PG 13</span>
                    <span class="border-[1px] px-2 rounded-sm">HD</span>
                    <span class="bg-black flex gap-4 px-2 justify-center">
                        <span class="inline-flex items-center">
                            <UIcon name="i-mdi-closed-caption" />{{
                                animeInfo?.nextair?.episode - 1 || "?"
                            }}
                        </span>
                        <span class="inline-flex items-center">
                            <UIcon name="i-mdi-closed-caption" />{{
                                animeInfo?.episodes || "?"
                            }}
                        </span>
                    </span>
                </div>
                <div class="max-w-lg text-sm mt-2 text-slate-200" v-html="truncate(animeInfo?.description, 240)"></div>
                <div class="block md:flex gap-10 mt-2 text-sm">
                    <table class="max-w-xs border-separate border-spacing-y-2 tracking-wider max-h-10 text-slate-200">
                        <tr class="">
                            <td class="w-24">Type :</td>
                            <td>{{ animeInfo?.format || "?" }}</td>
                        </tr>
                        <tr class="">
                            <td class="w-24">Premeried :</td>
                            <td>
                                {{ animeInfo?.season || "?" }} {{ animeInfo?.year || "?" }}
                            </td>
                        </tr>
                        <tr>
                            <td class="w-24">Status :</td>
                            <td>{{ animeInfo?.status || "?" }}</td>
                        </tr>
                        <tr>
                            <td class="w-24">Duration :</td>
                            <td>{{ animeInfo?.duration || "?" }} min</td>
                        </tr>
                        <tr class="max-w-sm">
                            <td class="w-24">Studios :</td>
                            <td>
                                <span v-for="(data, index) in animeInfo.studios" :key="index"
                                    class="hover:text-red-500 hover:cursor-pointer">
                                    <span v-if="index == animeInfo?.studios.length - 1">{{
                                        data?.name
                                    }}</span>
                                    <span v-else> {{ data?.name }}, </span>
                                </span>
                            </td>
                        </tr>
                    </table>
                    <table class="max-w-[250px] ">
                        <tr>
                            <td class="w-24">Score :</td>
                            <td>{{ animeInfo?.score?.decimalScore || "?" }} / 10</td>
                        </tr>
                        <tr>
                            <td class="w-24">Date Aired :</td>
                            <td>
                                <span v-for="(data, key, index) in animeInfo?.startIn" :key="index">
                                    <span v-if="key === 'day'">{{ data }}</span>
                                    <span v-else>{{ data }}-</span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-24">Genres :</td>
                            <td>
                                <span v-for="(data, index) in animeInfo?.genres" :key="index">
                                    <span v-if="index == animeInfo?.genres.length - 1">{{
                                        data
                                    }}</span>
                                    <span v-else>{{ data }}, </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td class="w-24">Episodes :</td>
                            <td>{{ animeInfo?.nextair?.episode - 1 }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>
<script setup>
const route = useRoute();
const id = route.params.id;
const { data: animeInfo } = await useFetch(
    `https://api-amvstrm.nyt92.eu.org/api/v2/info/${id}`
);
console.log(animeInfo.value);
</script>
<style scoped>
:deep(br + br) {
    display: none;
}
</style>