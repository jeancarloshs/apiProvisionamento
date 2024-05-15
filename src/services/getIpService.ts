import IpsModel from "../models/ipsModel.js"

export const getInfoIp = async (userId: number, userApp: number, ip: string) => {
    await fetch(`http://ip-api.com/json/${ip}`, {
        method: 'GET'
    }).then(response => response.json()
        .then(response => {
            if (response.status !== 'fail') {
                IpsModel.create({
                    userId: userId,
                    userApp: userApp,
                    countryName: response.country,
                    countryCode: response.countryCode,
                    estadoAbreviado: response.region,
                    estadoCompleto: response.regionName,
                    cidadeNome: response.city,
                    cepCidade: response.zip,
                    latitude: response.lat,
                    longitude: response.lon,
                    timezone: response.timezone,
                    isp: response.isp,
                    org: response.org,
                    as: response.as,
                    ipQuery: response.query
                })
            }
        }),
    ).catch(error => {
        console.error('Erro ao buscar os dados do IP:', error)
    })
}