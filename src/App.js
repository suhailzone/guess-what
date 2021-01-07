import { Container, Row, Button, Col, Card, CardBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { Fragment, useState, useEffect } from "react";
import {
  AiOutlineArrowLeft,
  AiFillPlayCircle,
  AiOutlineReload,
} from "react-icons/ai";
import {
  FaQuestionCircle,
  FaGithub,
  FaFacebookF,
  FaWhatsapp,
  FaSnapchatGhost,
  FaInstagram,
} from "react-icons/fa";

// const itemArray = new Array(9).fill("empty");
const allItems = [
  // "crying",
  { title: "dashing", isSelected: false },
  { title: "dashing", isSelected: false },
  // "fear",
  { title: "laugh", isSelected: false },
  { title: "laugh", isSelected: false },
  // "unamused",
  { title: "love", isSelected: false },
  { title: "love", isSelected: false },
  // "sad",
  { title: "sleeping", isSelected: false },
  { title: "sleeping", isSelected: false },
  // "tongue",
  // { title: "wink", isSelected: false },
  // { title: "wink", isSelected: false },
];

let itemArray = [...allItems];
// for (let i = 0; i < 10; i++) {
//   itemArray.push(itemArray[i]);
// }

const shuffle = () => {
  itemArray = itemArray.sort(() => Math.random() - 0.5);
};
shuffle();
// const getItem = (item) => {
//   switch (item) {
//     case "crying":
//       return crying;

//     case "sad":
//       return sad;

//     case "wink":
//       return wink;

//     case "dashing":
//       return dashing;

//     case "fear":
//       return fear;

//     case "laugh":
//       return laugh;

//     case "love":
//       return love;

//     case "sleeping":
//       return sleeping;
//     case "tongue":
//       return tongue;

//     case "unamused":
//       return unamused;

//     default:
//       break;
//   }
// };

function App() {
  const [start, setStart] = useState(false);
  const [firstItem, setFirstItem] = useState(null);
  const [secondItem, setSecondItem] = useState(null);
  const [winner, setWinner] = useState(false);
  // console.log(itemArray);

  const handleToggle = (item, index) => {
    if (!itemArray[index].isSelected) {
      itemArray[index].isSelected = true;
      if (firstItem === null) {
        setFirstItem(index);
      } else {
        setSecondItem(index);
        // checkWinner();
      }
    }
  };

  const checkWinner = () => {
    if (itemArray[firstItem].title === itemArray[secondItem].title) {
      console.log("1 point");
      setFirstItem(null);
      setSecondItem(null);
    } else {
      setTimeout(() => {
        itemArray[firstItem].isSelected = false;
        itemArray[secondItem].isSelected = false;
        setTimeout(() => {
          setFirstItem(null);
          setSecondItem(null);
        }, 500);
      }, 400);
    }
  };
  useEffect(() => {
    if (secondItem) {
      checkWinner();
      if (itemArray.every((item) => item.isSelected === true)) {
        setWinner(true);
      }
    }
  }, [secondItem]);

  const reloadGame = () => {
    shuffle();
    setWinner(false);
    itemArray.forEach((item) => {
      item.isSelected = false;
    });
  };
  const backToHome = () => {
    reloadGame();
    setStart(false);
  };

  const getIcon = (name) => {
    switch (name) {
      case "dashing":
        return <FaFacebookF size="large" color="#4269f7" />;
      case "sleeping":
        return <FaWhatsapp size="large" color="#24ad25" />;
      case "love":
        return <FaSnapchatGhost size="large" color="#e7e401" />;
      case "laugh":
        return <FaInstagram size="large" color="#ef2a68" />;

      default:
        break;
    }
  };

  return (
    <Container className="p-2">
      <h1 className="text-center text-white">Guess What?</h1>
      {winner && (
        <Row>
          <Col md={6} className="offset-md-3 ">
            <h1 className="text-success text-center text-uppercase">Winner</h1>
            <Button className="mb-2" block onClick={reloadGame} color="info">
              <AiOutlineReload style={{ margin: "0 10px" }} />
              Reload Game
            </Button>
          </Col>
        </Row>
      )}
      {!start ? (
        <Row>
          <Col md={6} className="offset-md-3 mt-5">
            <Button
              block
              color="primary"
              size="lg"
              onClick={() => setStart(true)}
            >
              <AiFillPlayCircle style={{ margin: "0 10px" }} />
              Start
            </Button>
          </Col>
        </Row>
      ) : (
        <Fragment>
          <Row>
            <Col md={6} className="offset-md-3">
              <div className="grid">
                {itemArray.map((item, index) => (
                  <Card key={index} onClick={() => handleToggle(item, index)}>
                    <CardBody className="box">
                      {item.isSelected ? (
                        // <img
                        //   alt={item.title}
                        //   src={getItem(item.title)}
                        //   length={"large"}
                        //   width={100}
                        // />
                        <Fragment>{getIcon(item.title)}</Fragment>
                      ) : (
                        <FaQuestionCircle size="large" />
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="offset-md-3 mt-3">
              <Button block onClick={backToHome} color="danger">
                <AiOutlineArrowLeft style={{ margin: "0 10px" }} />
                Back to Home
              </Button>
            </Col>
          </Row>
        </Fragment>
      )}
      <Row>
        <Col md={6} className="offset-md-3 mt-3">
          <Button block outline={true}>
            <FaGithub style={{ margin: "0 10px" }} />
            <a
              href="https://www.github.com/suhailzone"
              className="mt-2 text-white text-center"
            >
              github.com/suhailzone
            </a>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
