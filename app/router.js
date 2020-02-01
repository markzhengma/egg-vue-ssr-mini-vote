'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.index);

  router.get('/user/all', controller.user.findAll);
  router.get('/user/single/:id', controller.user.findOne);
  router.post('/user/single', controller.user.create);
  router.get('/user/login', controller.user.login)

  router.get('/event/single/:id', controller.event.find);
  router.post('/event/single', controller.event.create);
  router.get('/event/all', controller.event.findAll);
  router.put('/event/status/:id', controller.event.updateOpenStatus);
};
