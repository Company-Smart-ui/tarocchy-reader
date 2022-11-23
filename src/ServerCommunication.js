export const events = {
    downloadAgentProfilePictureRequest: "downloadAgentProfilePictureRequest",
    downloadAgentProfilePictureResponse: "downloadAgentProfilePictureResponse",

    agentStatusResponse: "agentStatusResponse",
    agentStatusRequest: "agentStatusRequest",

    agentDetailsResponse: "agentDetailsResponse",
    agentDetailsRequest: "agentDetailsRequest",

    allAgentPINsResponse: "allAgentPINsResponse",
    allAgentPINsRequest: "allAgentPINsRequest",

    agentPINsInCategoryRequest: "agentPINsInCategoryRequest",
    agentPINsInCategoryResponse: "agentPINsInCategoryResponse",

    requestData: "requestData",

    postReviewRequest: "postReviewRequest",
    postReviewResponse: "postReviewResponse",

    getReviewsRequest: "getReviewsRequest",
    getReviewsResponse: "getReviewsResponse",

    authenticateAccountResponse: "authenticateAccountResponse",
    authenticateAccountRequest: "authenticateAccountRequest",

    getAgentRatingRequest: "getAgentRatingRequest",
    getAgentRatingResponse: "getAgentRatingResponse",
};

export const responses = {
    failure: 0,
    success: 1,
    notFound: 2,
    serverError: 3,
    unauthorized: 4,
    empty: 5,
    loginRequired: 6,
    invalidAccountType: 7,
    invalidPassword: 8,

    registerAccount: {
        duplicate: 500, //account with username already exists
        invalidPassword: 501, //password does not meet requirements
        invalidAccountType: 502, //can be replaced now with #7
    },
    authenticateAccount: {
        alreadyLoggedIn: 500,
        invalidAccountType: 501, //can be replaced now with #7
    },
    chatRequestCreateRequest: {
        insufficientBalance: 500,
        multiplePendingRequestsError: 501, //means there is another request already pending
        agentExceededMaximumOngoingChats: 502,
    },
    getChatlog: {
        all: 500, //gets all chat logs, not just 1 rooms log
    },
    generateCouponsRequest: {
        maximumCouponCountExceeded: 500,
    },
    redeemCoupon: {
        alreadyRedeemed: 500,
    },
    chatRoomClosed: {
        unknown: -1,
        chatTimeEnded: 1000,
        guestLeft: 1001,
        agentLeft: 1002,
        insufficientBalance: 500,

        chatRequestTimeout: 2000,
        agentRejectedChat: 2001,
    },
};

export const userStatus = {
    online: 0,
    busy: 1,
    away: 2,
    offline: -1,
};

export const accountType = {
    guest: 0,
    agent: 1,
    admin: 2,
};
