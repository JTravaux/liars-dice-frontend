import './css.sass';

export default () => {
    return (
        <div className="dice">
            <div className="face first-face">
                <div className="dot"></div>
            </div>

            <div className="face second-face">
                <div className="dot"></div>
                <div className="dot"></div>
            </div>

            <div className="face third-face">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>

            <div className="face fourth-face">
                <div className="column">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="column">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>

            <div className="face fifth-face">
                <div className="column">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="column">
                    <div className="dot"></div>
                </div>
                <div className="column">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>

            {/* <div className="face sixth-face">
                <div className="column">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="column">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div> */}
        </div>
    );
};
