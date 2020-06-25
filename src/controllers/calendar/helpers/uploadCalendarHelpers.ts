// import Calendar from "../../../models/Calendar.model"
// import ClassModel from "../../../db/models/Class.model"

// export default class ParseCalendarFile {
//   private accountId: string
//   private calendarFile: Express.Multer.File
  
//   constructor (accountId: string, calendarFile: Express.Multer.File) {
//     this.accountId = accountId
//     this.calendarFile = calendarFile
//   }

//   public parse (): Calendar {
//     if (!this.isICS()) {
//       throw new Error ("The file type you uploaded is invalid.")
//     }
//     const calendar = this.parseICS ()
//   }
  
  // private isICS (): boolean {
  //   const fileName = this.calendarFile.originalname
  //   return fileName.split(".").pop() === "ics"
  // }
  
//   private parseICS (): Calendar {
//     const icsData = Buffer.from (String (this.calendarFile.buffer))
    
//     const classes = icsData.map ((item: Record<string, string>) => {

//     })
    
//     const arr: string[] = []

  
//     icsData.forEach((item: Record<string, string>) => {
//       if (item.type === "VEVENT") {
//         const index = item.summary.indexOf(" ", item.summary.indexOf( " " ) + 1)
//         const classCode = item.summary.substr(0, index)
//         if (!arr.includes(classCode)) {
//           arr.push(classCode)
//         }
//       }  
//     })
            
//     return new Calendar (accountId, arr)
//   }

  

// }

// export async function checkClassExists (classCode: string): Promise<boolean> {
//   const existingClass = await ClassModel.findOne({classCode: classCode})
//   if (existingClass) {
//     return true
//   }
//   return false
// }

// export async function updateClassInDB (classCode: string, studentID: string): Promise<boolean> {
//   try {
//     const existingClass = await ClassModel.findOne({classCode: classCode})
//     existingClass?.students.push(studentID)
//     await existingClass?.save()
//     return Promise.resolve(true)
//   } 
//   catch (error) {
//     return Promise.reject(false)
//   }
// }

// export async function writeNewClassInDB (classCode: string, studentID: string): Promise<any> {
//   const students: [string] = [studentID]
//   const newClass = new ClassModel({classCode: classCode, students: students})

//   newClass.save((err, classCreated) => {
//     if (err) {
//       return Promise.reject({error: err})
//     }
//     console.log(classCreated)
//     return Promise.resolve({classCreated})
//   })
// }

export default function isICS (fileName: string): boolean {
  return fileName.split(".").pop() === "ics"
}

  // private parseICS (): Calendar {
  //   const icsData = Buffer.from (String (this.calendarFile.buffer))
    
  //   const classes = icsData.map ((item: Record<string, string>) => {

  //   })
    
  //   const arr: string[] = []

  
  //   icsData.forEach((item: Record<string, string>) => {
  //     if (item.type === "VEVENT") {
  //       const index = item.summary.indexOf(" ", item.summary.indexOf( " " ) + 1)
  //       const classCode = item.summary.substr(0, index)
  //       if (!arr.includes(classCode)) {
  //         arr.push(classCode)
  //       }
  //     }  
  //   })
            
  //   return new Calendar (accountId, arr)
  // }