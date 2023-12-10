<template>
    <VueVideoPlayer
        src="https://www041.vipanicdn.net/streamhls/7f8dd00fcdec4483b9ff13f47a3ec4e2/ep.1.1696001423.m3u8"
        poster="https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg"
        controls
        :loop="true"
        :volume="0.6"
        :playbackRates =[0.5,1,1.5,2]
        preload="metadata"
        :responsive="true"
        class="w-auto lg:w-3/5"
    />
</template>
<script setup>
import 'video.js/dist/video-js.css'
const { $VueVideoPlayer } = useNuxtApp()
const props = defineProps({
    src : {
        type : String,
        required : true,
    },
    poster : {
        type : String,
        required : false,
    }
})
console.log(props.src)
// console.log(object)
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