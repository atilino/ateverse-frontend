import { breakStringToArray } from "../../../utilities"

export const formatOrder = (orderObject) => {
    if(orderObject.commentsText?.length && typeof orderObject.commentsText === 'string') {
        orderObject.commentsText = breakStringToArray(orderObject.commentsText)
        orderObject.comments = orderObject.commentsText.length
    }
    if(orderObject.publications?.length && typeof orderObject.publications === 'string') {
        orderObject.publications = breakStringToArray(orderObject.publications)
    }
}