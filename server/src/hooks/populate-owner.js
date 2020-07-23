// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.data.hasOwnProperty('title')) {
      const data = {
        title: context.data.title,
        completed: false,
        user_id: context.params.user.github_id,
        createdAt: new Date(),
        badge: context.data.badge,
        pushDate: new Date(context.data.pushDate),
      };
      context.data = data;
      return context;
    } else {
      throw new Error('todo must have at least a title');
    }
  };
};
