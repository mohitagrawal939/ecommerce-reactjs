import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, LinearProgress, Grid, Badge, AppBar, Toolbar, Typography, Button, Box } from "@material-ui/core";
import { AddShoppingCartSharp } from "@material-ui/icons";
import Card from "./card/card";
import SideDrawer from "./side-drawer/sideDrawer";
import { Wrapper } from "./App.styles";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "id",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.quantity, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id ? { ...item, quantity: item.quantity + 1} : item
        )
      }
      return [ ...prev, {...clickedItem, quantity: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if(item.quantity === 1) return ack;
          return [...ack, {...item, quantity: item.quantity - 1}];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    ))
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong. Please reload the window.</div>;
  return (
    <Wrapper>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            E-Commerce
          </Typography>
          <Button aria-label="cart" color="inherit" onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color="error">
              <AddShoppingCartSharp />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <SideDrawer
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Box sx={{p: 2}} m={3}></Box>
      <Grid container spacing={2} >
        {data?.map((item: CartItemType) => {
          return (
            <Grid item key={item.id} xs={12} sm={4} md={4} xl={3}>
              <Card item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{pt: 2}} m={2}>
        <Typography align="center">
          © 2022 Mohit Agrawal
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default App;