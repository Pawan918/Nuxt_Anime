<template>
    <VueVideoPlayer
        :src="src"
        controls
        :loop="true"
        :volume="0.6"
        :playbackRates =[0.5,1,1.5,2]
        preload="metadata"
        :responsive="true"
        class="w-auto"
        :height="400"
    />
</template>
<script setup>
import 'video.js/dist/video-js.css'
const { $VueVideoPlayer } = useNuxtApp()
const props = defineProps({
    episodeId : {
        type : String,
        required : true,
    }
})
const src = ref('')
watch(()=>props.episodeId,async()=>{
    const { data } = await useFetch(`https://anbuanime.onrender.com/vidcdn/watch/${props.episodeId}`)
    src.value = data.value?.sources[0]?.file
},{immediate : true})
</script>
<style scoped >
:deep(.vjs-big-play-button){
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}
:deep(.vjs-progress-control){
    color: red;
}
:deep(.vjs-slider){
    background-color: black;
}
:deep(.vjs-play-progress,){
    background-color: red;
}
:deep(.vjs-load-progress){
    background-color: white;
}
:deep(.vjs-control-bar){
    color: red;
}
</style>