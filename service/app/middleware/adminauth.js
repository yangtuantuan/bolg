module.exports = options => {
  return async function adminauth(ctx, next) {
    const openId = ctx.cookies.get('openId');
    if (openId) {
      ctx.cookies.set('openId', new Date().getTime(), {
        maxAge: 0.5 * 60 * 60 * 1000,
        overwite: true,
      });
      await next();
    } else {
      ctx.cookies.set('openId', null);
      ctx.body = { data: '没有登录', error_code: '500' };
    }
  }
}