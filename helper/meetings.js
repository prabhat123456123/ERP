const { RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole } = require("agora-access-token");
const { APPID, CERTIFICATE, UID, ACCOUNT } = require("../../utils/Constant");

const getNewMeeting = async channelName => {
	try {
		console.log(APPID, CERTIFICATE, channelName, UID);
		const role = RtcRole.PUBLISHER;
		const expirationTimeInSeconds = 86400;

		const currentTimestamp = Math.floor(Date.now() / 1000);

		const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

		const tokenA = RtcTokenBuilder.buildTokenWithUid(
			APPID,
			CERTIFICATE,
			channelName,
			UID,
			role,
			privilegeExpiredTs
		);
		console.log("Token With Integer Number Uid: " + tokenA);

		// Build token with user account
		const tokenB = RtcTokenBuilder.buildTokenWithAccount(
			APPID,
			CERTIFICATE,
			channelName,
			ACCOUNT,
			role,
			privilegeExpiredTs
		);
		console.log("Token With UserAccount: " + tokenB);

		console.log(tokenA, tokenB);

		return { tokenA, tokenB };
	} catch (error) {
		console.error(error);
	}
};

module.exports = getNewMeeting;
