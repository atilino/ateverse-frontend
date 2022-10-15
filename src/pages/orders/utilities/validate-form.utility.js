export const validateLink = (network, link) => {
    const networkValidators = {
        facebook: ["m.facebook", "/posts", "/watch", "/live", "/videos", "photos", "/groups"],
        twitter: ["twitter."],
        instagram: ["instagram."]
    }
    return networkValidators[network].filter(validator => link.includes(validator) === true).length !== 0

}
