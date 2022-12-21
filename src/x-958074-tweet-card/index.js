import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "./components/tweet-card";
import "@servicenow/now-input";
import '@servicenow/now-loader';

const { COMPONENT_RENDERED } = actionTypes;

const token =
	"AAAAAAAAAAAAAAAAAAAAAN3dkQEAAAAAY5O0xptlZyvVw16IYfjvbqGFQbM%3DNN67bAQ4KqWKR42j7yRzFIWPzyZsj1d9pE435PXwpuWIhVeXkx";

const view = (state, { updateState }) => {
	const { userData, tweetData, mediaData, isLoading, tweetId, errors } = state;

	const handleKeyUp = async (tweetId) => {
		const tweetUrl = `/tweets/tweets?ids=${tweetId}&tweet.fields=attachments,author_id,conversation_id,created_at,edit_controls,edit_history_tweet_ids,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld&expansions=attachments.media_keys,attachments.poll_ids,author_id,edit_history_tweet_ids,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id&media.fields=alt_text,duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,variants,width&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld&place.fields=contained_within,country,country_code,full_name,geo,id,name,place_type`;

		updateState({ isLoading: true });
		const response = await fetch(tweetUrl, {
			headers: {
				accept: "Accept: application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const result = await response.json();

		// console.log(result);

		if (result.includes) {
			updateState({
				tweetData: result.includes.tweets[0],
				userData: result.includes.users[0],
				mediaData: result.includes.media? result.includes.media[0]: {},
				errors:""
			});
		} else if(result.errors){
			updateState({
				tweetData: {},
				userData: {},
				mediaData: {},
				errors: result.errors[0].detail
			});
		}
		updateState({ isLoading: false });
	};

	return (
		<div className={"app"}>
			<div className={"text-input"}>
				{/* <input
					required
					placeholder="Tweet ID"
					autoFocus
					value={tweetId}	
					on-keypress={({ keyCode, target: { value } }) => {
						updateState({ tweetId: value });
						const inputValue = value.trim();
						if (keyCode === 13 && inputValue) {
							handleKeyUp(value);
						}
					}}
				/> */}
				<now-input
					required
					placeholder="Tweet ID"
					autoFocus
					value={tweetId}	
					on-keypress={({ keyCode, target: { value } }) => {
						updateState({ tweetId: value });
						const inputValue = value.trim();
						if (keyCode === 13 && inputValue) {
							handleKeyUp(value);
						}
					}}
				/>
			</div>		
			<br/>
			{tweetId ? (
				isLoading ? (
					<now-loader label="Loading..." size="lg" />
					) : errors ? (
					<div className={"text-center"}>{errors}</div>
				) : (
					<tweet-card
						tweetData={tweetData}
						userData={userData}
						mediaData={mediaData}
						isLoading={isLoading}
						tweetId={tweetId}
					/>
				)
			) : null}
		</div>
	);
};

createCustomElement("x-958074-tweet-card", {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		tweetId: "",
		isLoading: true,
		userData: {},
		tweetData: {},
		mediaData: {},
		errors: ""
	}
});
