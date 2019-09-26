<template>
  <div class="home">
    <el-tabs type="border-card" class="tabs">
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
  mapMutations,
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
    ...mapGetters(['activity', 'responseError']),
  },
  methods: {
    ...mapActions(['fetchActivity']),
    ...mapMutations(['CLEAR_RESPONSE_ERROR']),
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
  watch: {
    responseError(value) {
      if (value) {
        this.$notify.error({
          title: 'Error',
          message: this.responseError,
        });

        this.CLEAR_RESPONSE_ERROR();
      }
    },
  },
  created() {
    if (!this.activity) {
      this.fetchActivity();
    }
  },
};
</script>

<style lang="scss" scoped>
.home /deep/ {
  display: flex;
  justify-content: center;
  margin: 100px auto 200px auto;

  .tabs {
    width: 500px;
  }

  .el-tabs__content {
    height: 350px;
  }
}
</style>
