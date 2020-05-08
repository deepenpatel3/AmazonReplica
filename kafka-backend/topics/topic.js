const {ACCOUNT, PROFILE, SELLER_PROFILE, PRODUCT, REVIEW , ANALYTICS, RESPONSE_TOPIC } =  require('./topic_names');

    let topicsToCreate = [ACCOUNT, PROFILE, SELLER_PROFILE, PRODUCT, REVIEW, ANALYTICS, RESPONSE_TOPIC];

//     const topicsToCreate = [
//     {
//         topic: GET_REGISTRATION_FOR_STUDENT,
//         partitions: 1,
//         replicationFactor: 1 
//     },
// ];


module.exports = topicsToCreate;