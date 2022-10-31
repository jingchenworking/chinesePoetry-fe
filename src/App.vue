<template>
<section class="contents">
    <div class="background" >
        <PoemHeader/>
    </div>


    <div class="contents">
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</section>
</template>

<script>
    import PoemHeader from "@/components/PoemHeader.vue";
    export default {
        name: 'App',
        components: {PoemHeader},
    }
</script>

<style>
.background {
  background-color: #babaaa;
}

.otherColor {
  background-color: #babaaa; 
}
.contents{
        /* display: flex; */
        justify-content: center;
        background-color: #babaaa; 
}
.content{
        /* display: flex; */
        /* width: 1400px; */
        /* height: 1400px; */
        background-color: #babaaa; 
}

</style>
