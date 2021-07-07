'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/index/', adminauth, controller.admin.main.index);
  router.get('/admin/outLogin', adminauth, controller.admin.main.outLogin);
  router.post('/admin/checkOpenId', adminauth, controller.admin.main.checkOpenId);

  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);

  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle);
};
