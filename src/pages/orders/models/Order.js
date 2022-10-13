//@ts-check
'use strict'
/** Class represeting a order */
class Order {
    /**
     * Create a order
     * @param {Object} OrderObject - Order object
     */
    constructor({
        userId,
        link,
        network,
        variant,
        reactions,
        type,
        commentsText,
        publications,
        comments,
        shares,
        joinGroups,
        shareGroups,
        priority,
        options = {}
    }) {
        this.userId = userId;
        this.link = link;
        this.network = network;
        this.variant = variant;
        this.reactions = reactions;
        this.type = type;
        this.commentsText = commentsText;
        this.publications = publications;
        this.comments = comments;
        this.shares = shares;
        this.joinGroups = joinGroups;
        this.shareGroups = shareGroups;
        this.priority = priority;
        this.options = options;
    }

    validate() {
        if (!this.userId) return false;
        if (!this.network) return false;
        if (typeof this.variant !== 'number') return false;
        switch (this.variant) {
            case 0:
                if (typeof this.options.watchTime !== 'number') return false
                break
            case 4:
                if (typeof this.options.type !== 'string') return false
                if (typeof this.options.reportsNumber !== 'number') return false
                if (typeof this.options.reason !== 'string') return false
                break
        }
        return true
    }
}
export default Order