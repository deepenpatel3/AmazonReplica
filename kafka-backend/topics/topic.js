const {ACCOUNT, PROFILE, PRODUCT, REVIEW , RESPONSE_TOPIC } =  require('./topic_names');

    let topicsToCreate = [ACCOUNT,PROFILE, PRODUCT, REVIEW, RESPONSE_TOPIC];

//     const topicsToCreate = [
//     {
//         topic: GET_REGISTRATION_FOR_STUDENT,
//         partitions: 1,
//         replicationFactor: 1 
//     },
// ];


module.exports = topicsToCreate;