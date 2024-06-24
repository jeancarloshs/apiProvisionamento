import { Roles, rolesToMap } from "../database/models/rolesModel";
import { ICargos } from "../types/rolesTypes";

export const rolesListRepository = async () => {
    const rolesModel = await Roles.findAll({
        order: [
            ["id", "ASC"],
        ]
    });

    const rolesList: ICargos[] = rolesToMap(rolesModel);
    return rolesList;
}