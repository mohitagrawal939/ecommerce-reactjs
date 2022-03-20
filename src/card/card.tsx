import { Button, Divider, Typography } from "@material-ui/core";
import React from "react";
import { CartItemType } from "../App";
import { Wrapper } from "./card.styles";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Card: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <Divider />
      <p>{item.description}</p>
    </div>
    <Typography style={{marginLeft: "15px"}}><h3>$ {item.price}</h3></Typography>
    <Button onClick={() => handleAddToCart(item)} style={{backgroundColor: "#000", color: "#FFF"}}>Add to cart</Button>
  </Wrapper>
);

export default Card;
