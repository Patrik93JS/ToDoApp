"use strict";

/**
 * to-do-group controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::to-do-group.to-do-group", {
  async create(ctx) {
    const user = ctx.state.user;

    const task = await super.create(ctx);

    const updated = await strapi.entityService.update(
      "api::to-do-group.to-do-group",
      task.data.id,
      {
        data: {
          owner: user.id,
        },
      }
    );

    return updated;
  },

  async find(ctx) {
    const user = ctx.state.user;

    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      owner: user.id,
    };

    return await super.find(ctx);
  },
});
