module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_globals.scss";
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
};
