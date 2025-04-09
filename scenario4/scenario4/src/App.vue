<script setup>
import {RecycleScroller} from "vue-virtual-scroller";
import {ref} from "vue";

const users = ref(Array.from({length: 10000}, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
})))

</script>

<template>
  <section>
    <RecycleScroller
        class="scroller"
        :items="users"
        :item-size="64"
        key-field="id"
        v-slot="{item}"
        :buffer="200"
        page-mode
    >
      <div class="user">
        {{item.name}}
      </div>
    </RecycleScroller>
  </section>
</template>
