export const validateLink = (network, link) => {
    const networkValidators = {
        facebook: ["m.facebook", "/posts", "/watch", "/live", "/videos", "/photos", "/photo", "/groups", "story"],
        twitter: ["twitter."],
        instagram: ["instagram."],
        tiktok: ["tiktok."],
        youtube: ["youtube.", "youtu.be"]
    }
    return networkValidators[network].filter(validator => link.includes(validator) === true).length !== 0

}
