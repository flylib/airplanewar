

export default class utils {
     //时间格式化 YYYY年MM月DD日 hh:mm:ss
   static TimeFormt(time:Date):string { 

        cc.log("day",time.getDay().toString())
        cc.log("day num",time.getDay())
        cc.log("date ",time.getDate())
        return "YYYY年MM月DD日 hh:mm:ss"
        .replace("YYYY",time.getFullYear().toString())
        .replace("MM",time.getMonth()<10?0+time.getMonth().toString():time.getMonth().toString())
        .replace("DD",time.getDate()<10?0+time.getDate().toString():time.getDate().toString())
        .replace("hh",time.getHours()<10?0+time.getHours().toString():time.getHours().toString())
        .replace("mm",time.getMinutes()<10?0+time.getMinutes().toString():time.getMinutes().toString())
        .replace("ss",time.getSeconds()<10?0+time.getSeconds().toString():time.getSeconds().toString())
    }
}