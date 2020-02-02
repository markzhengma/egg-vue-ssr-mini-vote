'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.index);
  router.get('/csr', controller.index.csr);

  router.get('/user/all', controller.user.findAll);
  router.get('/user/single/:id', controller.user.findOne);
  router.post('/user/single', controller.user.create);
  router.get('/user/login', controller.user.login)

  router.get('/event/single/:id', controller.event.find);
  router.post('/event/single', controller.event.create);
  router.delete('/event/single/:id', controller.event.deleteOne);
  router.get('/event/all', controller.event.findAll);
  router.put('/event/status/:id', controller.event.updateOpenStatus);

  router.post('/event/vote', controller.event.createUserOption);
  router.delete('/event/vote', controller.event.deleteUserOption);
};
