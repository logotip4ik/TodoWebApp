// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.data.hasOwnProperty('title')) {
      const user_id = context.params.user.github_id;
      const data = {
        title: context.data.title,
        completed: false,
        user_id: user_id,
        createdAt: new Date(),
        badge: context.data.badge,
      };
      context.data = data;
      return context;
    } else {
      throw new Error('todo must have at least title');
    }
  };
};
