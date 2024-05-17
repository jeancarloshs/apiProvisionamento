import { Roles, rolesToMap } from "../models/rolesModel";
import { ICargos, IResponse } from "../types/cargosTypes";

export const rolesList = async () => {
    const rolesModel = await Roles.findAll({
        order: [
            ["id", "ASC"],
        ]
    });

    const rolesList: ICargos[] = rolesToMap(rolesModel);
    return rolesList;
}