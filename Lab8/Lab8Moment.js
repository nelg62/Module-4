const currenttime = moment()
document.getElementById('timeDiv').innerHTML = `Current time: ${currenttime}`

const BirthDay = moment([1997, 5, 29])
document.getElementById('birthday').innerHTML = `Days from birthday till now: ${currenttime.diff(BirthDay, 'days')}`
