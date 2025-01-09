import '../styles/product.css';


function Product({ img, title, description, price }) {
    return (
        <div className="product">
            <img src={img} alt={title} className="product-image" />
            <h1 className="product-title">{title}</h1>
            <p className="product-description">{description}</p>
            <p className="product-price">${price}</p>
        </div>
    );
}

export default Product;