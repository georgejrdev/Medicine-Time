export type InputMedicine = {
    id: string;
    name: string;
    initDate: string;
    endDate: string;
    initHour: string;
    spaceHours: number;
    color: string;
}


type Medicine = {
    id: string;
    name: string;
    date: string;
    hours: string;
    minutes: string;
    color: string;
}


export type SavedMedicines = {
    [date: string]: Medicine[];
}


export function generateId(): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id: string = '';
    
    for (let i = 0; i < 5; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return id;
}


export function saveHourMedicine(medicine: InputMedicine, savedMedicines: SavedMedicines): SavedMedicines {
    
    let initDay: number = parseInt(medicine.initDate.split('-')[2]);
    let initMonth: number = parseInt(medicine.initDate.split('-')[1]);
    let initYear: number = parseInt(medicine.initDate.split('-')[0]);

    let endDay: number = parseInt(medicine.endDate.split('-')[2]);
    let endMonth: number = parseInt(medicine.endDate.split('-')[1]);
    let endYear: number = parseInt(medicine.endDate.split('-')[0]);

    let hours: number = parseInt(medicine.initHour.split(':')[0]);
    let minutes: number = parseInt(medicine.initHour.split(':')[1]);


    while (dateIsSmaller(initDay, initMonth, initYear, endDay, endMonth, endYear) ||
        (initDay === endDay && initMonth === endMonth && initYear === endYear && hours <= 23)) {

        let formatedDay = (initDay < 10) ? `0${initDay}` : `${initDay}`;
        let formatedMonth = (initMonth < 10) ? `0${initMonth}` : `${initMonth}`;
        let formatedDate = `${initYear}-${formatedMonth}-${formatedDay}`
        
        let formatedHours = (hours < 10) ? `0${hours}` : `${hours}`;
        let formatedMinutes = (minutes < 10) ? `0${minutes}` : `${minutes}`;

        saveMedicineHours(medicine.id, medicine.name, formatedDate, formatedHours, formatedMinutes, medicine.color, savedMedicines);

        hours += medicine.spaceHours;

        if (hours >= 24) {
            hours = 0;
            initDay++;

            if (!dayIsValid(initDay, initMonth)) {
                initDay = 1;
                initMonth++;

                if (initMonth > 12) {
                    initMonth = 1;
                    initYear++;
                }
            }
        }
    }

    return savedMedicines;
}


function dateIsSmaller(initDay:number, initMonth:number, initYear:number, endDay:number, endMonth:number, endYear:number): boolean {

    if (initYear > endYear) {
        return false
    }

    if (initYear == endYear && initMonth > endMonth) {
        return false
    }

    if (initYear == endYear && initMonth == endMonth && initDay > endDay) {
        return false
    }

    if (initMonth == endMonth && initDay > endDay) {
        return false
    }

    return true
}


function dayIsValid(day: number, month: number): boolean {
    switch (month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return day <= 31;

        case 4: case 6: case 9: case 11:
            return day <= 30;

        case 2:
            return day <= 28;
            
        default:
            return false;
    }
}

export function createMedicine(name: string, initDate: string, endDate: string, initHour: string, spaceHours: number, color: string): InputMedicine {

    let medicine: InputMedicine = {
        id: generateId(),
        name: name,
        initDate: initDate,
        endDate: endDate,
        initHour: initHour,
        spaceHours: spaceHours,
        color: color
    };

    return medicine;
}


function saveMedicineHours(id: string, name: string, date: string, hours: string, minutes: string, color: string, savedMedicines: SavedMedicines): SavedMedicines {
    
    if (!savedMedicines[date]) {
        savedMedicines[date] = [];
    
    }
    
    savedMedicines[date].push({ id, name, date, hours, minutes, color });
    return savedMedicines;
}