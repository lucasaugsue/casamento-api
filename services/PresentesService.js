import { Presentes } from '../lib/models/Presentes'


class PresentesService{

    static getAll(){
        return new Promise(async (resolve, reject) => {
            try{
                const presentes = await Presentes.query()
                
                resolve(presentes.sort((a, b) => a.id - b.id))
            }catch(err){
                reject(err)
            }
        })
    }

    static getAllById(id){
        return new Promise(async (resolve, reject) => {
            try{
                const presente = await Presentes.query().findById(id)
                
                resolve(presente)
            }catch(err){
                reject(err)
            }
        })
    }

    static create({params}){
        return new Promise(async (resolve, reject) => {
            try{
                await Presentes.query().insertAndFetch(params)

                resolve("Criado com sucesso!")
            }catch(err){
                reject(err)
            }
        })
    }

    static edit({id, params}){
        return new Promise(async (resolve, reject) => {
            try{
                await Presentes.query().patchAndFetchById(id, {
                    nome: params.nome, 
                    url: params.url,
                    preco: params.preco,
                });

                resolve("Editado com sucesso!")
            }catch(err){
                reject(err)
            }
        })
    }

    static delete({id}){
        return new Promise(async (resolve, reject) => {
            try{
                await Presentes.query().deleteById(id)
                
                resolve("Deletado com sucesso!")
            }catch(err){
                reject(err)
            }
        })
    }

}

export default PresentesService