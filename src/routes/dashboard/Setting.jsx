import Help from "./Help";
import "./Setting.css";
import Svg from "./Svg";

const Setting = () => {
  return (
    <div className="boxes">
      <Svg />
      <div className="text">
        <h3>Account Security</h3>
        <label>Change Password</label> <br />
        <input
          type="password"
          name="password"
          required
          placeholder="****************"
        />
        <br />
        <label>Confirm New Password</label> <br />
        <input
          type="password"
          name="password"
          required
          placeholder="****************"
        />
        <br />
        <label>Add 2FA</label> <br />
        <small>
          Two factor authentication helps secure your account and dominion over
          your data
        </small> <br />
        <input
          type="password"
          name="password"
          required
          placeholder="****************"
        />
        <br />
      </div>
      <div className="refer">
        <h3>Notification References</h3>
        <svg
          width="30"
          height="16"
          viewBox="0 0 30 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2920_4597)">
            <rect y="0.5" width="30" height="15" rx="7.5" fill="#320051" />
            <g filter="url(#filter0_d_2920_4597)">
              <rect y="0.5" width="15" height="15" rx="7.5" fill="#964CC3" />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_2920_4597"
              x="-1"
              y="-0.5"
              width="17"
              height="17"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2920_4597"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2920_4597"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_2920_4597">
              <rect y="0.5" width="30" height="15" rx="7.5" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2>New Listing Alert</h2>
        <p>Get notified whenever properties are been listed.</p>
        <svg
          width="30"
          height="16"
          viewBox="0 0 30 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2920_4597)">
            <rect y="0.5" width="30" height="15" rx="7.5" fill="#320051" />
            <g filter="url(#filter0_d_2920_4597)">
              <rect y="0.5" width="15" height="15" rx="7.5" fill="#964CC3" />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_2920_4597"
              x="-1"
              y="-0.5"
              width="17"
              height="17"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2920_4597"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2920_4597"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_2920_4597">
              <rect y="0.5" width="30" height="15" rx="7.5" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2>Push Notification</h2>
        <p>you will get notified whenever you complete a task successfully.</p>
        <svg
          width="30"
          height="16"
          viewBox="0 0 30 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2920_4597)">
            <rect y="0.5" width="30" height="15" rx="7.5" fill="#320051" />
            <g filter="url(#filter0_d_2920_4597)">
              <rect y="0.5" width="15" height="15" rx="7.5" fill="#964CC3" />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d_2920_4597"
              x="-1"
              y="-0.5"
              width="17"
              height="17"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_2920_4597"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_2920_4597"
                result="shape"
              />
            </filter>
            <clipPath id="clip0_2920_4597">
              <rect y="0.5" width="30" height="15" rx="7.5" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <h2>Email Notification</h2>
        <p>Get personalised notification.</p>
      </div>
      <Help />
    </div>
  );
};

export default Setting;
