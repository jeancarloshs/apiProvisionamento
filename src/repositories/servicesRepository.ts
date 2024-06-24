import { ServicesToMap, ServiceType } from "../database/models/tipoDeServicoModel";

export const serviceTypeListRepository = async (app: number) => {
    const serviceTypeListRepository = await ServiceType.findAll({
        where: {
            "app": app
        },
        order: [
            ["id", "ASC"],
        ]
    });

    const serviceType = ServicesToMap(serviceTypeListRepository);
    return serviceType;
};

export const createServiceTypeRepository = async (tipoDeServico: any, app: number) => {
    const createServiceTypeRepository = tipoDeServico.create({
        tipoDeServico: tipoDeServico,
        app: app
    });
    return createServiceTypeRepository;
}