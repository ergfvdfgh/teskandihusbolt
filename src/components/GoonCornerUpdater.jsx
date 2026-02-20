import React from "react";
import GoonCorner from "./GoonCorner";
class GoonCornerUpdater extends React.Component {
    constructor() {
        super();
        this.handleForceupdateMethod = this.handleForceupdateMethod.bind(this);
    }

    handleForceupdateMethod() {
        this.forceUpdate();
    }

    render() {
        return <GoonCorner />;
    }
}

export default GoonCornerUpdater;