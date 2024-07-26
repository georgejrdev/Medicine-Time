export type InputMedicine = {
    id: string
    name: string
    initDate: string
    endDate: string
    initHour: string
    spaceHours: number
    color: string
}


type Medicine = {
    id: string
    name: string
    date:string
    hours: string
    minutes: string
    color: string
}


export type SavedMedicines = {
    [date:string]: Medicine[]
}


export function generateId() :string {

    const caracters:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id:string = ''   
    
    for(let i = 0; i < 5; i++){
        id += caracters.charAt(Math.floor(Math.random() * caracters.length))
    }

    return id
}


function formatTwoDigits(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
}


export function saveHourMedicine(medicine: InputMedicine, savedMedicines: SavedMedicines) :SavedMedicines {
   
    const initDate = new Date(`${medicine.initDate}T00:00:00`)
    initDate.setHours(0, 0, 0, 0)

    const endDate = new Date(`${medicine.endDate}T00:00:00`)
    endDate.setHours(0, 0, 0, 0)

    const endDatePlusOneDay = new Date(endDate.getTime())
    endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1)

    const initHourParts = medicine.initHour.split(':')
    const initHour = parseInt(initHourParts[0], 10)
    const initMinute = parseInt(initHourParts[1], 10)
    const spaceHour = medicine.spaceHours

    let currentDate = new Date(initDate.getTime())
    currentDate.setHours(initHour, initMinute, 0, 0)

    do {
        const hours = formatTwoDigits(currentDate.getHours())
        const minutes = formatTwoDigits(currentDate.getMinutes())

        saveMedicineHours(medicine.id, medicine.name, currentDate.toISOString().split('T')[0], hours, minutes, medicine.color, savedMedicines)
        currentDate.setMinutes(currentDate.getMinutes() + spaceHour * 60)

    } while (currentDate < endDatePlusOneDay)

    return savedMedicines
}


export function createMedicine(name:string, initDate:string, endDate:string, initHour:string, spaceHours:number, color:string) : InputMedicine {
    let medicine: InputMedicine = {
        id: generateId(),
        name: name,
        initDate: initDate,
        endDate: endDate,
        initHour: initHour,
        spaceHours: spaceHours,
        color: color
    }

    return medicine
}


function saveMedicineHours(id:string, name:string, date:string, hours:string, minutes:string, color:string, savedMedicines:SavedMedicines) : SavedMedicines {
    
    if(!savedMedicines[date]) {
        savedMedicines[date] = []
    }
    
    savedMedicines[date].push({id, name, date, hours, minutes, color})

    return savedMedicines 
}