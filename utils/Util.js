import moment from 'moment'

export const CRYPT_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImIxMTFmMDc1LWI5ZWQtNGZiMC1iMTkyLTZhOTQ3ZDVjMjZmOCIsImlhdCI6MTU1NjM3Njk5NSwiZXhwIjoxNTU2MzgwNTk1fQ.Tw_OGQBINy8YslKwvsoeufkD97NqYeu-PiaqhTeLUj4'

export const firstsLettersUpper = (str) => {
    if(!str) return str

    return str.toString().split(" ").reduce((pv, s) => { 
        let formated = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
        return pv + (pv === "" ? formated : ` ${formated}`)
    }, "")
}

export const unbuffResult = (result) => {
    return (result || []).map( function(row) {
        const newItem = {}
        for(let item in row){
            if(Buffer.isBuffer(row[item])){
                newItem[item] = ab2str(row[item])
            }else{
                newItem[item] = row[item]
            }
        }
        return newItem
    })
}

export const assignObject = (item, key) => {
    let res = {}
    for(let k in item){
        const splited = k.split(".")
        if(splited.length > 1 && splited[0] === key){
            res[splited[1]] = item[k]
        }   
    }
    return res
}

export function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export const removeSpecialChars = (str) => {
    return str ? str.toString().replace(/\-|\ |\.|\,|\_|\(|\)|\//g, "") : null
}

export function groupBy(list, func, keyValidator){
    let map = [];
    list.forEach((item) => {
        let key = func(item);
        
        let i = -1;
        map.forEach((mapItem, index) => {
            if(i === -1 && (
                (mapItem[0] === key) ||
                (keyValidator && mapItem[0][keyValidator] === key[keyValidator])
            )) i = index;
        })
        
        if(i === -1) map.push([key, [item]])
        else map[i][1].push(item);
    })

    return map;
}

export function permit(object, keys){
    let res = {...object}

    for(let k in res) if(keys.indexOf(k) === -1) delete res[k];

    return res;
}

export function formatCpf(cpf){
    if(!cpf) return null;
    else{
        let c = cpf.replace(/\.|\-|\//g, '')
        return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9, 11)}`
    }
}

export function formatCnpj(cnpj){
    if(!cnpj) return null;
    else{
        let c = cnpj.replace(/\.|\-|\//g, '')
        return `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12, 14)}`
    }
}

export function formatReais(value){
    return `R$ ${(value ? value : 0).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}`
}

export function formatPhone(phone){
    return phone ? `+55${phone.replace(/\-|\ |\.|\,|\_|\(|\)|\//g, "")}` : null
}

export function cieloAmountToFloat(amount){
    return parseFloat(
        amount.toString().slice(0, (amount.toString().length - 2)) + 
        "." + 
        amount.toString().slice((amount.toString().length - 2))
    )
}

export function formatString(str){
    if(str === null || str === undefined) return str;
    else return str.toString().toUpperCase()
}

export function validCpf(strCPF){
    strCPF = strCPF.replace(/ |\.|\-|\//g, "")
    let sum;
    let rest;
    sum = 0;
    if (!strCPF || strCPF === "00000000000") return false;
        
    for (let i=1; i<=9; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    rest = (sum * 10) % 11;
    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(9, 10)) ) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    rest = (sum * 10) % 11;
    
    if ((rest == 10) || (rest == 11))  rest = 0;
    if (rest != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

export function getExtenseMonth(month){
    return [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ][parseInt(month)]
}

export function getWeekDay(date){
    return [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ][moment(date).weekday()]
}

export function getExtenseWeekday(number){
    return [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ][number]
}


export function getExtenseDate(date){
    let mdate = moment(date)

    return (
        mdate.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
        ? "Hoje"
        : mdate.format("YYYY-MM-DD") === moment().add(1, "days").format("YYYY-MM-DD")
            ? "Amanhã"
            : [
                `Segunda-feira`, `Terça-feira`, `Quarta-feira`, `Quinta-feira`, `Sexta-feira`, `Sábado`, `Domingo`
            ][parseInt(mdate.format("E")) - 1] + 
            ` - ${moment(date).format("DD")} de ${getExtenseMonth(parseInt(moment(date).format("MM")) - 1)} de ${moment(date).format("YYYY")}`
    ).toUpperCase()
}
