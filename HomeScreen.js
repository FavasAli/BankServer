import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { createTodo } from "../actions/todoActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [completion, setCompletion] = useState(false);
  console.log("completion", completion);

  const createTodos = useSelector((state) => state.createTodo);
  const { error, todo: succesTodo, loading } = createTodos;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("succesTodo", succesTodo);
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate, succesTodo]);

  // const data=new Date().toLocaleString()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTodo(todo, date, completion));
    navigate("/");
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>TODO'S</h1>
      <Row>
        <Col md={2} lg={2}></Col>
        <Col md={8} lg={8}>
          {loading && <Loader />}
          {error && <Message variant="danger"></Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="data">
              <Form.Label>Please mark your next move</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={todo}
                placeholder="Enter here"
                onChange={(e) => setTodo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="data">
              <Form.Label>Completion date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                placeholder="Enter here"
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Check
                inline
                label="Mark as complete"
                name="group1"
                value={completion}
                onChange={(e) => setCompletion(true)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Col>
        <Col md={2} lg={2}></Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
