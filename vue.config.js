module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_global.scss";
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },
};
