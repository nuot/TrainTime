var config = {
    apiKey: "AIzaSyCsC7sckcUDEELm30KW2ydRTUfyiNaRozc",
    authDomain: "traintime-95c35.firebaseapp.com",
    databaseURL: "https://traintime-95c35.firebaseio.com",
    projectId: "traintime-95c35",
    storageBucket: "",
    messagingSenderId: "266960579378"
};
firebase.initializeApp(config);

let db = firebase.firestore()
let trainname,
destination,
firstTrain,
frequency,
nowTime




document.querySelector('#submit').addEventListener('click',
    e => {
        e.preventDefault()

        let id = db.collection('trainschedule').doc().id

        db.collection('trainschedule').doc(id).set({
            trainname: document.querySelector('#trainName').value,
            destination: document.querySelector('#destination').value,
            firstTrain: document.querySelector('#ftrain').value,
            frequency: document.querySelector('#frequency').value
        })
     
        document.querySelector('#trainName').value = ''
        document.querySelector('#destination').value = ''
        document.querySelector('#ftrain').value = ''
        document.querySelector('#frequency').value = ''
    })

db.collection('trainschedule').onSnapshot(({ docs }) => {
    document.querySelector('#disp'), innerHTML = ''
    docs.forEach(doc => {

        let { trainname, destination, firstTrain, frequency } = doc.data()

        let nowTime = moment()
        console.log(nowTime)
        let firTrainTime = moment(firstTrain, "HH:mm")
        console.log(firTrainTime)
        let timedifference = nowTime.diff(firTrainTime, 'minutes')
        console.log(timedifference)
        let timeLeft = timedifference % frequency
        console.log(timeLeft)
        let minutesAway = frequency - timeLeft
        console.log(minutesAway)
        let nextArrial = moment().add(minutesAway, 'minutes').format('HH:mm')
        console.log(nextArrial)

        
    
        let newtrain = document.createElement('tr')
        newtrain.innerHTML = `
        <td>Train Name: <br>${trainname}</br></td>
        <td>Destination: <br>${destination}</br></td>
        <td>Frequency(min): <br>${frequency}</br></td>
        <td>First Train: <br>${firstTrain}</br></td>
        <td>Next Arrival: <br>${nextArrial}</br></td>
        <td>Minutes Away: <br>${minutesAway}</br></td>
        `
        document.querySelector('#disp').append(newtrain)
    })
})



// let timePass = nowTime.diff(firstTrainTime,'minutes')
// let stops= timePass/frequency
// let nextArrial = stops * frequency + firstTrain
// let minutesAway = moment().from(nextArrial)

// const now = moment().format("HH:MM")
// const startTime = moment(firstTrain, "HH:MM")
// const minutespast = moment().from(startTime, "minutes")
// console.log(minutespast)
// const nextArrival =
// const minutesAway = moment().from(nextArrival)

