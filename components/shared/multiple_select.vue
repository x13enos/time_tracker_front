<template>
  <v-menu
    v-model="menuOpened"
    content-class="multiple-select"
    :close-on-content-click="false"
    min-width="0"
    nudge-top="-25">
    <template v-slot:activator="{ on }">
      <div class="activator-wrapper" v-on="on">
        <slot />
      </div>
    </template>
      <v-card class="pt-4 pb-2">
        <div class="pl-5 pr-5 d-flex justify-space-between">
          <div class="subtitle">{{title}}</div>
          <v-icon small class="cursor-pointer" @click="menuOpened = false">mdi-close</v-icon>
        </div>
        <div class="items-block">
          <div
            class="item-block"
            v-for="item in items"
            :key="item.value">
              <span
                class="tag-title cursor-pointer"
                :class="{ active: value.includes(item.value) }"
                @click="selectItem(item.value)">
                {{ item.name }}
              </span>
          </div>
        </div>

        <template v-if="addLink && isManager">
          <div class="ml-4 mt-2 mb-2 font-green cursor-pointer add-link" @click="$router.push('/admin/tags')">
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
  
  data () {
    return {
      menuOpened: false
    }
  },

  computed: {
    ...mapGetters(["isManager"])
  },

  watch: {
    menuOpened: function(value) {
      if (!value) {
        this.$emit("update")
      }
    }
  },

  methods: {
    selectItem(item) {
      const currentItems = [...this.value];
      if (currentItems.includes(item))
        currentItems.splice(currentItems.indexOf(item), 1)
      else 
        currentItems.push(item)
      this.$emit('input', currentItems)
    }
  }
}
</script>

<style lang="scss" scoped>
  .activator-wrapper {
    max-width: 100%
  }

  .multiple-select {
    max-width: 20rem;
  }

  .items-block {
    padding: 10px 20px;
    display: flex;
    flex-flow: row wrap;
    column-gap: 10%;
    row-gap: 0.5rem;
  }

  .item-block {
    max-width: 9rem;
    flex-basis: 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tag-title {
    font-size: 14px;
    background-color: $gray-color-6;
    padding: 0px 8px;
    border-radius: 5px;
  }

  .tag-title.active {
    color: $object-green;
    background-color: $active-bg;
  }

  .add-link {
    font-size: 14px;
  }
</style>
