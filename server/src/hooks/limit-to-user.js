// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    if (context.method == 'find'){
      const user_id = context.params.user.github_id;
      var data = [];
      for (i in context.result){
        if (context.result[i].user_id === user_id){
          data.push(context.result[i]);
        }
      }
      context.result = data;
      return context;
    }
    else{
      if (context.result.user_id === context.params.user.github_id){
        return context;
      }
      else{
        return null;
      }
    }
  };
};
