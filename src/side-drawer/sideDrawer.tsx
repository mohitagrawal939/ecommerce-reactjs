import Cart from "../cart/cart";
import { Wrapper } from "./sideDrawer.styles";
import { CartItemType } from "../App";
import { Button, Divider } from "@material-ui/core";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}

const SideDrawer: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) => {
        return items.reduce((ack: number, item) => ack + (item.quantity * item.price), 0)
    }

    return cartItems.length !== 0 ? (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            <Divider />
            {cartItems.map((item: CartItemType) => 
                <Cart 
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            )}
            <br></br>
            <Button style={{backgroundColor: "#000", color: "#FFF", width: "100%"}}>Checkout & Pay&nbsp;<b>$ {calculateTotal(cartItems).toFixed(2)}</b></Button>
        </Wrapper>
    ) : (
        <Wrapper>
            <div>
                <h3>Your Cart is Empty</h3>
                <p>Looks like you haven't added anything to your cart yet.</p>
            </div>
        </Wrapper>
    );
}

export default SideDrawer;