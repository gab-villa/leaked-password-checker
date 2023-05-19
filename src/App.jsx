import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import  Alert from 'react-bootstrap/Alert';
import Collapse from 'react-bootstrap/Collapse';
import { useState, useEffect } from 'react';
import SHA1 from 'sha1-es';
import { InfoMsg } from './components/InfoMsg.jsx';
import { Navbar } from 'react-bootstrap';



function App() {
  const [psw, setPsw] = useState('');
  //possible: firstTyping, typing, submmiting, success
  const [status, setStatus] = useState('firstTyping');
  const PATH_TO_PWNDB = "https://api.pwnedpasswords.com/range/";
  const [res, setRes] = useState({wasLeaked:false,headMsg:"",bodyMsg:""});
 
 
  async function fetchHashList(pswHashSearch, delay)
  {
      setTimeout(async function(){
        try
        {
          console.log("dasdas");
          
        }
        catch(error)
        {
          console.log(error);
        }
        
      }, delay);
      
  }
  function handleSubmit(e)
  {
    
    e.preventDefault();
    setStatus('submitting');
    setTimeout(async function(){
      const pswHash = SHA1.hash(psw).toUpperCase();
      const pswHashSearch = pswHash.slice(0,5);
      const pswHashRest = pswHash.slice(5, pswHash.length);
      const res = await fetch(PATH_TO_PWNDB + pswHashSearch);
      const data = await res.text();
      
      const regex = new RegExp(`${pswHashRest}:(\\d+)`,'m');
      let headMsg, bodyMsg, wasLeaked;
      const match = data.match(regex);
  
      if(match)
      {
        wasLeaked=true;
        headMsg="Your password has been seen " + match[1] + " times before";
        bodyMsg="This password has previously appeared in a data breach "+
                "and should never be used. If you've ever used it anywhere before, change it!";
        
      }
      else
      {           
        wasLeaked=false; 
        headMsg="Your password has passed the test successfully",
        bodyMsg="This password wasn't found in any of the Pwned Passwords "+
        "loaded into Have I Been Pwned. That doesn't necessarily "+
        "mean it's a good password, merely that it's not indexed "+
        "on this site.";
      }
      setRes({wasLeaked:wasLeaked,headMsg:headMsg,bodyMsg:bodyMsg});
      setStatus('typing');
    },4000);
  }
  function handleInputChange(e)
  {
    setPsw(e.target.value);
  }
  return (
    <>
      <Container className = "vh-100" fluid>
        <Row className = "justify-content-center align-items-center h-100">
          <Col xs={12} sm={10} md={8}>
            <Card bg="light" className="mb-2">
              <Card.Header>
                <Row>
                  <Navbar className="px-2 py-0">
                  <Col>
                    Password tester
                  </Col>
                  <Col className="justify-content-end text-end">
                    <InfoMsg />
                  </Col>
                  </Navbar>
                </Row>
              </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Check if a password was leaked</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      required
                      disabled={status === "submitting"}
                      value={psw}
                      onChange={handleInputChange}
                      size="lg"
                      type="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="basic-addon2"
                    />
                    <Button 
                      type="submit"
                      disabled={psw.length === 0 ||
                                status === "submitting"}
                      
                      variant="outline-success" 
                      aria-controls="collapse-result"
                      aria-expanded={status === 'typing'}
                      >
                      Test Now
                    </Button>
                    
                  </InputGroup>
                    <Collapse in={status === 'typing'}>
                      <div id="collapse-result">
                        <Alert id="collapse-result" variant={res.wasLeaked ? "danger": "success"}>
                          <Alert.Heading>
                            {res.headMsg}
                          </Alert.Heading>
                            {res.bodyMsg}
                        </Alert>
                      </div>
                    </Collapse>
                </Form.Group>
              </Form>
            </Card.Body>

          </Card>
            
          </Col>
        </Row>
      </Container>
      
    </>
  )
}
export default App
