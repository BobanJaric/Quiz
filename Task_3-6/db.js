/* {
    "records": [
        {
            "user_id": 1,
            "device": "Windows 10",
            "action": {
                "start": 100,
                "stop": 370
            }
        },
        {
            "user_id": 1,
            "device": "iPhone 8s",
            "action": {
                "start": 250,
                "stop": 410
            }
        },
        {
            "user_id": 2,
            "device": "OSX 15.4",
            "action": {
                "start": 200,
                "stop": 490
            }
        },
        {
            "user_id": 3,
            "device": "Android 9.1",
            "action": {
                "start": 700
            }
        }
    ]
}
 */




/* import { readFile } from 'fs/promises';
const { records } = JSON.parse(
    await readFile(
        new URL('./db.json', import.meta.url)
    )
);

const getUsers = (records, action, start_time, end_time) => {
    const filteredResult = records.filter(result => {
        return result.action[action] >= start_time && result.action[action] <= end_time;
    })
    return filteredResult.map(result => result.user_id);
}

console.log(getUsers(records, "start", 700, 900))

const getPlaybackTime = (userId, records) => {
    const data = records.filter(record => record.user_id === userId);
    const actions = data.map(data => data.action);
    let min = 100000000000;
    let max = 0;
    actions.forEach(action => {
        if (action.start < min) {
            min = action.start
        }
        if (action.stop > max) {
            max = action.stop
        }
    });
    console.log(max - min);
    return max - min;
}

getPlaybackTime(1, records);
 */