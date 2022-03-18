import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
	return <Alert variant="dark">{children}</Alert>;
};

Message.defaultProps = {
	variant: "dark",
};

export default Message;
