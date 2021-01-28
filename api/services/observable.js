exports.observable = {
  create: function (fn) {
    return {
      subscribe: function (next) {
        fn({ next: next })
      }
    }
  }
}