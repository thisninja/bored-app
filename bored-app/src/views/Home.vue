<template>
  <div class="home">
    <el-tabs type="card">
      <el-tab-pane
        v-for="(item, index) in availableTabs"
        :key="index"
        :label="item.label"
        >
          <component :is="item.component" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions,
} from 'vuex';

import Activity from './Activity.vue';
import MyList from './MyList.vue';

export default {
  name: 'Home',
  components: {
    Activity,
    MyList,
  },
  computed: {
    ...mapGetters(['activity']),
  },
  methods: {
    ...mapActions(['fetchRandomActivity']),
  },
  data() {
    return {
      availableTabs: [
        {
          label: 'Activities',
          component: Activity,
        },
        {
          label: 'My List',
          component: MyList,
        },
      ],
    };
  },
  created() {
    if (!this.activity) {
      this.fetchRandomActivity();
    }
  },
};
</script>
