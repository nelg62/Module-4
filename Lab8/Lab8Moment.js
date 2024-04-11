const currenttime = moment()
document.getElementById('timeDiv').innerHTML = `Current time: ${currenttime.format('YYYY-MM-DD HH:mm:ss')}`


// 1.
const BirthDay = moment([1997, 4, 29])
document.getElementById('birthday').innerHTML = `${BirthDay.format('YYYY-MM-DD')}`

const difindaybirtday = currenttime.diff(BirthDay, 'days')
document.getElementById('timefromBday').innerHTML = `Days from birthday till now: ${difindaybirtday}`


// 2.

const durationtime = moment.duration(difindaybirtday, 'days')
console.log(durationtime)
console.log(durationtime.years())
console.log(durationtime.months())
console.log(durationtime.days())

document.getElementById('dayMonYearBday').innerHTML = `${durationtime.years()}Years, ${durationtime.months()}Months, ${durationtime.days()} Days`


// 3

function compatreDates(firstDate, secondDate) {

   let date1 = moment(firstDate)
   let date2 = moment(secondDate)

   const differancedate1 = Math.abs(moment().diff(date1))
    const diierancedate2 = Math.abs(moment().diff(date2))

   if (differancedate1 > diierancedate2) {
    document.getElementById('closesttocurrentdate').innerHTML = `the first value is the closest date: ${date1.format('YYYY-MM-DD')}`
    console.log(date1)
   }else {
    document.getElementById('closesttocurrentdate').innerHTML = `the secound value is the closest date: ${date2.format('YYYY-MM-DD')}`
    console.log(date2)
   }
   
}

const myBday = [1997, 4, 29]
const partnerBirthday = [1997, 5, 15]

compatreDates(myBday, partnerBirthday)


// 4

function beforeorafter(dateOne,dateTwo){

let date1 = moment(dateOne)
let date2 = moment(dateTwo)

    if (date1.isBefore(date2)) {
        document.getElementById('datebeforeorafter').innerHTML = `${date1.format('YYYY-MM-DD')} is before ${date2.format('YYYY-MM-DD')}`
    } else if (date1.isAfter(date2)) {
        document.getElementById('datebeforeorafter').innerHTML = `${date1.format('YYYY-MM-DD')} is after ${date2.format('YYYY-MM-DD')}`
    } else {
        document.getElementById('datebeforeorafter').innerHTML = `${date1.format('YYYY-MM-DD')} is the same as ${date2.format('YYYY-MM-DD')}`
    }


}

beforeorafter(myBday, partnerBirthday)


// 5

const londonTime = moment().tz('Europe/London')

document.getElementById('londontime').innerHTML = `${londonTime.format('YYYY-MM-DD HH:mm:ss')}`
console.log(londonTime.format('YYYY-MM-DD HH:mm:ss'))