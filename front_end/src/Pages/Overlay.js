import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

export const Overlay = (props) => {
    console.log(props);
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} >
            <p>Query Status : Expired</p>
            <p>Query Created on : 12 may 2022 at 12:23:32</p>
            <p>Query EXpired on : 14 may 2022 at 12:23:32</p>
        </Tooltip>
    )

    return(<OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        ><Button variant="secondary" style={{ borderRadius: "20px", paddingTop: "1px", paddingBottom: "1px",float:"right" }}>i</Button>
        </OverlayTrigger>)
}



