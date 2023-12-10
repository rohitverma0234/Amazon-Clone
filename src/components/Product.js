import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Product.css'

const Product =  ({ productsList, addToCart, fetchProductByCategory }) => {
    let { slug } = useParams();

    console.log(34, slug)

    useEffect(() => {
        if (slug) {
            fetchProductByCategory(slug)
        }
    }, [slug])



    return (
        <>

            {/* <Banner /> */}
            < div className="product_wrap" >

                {
                    productsList?.map((item, i) => {
                        return <div className="product" key={item.id}>
                            <img src={item.image.url} alt="" />
                            <h3>{item.name}</h3>
                            <p>{item.price.formatted_with_symbol}</p>
                            <button onClick={() => addToCart(item.id, 1)}>Add to Cart</button>
                        </div>


                    })
                }

                

                {/* <div className="product">
                    <img src="https://m.media-amazon.com/images/I/61ZbKLlt0sL._AC_UL320_.jpg" alt="" />
                    <h3>Product Name</h3>
                    <p>Product Price</p>
                    <button>Add to Cart</button>
                </div>

                <div className="product">
                    <img src="https://m.media-amazon.com/images/I/61ZbKLlt0sL._AC_UL320_.jpg" alt="" />
                    <h3>Product Name</h3>
                    <p>Product Price</p>
                    <button>Add to Cart</button>
                </div>

                <div className="product">
                    <img src="https://m.media-amazon.com/images/I/61ZbKLlt0sL._AC_UL320_.jpg" alt="" />
                    <h3>Product Name</h3>
                    <p>Product Price</p>
                    <button>Add to Cart</button>
                </div>

                <div className="product">
                    <img src="https://m.media-amazon.com/images/I/61ZbKLlt0sL._AC_UL320_.jpg" alt="" />
                    <h3>Product Name</h3>
                    <p>Product Price</p>
                    <button>Add to Cart</button>
                </div>

                <div className="product">
                    <img src="https://m.media-amazon.com/images/I/61ZbKLlt0sL._AC_UL320_.jpg" alt="" />
                    <h3>Product Name</h3>
                    <p>Product Price</p>
                    <button>Add to Cart</button>
                </div> */}

            </div >


        </>
    )
}

export default Product