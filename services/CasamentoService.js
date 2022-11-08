

export default class CasamentoService {

    static teste(){
        try{
            return "teste rota"
        }catch(err){
            return {err: err.message}
        }
    }

}