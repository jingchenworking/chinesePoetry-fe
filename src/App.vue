<template>
    <div class="background" >
        <PoemHeader/>
    </div>
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
</style>
