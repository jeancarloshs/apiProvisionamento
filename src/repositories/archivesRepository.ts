import { Archives, archivesToMap } from "../database/models/archivesModel";
import { IArquivos, IResponse } from "../types/archivesTypes";

export const arquivosRepository = async (app: number) => {
    const arquivosRepository = await Archives.findAll({
        where: {
            "app": app
        },
        order: [
            ["id", "ASC"],
        ]
    });
    const tbArquivos: IArquivos[] = archivesToMap(arquivosRepository);
    return tbArquivos;
};

export const createArchiveRepository = async (nomeArquivo: string, urlArquivo: string, app: number) => {
    const createArchive = await Archives.create({
        nome: nomeArquivo,
        url: urlArquivo,
        app: app,
    });
    return createArchive;
};

export const updateArchiveRepository = async (nomeArquivo: string, urlArquivo: string, app: number, fileID: number) => {
    const updateArchiveOBJ = {
        nome: nomeArquivo,
        url: urlArquivo,
        app: app
    };

    const file: IArquivos | any = await Archives!.findByPk(fileID);

    return await file.update({ updateArchiveOBJ }, {
        where: {
            "app": app
        }
    });
}