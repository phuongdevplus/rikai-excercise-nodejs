import { DpRoleSchema } from "../schemas/Role.schemas.js";

export const RoleController = {
  get(req, res, next) {
    DpRoleSchema.find({})
      .then((course) => {
        res.json(course);
      })
      .catch(next);
  },
  create(request, response) {
    console.log(request.body);
    DpRoleSchema.create({
      RoleName: request.body.RoleName,
    })
  },
};
