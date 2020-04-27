const {ACCOUNT, PRODUCT } =  require('./topic_names');

    let topicsToCreate = [ACCOUNT,PRODUCT];

//     const topicsToCreate = [
//     {
//         topic: GET_REGISTRATION_FOR_STUDENT,
//         partitions: 1,
//         replicationFactor: 1 
//     },
// ];


module.exports = topicsToCreate;