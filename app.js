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
    frequency

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
        console.log(doc.data())
        let { trainname, destination, firstTrain, frequency } = doc.data()
    
        let newtrain = document.createElement('tr')
        newtrain.innerHTML = `
        <td>Train Name: <br>${trainname}</br></td>
        <td>Destination: <br>${destination}</br></td>
        <td>Frequency(min): <br>${frequency}</br></td>
        <td>Next Arrival:</td>
        <td>Minutes Away: </td>
        `
        document.querySelector('#disp').append(newtrain)
    })
})

// const now = moment().format("HH:MM")
// const startTime = moment(firstTrain, "HH:MM")
// const minutespast = moment().from(startTime, "minutes")
// console.log(minutespast)
// const nextArrival =
// const minutesAway = moment().from(nextArrival)

