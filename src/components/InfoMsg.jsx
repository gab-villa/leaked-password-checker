import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
export const InfoMsg = () =>
{
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">How it works</Popover.Header>
            <Popover.Body>
                This couldn't be possible without the help of HaveIBeenPwned, which
                allow us to query hundreds of millions of real world passwords 
                previously exposed in data breaches. This exposure makes them 
                unsuitable for ongoing use as they're at much greater risk of 
                being used to take over other accounts. They're searchable online 
                below as well as being downloadable for use in other online systems. 
            </Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
            <Button className="py-0 px-0" variant="link">How it works?</Button>
        </OverlayTrigger>
    );
}