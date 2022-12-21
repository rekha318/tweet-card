import styles from "./styles.scss";
import { createCustomElement, actionTypes } from "@servicenow/ui-core";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
const { COMPONENT_RENDERED } = actionTypes;

const view = (state) => {
	const {
		properties: { userData, tweetData, mediaData, isLoading, tweetId },
	} = state;

	if (Object.keys(tweetData))
		return (
			<div className="tweet-wrap">
				<div className="tweet-header">
					<img src={userData.profile_image_url} alt="" className="avator" />
					<div className="tweet-header-info">
						{userData.name}
						<span>@{userData.username}</span>
						<span>
							. {new Date(tweetData.created_at).toString().split(" ")}
						</span>
						<p>{tweetData.text}</p>
					</div>
				</div>
				{mediaData.url && (
					<div className="tweet-img-wrap">
						<a
							href={
								tweetData.entities && tweetData.entities.urls[0].expanded_url
							}
							target="blank"
						>
							<img src={mediaData.url} alt="" className="tweet-img" />
						</a>
					</div>
				)}
				<div className="tweet-info-counts">
					<div className="comments">
						<svg
							class="feather feather-message-circle sc-dnqmqq jxshSx"
							attrs={{
								xmlns: "http://www.w3.org/2000/svg",
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								ariaHidden: "true",
							}}
						>
							<path attr-d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
						</svg>
						<div className="comment-count">
							{tweetData.public_metrics && tweetData.public_metrics.reply_count}
						</div>
					</div>

					<div className="retweets">
						<svg
							class="feather feather-repeat sc-dnqmqq jxshSx"
							attrs={{
								xmlns: "http://www.w3.org/2000/svg",
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								ariaHidden: "true",
							}}
						>
							<polyline attr-points="17 1 21 5 17 9"></polyline>
							<path attr-d="M3 11V9a4 4 0 0 1 4-4h14"></path>
							<polyline attr-points="7 23 3 19 7 15"></polyline>
							<path attr-d="M21 13v2a4 4 0 0 1-4 4H3"></path>
						</svg>
						<div className="retweet-count">
							{tweetData.public_metrics &&
								tweetData.public_metrics.retweet_count}
						</div>
					</div>

					<div className="likes">
						<svg
							class="feather feather-heart sc-dnqmqq jxshSx"
							attrs={{
								xmlns: "http://www.w3.org/2000/svg",
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								ariaHidden: "true",
							}}
						>
							<path attr-d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
						</svg>
						<div className="likes-count">
							{tweetData.public_metrics && tweetData.public_metrics.like_count}
						</div>
					</div>

					<div className="message">
						<svg
							class="feather feather-send sc-dnqmqq jxshSx"
							attrs={{
								xmlns: "http://www.w3.org/2000/svg",
								width: "20",
								height: "20",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round",
								ariaHidden: "true",
							}}
						>
							<line attr-x1="22" attr-y1="2" attr-x2="11" attr-y2="13"></line>
							<polygon attr-points="22 2 15 22 11 13 2 9 22 2"></polygon>
						</svg>
					</div>
				</div>
			</div>
		);
	else return <div></div>;
};

createCustomElement("tweet-card", {
	renderer: { type: snabbdom },
	view,
	styles,
	properties: {
		tweetId: {
			default: "",
		},
		isLoading: {
			default: false,
		},
		userData: {
			default: {},
		},
		tweetData: {
			default: {},
		},
		mediaData: {
			default: {},
		},
	},
});
