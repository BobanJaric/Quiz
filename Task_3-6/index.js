import { readFile } from 'fs/promises';
const { records } = JSON.parse(
    await readFile(
        new URL('./db.json', import.meta.url)
    )
);
//Taks 3.
const getUsers = (records, action, start_time, end_time) => {
    const filteredResult = records.filter(result => {
        const mapped = result.devices.map(device => device.action);
        let isValid = false;
        mapped.forEach(el => {
            if (el[action] >= start_time && el[action] <= end_time) {
                isValid = true;
            }
        });
        return isValid;
    })
    const finalResult = filteredResult.map(result => result.user_id);
    console.log(finalResult);
    return finalResult;
}

getUsers(records, "start", 700, 900);

//Task 4.
const getPlaybackTime = (userId, records) => {
    const data = records.filter(record => record.user_id === userId);
    //Extract all actions for current User
    const [devices] = data.map(data => data.devices);
    //Determin all actions(sessions) for curent users per device
    const actions = devices.map(data => data.action);

    let start = 10 ** 1000000;
    let end = 0;
    let playBackTime = 0;

    //Loop thru all actions 
    for (let i = 0; i < actions.length; i++) {
        //Check if there is 'GAP' beetween actions
        if (actions[i + 1] !== undefined && actions[i].stop < actions[i + 1].start) {
            playBackTime += actions[i].stop - actions[i].start;
        } else {
            //Time when User started all actions 
            if (actions[i].start < start) {
                start = actions[i].start
            }
            //Time when User finished all actions 
            if (actions[i].stop > end) {
                end = actions[i].stop
            }
        }
    }

    const uniquePlayBackTime = end - start + playBackTime;
    console.log(uniquePlayBackTime);
    return uniquePlayBackTime;
}

getPlaybackTime(3, records);

//Task 5.
// Integreted in code abowe

//Task 6.
// If user is still performing action at the time Task 4. is executed,
// stop action would not be recorded and final result would not be valid
