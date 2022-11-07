
class BaseService{

    static baseFunction(){
        return new Promise(async (resolve, reject) => {
            try{
                resolve()
            }catch(err){
                reject(err)
            }
        })
    }

}

export default BaseService