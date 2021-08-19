export function Footer() {
    const AboutItems = [
      "Contact Us",
      "About Us",
      "FAQ",
      "Carriers",
      "Flanbieuto Cares",
      "Gift A Smile"
    ];
    const AppItems = [
      {
        src:
          "https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png"
      },
  
      {
        src:
          "https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
      }
    ];
    return (
      <>
        <footer>
          <div className="footer">
            <div className="About">
              <span className="aboutUs">
                <strong>About Us</strong>
              </span>
              <ul>
                {AboutItems.map((obj, index) => (
                  <li key={index} className="aboutUsList">
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
            <div className="App">
              <ul>
                {AppItems.map((obj, index) => (
                  <li key={index} className="appItems">
                    <img
                      className="desktop-androidDownLink"
                      src={obj.src}
                      alt="loading"
                    />
                  </li>
                ))}
              </ul>
              <div>
                <div className="keepInTouch">
                  <strong>Keep In Touch</strong>
                  <br />
                  <a href="https://github.com/sandeepmehta2155">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      className="bi bi-github"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                  <a href="https://twitter.com/sandeep_meta">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      className="bi-twitter"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/sandeep-mehta-b0783b109/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      className="bi-linkedin"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="badges">
              <div className="fast">
                <img
                  className="fastDelivery"
                  src="https://constant.myntassets.com/web/assets/img/cafa8f3c-100e-47f1-8b1c-1d2424de71041574602902399-truck.png"
                  alt="loading"
                />
                <span className="spanTxt">
                  <strong>Get free delivery </strong> for every order above Rs.
                  799
                </span>
              </div>
              <div className="returnBlock">
                <img
                  className="return"
                  src="https://constant.myntassets.com/web/assets/img/ef05d6ec-950a-4d01-bbfa-e8e5af80ffe31574602902427-30days.png"
                  alt="loading"
                />
                <span className="spanTxt">
                  <strong>Return within 30days</strong> of receiving your order
                </span>
              </div>
              <div className="originalBlock">
                <img
                  className="original"
                  src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png"
                  alt="loading"
                />
                <span className="spanTxt">
                  <strong>100% ORIGINAL</strong> guarantee for all products
                </span>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
  