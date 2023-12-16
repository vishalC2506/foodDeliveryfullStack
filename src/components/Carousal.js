import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function Carousal() {
  return (
    <div className="!object-contain">
      <Carousel
        fade
        className="opactiy-50 bg-gray-700 max-h-[31.2rem] !object-contain"
      >
        <Carousel.Item className="!max-h-[31.2rem] ">
          <img
            className="d-block object-contain  opacity-20 bg-gray-400  m-auto"
            src="https://source.unsplash.com/random/?pizza"
            alt="First slide"
          />
          <Carousel.Caption className="z-10 w-[75%]  ">
            <Form inline className="m-auto  ">
              <Row className="m-auto flex justify-center ">
                <Col xs="auto" className="!w-[clamp(25px,25rem,32rem)] mr-1">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mb-1 opacity-60"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className=" !max-h-[31.2rem]">
          <img
            className="d-block object-contain  opacity-20 bg-gray-400 m-auto"
            src="https://source.unsplash.com/random/500x600/?burger"
            alt="Second slide"
          />
          <Carousel.Caption className="z-10 w-[75%]  ">
            <Form inline className="m-auto  ">
              <Row className="m-auto flex justify-center ">
                <Col xs="auto" className="!w-[clamp(25px,25rem,32rem)] mr-1 ">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mb-1 opacity-60"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="!bg-[center_center] !max-h-[31.2rem]">
          <img
            className="d-block opacity-20  bg-gray-400 object-contain m-auto"
            src="https://source.unsplash.com/random/?biryani"
            alt="Third slide"
          />
          <Carousel.Caption className="z-10 w-[75%]  ">
            <Form inline className="m-auto  ">
              <Row className="m-auto flex justify-center ">
                <Col xs="auto" className="!w-[clamp(25px,25rem,32rem)] mr-1 ">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mb-1 opacity-60"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carousal;
