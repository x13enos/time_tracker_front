<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <div 
        class="cursor-pointer" 
        :class="{ 'gray-color': !value }"
        v-on="on">
        <slot />
      </div>
    </template>
      <v-card class="pt-4 pb-2">
        <div class="pl-5 pb-2 subtitle">{{title}}</div>
        <div
          class="item-block d-flex justify-space-between"
          :class="{ active: item.value === value }"
          v-for="item in items"
          :key="item.value"
          @click="$emit('input', item.value)"
          @focus="$emit('selectPendingClass')">
            {{ item.name }}
            <v-icon v-if="item.value === value" class="font-green ml-4" small>mdi-check-circle</v-icon>
        </div>

        <template v-if="addLink && isManager">
          <div class="add-link ml-4 mt-4 mb-2 font-green cursor-pointer" @click="$router.push('/admin/projects')">
            <v-icon class="font-green" small>mdi-plus</v-icon>
            {{ addLink }}
          </div>
        </template>
      </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['value', 'items', 'title', 'addLink'],

  computed: {
    ...mapGetters(["isManager"])
  }
}
</script>

<style lang="scss" scoped>
  .item-block {
    padding: 10px 20px;
    background-color: white;
    font-size: 14px;
  }

  .item-block:hover {
    background-color: $active-bg;
    cursor: pointer;
  }

  .item-block.active {
    background-color: $active-bg;
  }

  .add-link {
    font-size: 14px;
  }
</style>
